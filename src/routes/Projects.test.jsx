import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StoreProvider } from '../contexts/store'
import Projects from './Projects'

// Isolate this test from @crawless/ui's own bundling quirks — its Svg
// components aren't what's under test here.
vi.mock('@crawless/ui', () => ({
  Svg: new Proxy({}, { get: (_target, name) => (props) => <svg data-icon={String(name)} {...props} /> }),
}))

function renderProjects() {
  return render(
    <MemoryRouter>
      <StoreProvider>
        <Projects />
      </StoreProvider>
    </MemoryRouter>,
  )
}

describe('Projects', () => {
  beforeEach(() => {
    window.crawless = {
      listWorkflows: vi.fn().mockResolvedValue([{ name: 'existing-workflow' }]),
      createWorkflow: vi.fn().mockResolvedValue({ name: 'new-workflow' }),
      deleteWorkflow: vi.fn().mockResolvedValue(undefined),
    }
  })

  it('lists workflows from window.crawless', async () => {
    renderProjects()
    expect(await screen.findByText('existing-workflow')).toBeInTheDocument()
  })

  it('deletes a workflow and refreshes the list', async () => {
    renderProjects()
    await screen.findByText('existing-workflow')

    window.crawless.listWorkflows.mockResolvedValue([])
    fireEvent.click(screen.getByTestId('delete-existing-workflow'))

    await waitFor(() => expect(window.crawless.deleteWorkflow).toHaveBeenCalledWith('existing-workflow'))
    await waitFor(() => expect(screen.queryByText('existing-workflow')).not.toBeInTheDocument())
  })
})
