import { describe, expect, it } from 'vitest'

import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('should handle conditional classes', () => {
    expect(cn('base', true && 'conditional')).toBe('base conditional')
    expect(cn('base', false && 'conditional')).toBe('base')
  })

  it('should handle arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3')
  })

  it('should handle objects with boolean values', () => {
    expect(cn({ 'class1': true, 'class2': false })).toBe('class1')
  })

  it('should merge conflicting Tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('should handle empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
  })

  it('should handle mixed input types', () => {
    expect(cn('base', ['array1', 'array2'], { 'object': true }, 'string')).toBe('base array1 array2 object string')
  })
})

