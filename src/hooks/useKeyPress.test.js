import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useKeyPress from './useKeyPress'

describe('useKeyPress', () => {
  it('reflects the target key being held down and released', () => {
    const { result } = renderHook(() => useKeyPress('Enter'))
    expect(result.current).toBe(false)

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    })
    expect(result.current).toBe(true)

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }))
    })
    expect(result.current).toBe(false)
  })

  it('ignores keys other than the target key', () => {
    const { result } = renderHook(() => useKeyPress('Enter'))

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    })
    expect(result.current).toBe(false)
  })
})
