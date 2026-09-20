import { describe, it, expect, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import workflowReducer, { fetchWorkflow } from './workflowSlice'

describe('workflowSlice', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  function makeStore() {
    return configureStore({ reducer: { workflow: workflowReducer } })
  }

  it('requests the given version in the URL', async () => {
    global.fetch.mockResolvedValue({ json: async () => ({ tasks: [] }) })
    const store = makeStore()

    await store.dispatch(fetchWorkflow('1.2.3'))

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.stage.crawless.com/store/workflow/statista?version=1.2.3',
    )
  })

  it('defaults to version 0.0.2 when none is given', async () => {
    global.fetch.mockResolvedValue({ json: async () => ({ tasks: [] }) })
    const store = makeStore()

    await store.dispatch(fetchWorkflow())

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.stage.crawless.com/store/workflow/statista?version=0.0.2',
    )
  })

  it('stores the response payload on success', async () => {
    const payload = { tasks: [{ name: 'task-1' }] }
    global.fetch.mockResolvedValue({ json: async () => payload })
    const store = makeStore()

    await store.dispatch(fetchWorkflow())

    expect(store.getState().workflow.workflows).toEqual(payload)
    expect(store.getState().workflow.loading).toBe(false)
  })

  it('sets error state when the request fails', async () => {
    global.fetch.mockRejectedValue(new Error('network down'))
    const store = makeStore()

    await store.dispatch(fetchWorkflow())

    expect(store.getState().workflow.error).toBe(true)
    expect(store.getState().workflow.loading).toBe(false)
  })
})
