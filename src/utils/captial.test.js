import { describe, it, expect } from 'vitest'
import { capitalizeFirstLetter } from './captial'

describe('capitalizeFirstLetter', () => {
  it('uppercases the first letter of a lowercase word', () => {
    expect(capitalizeFirstLetter('workflow')).toBe('Workflow')
  })

  it('leaves an already-capitalized word unchanged', () => {
    expect(capitalizeFirstLetter('Workflow')).toBe('Workflow')
  })

  it('leaves the rest of the string untouched', () => {
    expect(capitalizeFirstLetter('hello world')).toBe('Hello world')
  })
})
