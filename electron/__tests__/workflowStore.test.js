import fs from 'fs'
import os from 'os'
import path from 'path'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { makeWorkflowStore } from '../workflowStore'

describe('workflowStore', () => {
  let dir
  let store

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'crawless-test-'))
    store = makeWorkflowStore(dir)
  })

  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true })
  })

  it('starts empty', () => {
    expect(store.list()).toEqual([])
  })

  it('creates a workflow with the spec-required fields', () => {
    const workflow = store.create({ name: 'my-workflow', code_js: 'Log.info(1)' })
    expect(workflow).toMatchObject({
      name: 'my-workflow',
      code_js: 'Log.info(1)',
      is_running: false,
      last_run_date: null,
      options: { userAgent: '', visibility: 'visible' },
    })
    expect(workflow.date_created).toBeTruthy()
  })

  it('rejects a duplicate name', () => {
    store.create({ name: 'dup' })
    expect(() => store.create({ name: 'dup' })).toThrow(/already exists/)
  })

  it('persists across store instances (same userData dir)', () => {
    store.create({ name: 'persisted' })
    const reopened = makeWorkflowStore(dir)
    expect(reopened.list().map((w) => w.name)).toEqual(['persisted'])
  })

  it('updates fields on an existing workflow', () => {
    store.create({ name: 'to-update' })
    const updated = store.update('to-update', { is_running: true })
    expect(updated.is_running).toBe(true)
    expect(store.list()[0].is_running).toBe(true)
  })

  it('throws when updating a workflow that does not exist', () => {
    expect(() => store.update('missing', {})).toThrow(/No workflow/)
  })

  it('removes a workflow', () => {
    store.create({ name: 'to-remove' })
    store.remove('to-remove')
    expect(store.list()).toEqual([])
  })
})
