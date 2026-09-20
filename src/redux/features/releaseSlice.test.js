import { describe, it, expect, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import releaseReducer, { fetchReleases } from './releaseSlice'

describe('releaseSlice', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  function makeStore() {
    return configureStore({ reducer: { release: releaseReducer } })
  }

  it('parses the response body as JSON (regression: used to pass res.json as the payload)', async () => {
    const payload = [{ version: '1.0.0' }]
    global.fetch.mockResolvedValue({ json: async () => payload })
    const store = makeStore()

    await store.dispatch(fetchReleases())

    expect(store.getState().release.releases).toEqual(payload)
  })

  it('sets error state when the request fails', async () => {
    global.fetch.mockRejectedValue(new Error('network down'))
    const store = makeStore()

    await store.dispatch(fetchReleases())

    expect(store.getState().release.error).toBe(true)
  })
})
