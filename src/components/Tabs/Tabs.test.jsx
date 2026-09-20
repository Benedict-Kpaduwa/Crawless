import React, { useEffect } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StoreProvider, useStore } from '../../contexts/store'
import Tabs from './Tabs'

// Isolate this test from @crawless/ui's own bundling quirks — its Svg
// components aren't what's under test here.
vi.mock('@crawless/ui', () => ({
  Svg: new Proxy({}, { get: (_target, name) => (props) => <svg data-icon={String(name)} {...props} /> }),
}))

// Tabs reads its open-tab list from StoreContext rather than props, so tests
// seed it through a small helper that opens tabs on mount.
function withOpenTabs(names) {
  return function Wrapper() {
    const { setOpenTabs, setTab } = useStore()
    useEffect(() => {
      setOpenTabs(names)
      setTab(names[0])
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <Tabs />
  }
}

function renderTabs(names) {
  const Wrapper = withOpenTabs(names)
  return render(
    <MemoryRouter>
      <StoreProvider>
        <Wrapper />
      </StoreProvider>
    </MemoryRouter>,
  )
}

describe('Tabs', () => {
  it('renders one tab per open workflow', () => {
    renderTabs(['alpha', 'beta'])
    expect(screen.getByText('alpha')).toBeInTheDocument()
    expect(screen.getByText('beta')).toBeInTheDocument()
  })

  it('removes the active tab when its close button is clicked', () => {
    // Only the active tab (the first one here, per withOpenTabs) renders a
    // close button — this matches Tabs.jsx's existing behavior.
    renderTabs(['alpha', 'beta'])
    fireEvent.click(screen.getByText('×'))
    expect(screen.queryByText('alpha')).not.toBeInTheDocument()
    expect(screen.getByText('beta')).toBeInTheDocument()
  })
})
