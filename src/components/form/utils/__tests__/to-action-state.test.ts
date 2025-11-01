import { ApiError } from 'next/dist/server/api-utils'
import { describe, expect, it, vi } from 'vitest'
import { ZodError } from 'zod'

import { fromErrorToActionState, toActionState } from '@/components/form/utils/to-action-state'

describe('Action State Utility Functions', () => {
  describe('fromErrorToActionState', () => {
    it('should handle ZodError correctly', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'number',
          path: ['email'],
          message: 'Expected string, received number'
        }
      ])

      const result = fromErrorToActionState(zodError)

      expect(result.status).toBe('ERROR')
      expect(result.message).toBe('')
      expect(result.fieldErrors).toEqual({
        email: ['Expected string, received number']
      })
      expect(result.timestamp).toBeTypeOf('number')
    })

    it('should handle ApiError with user already exists message', () => {
      const apiError = new ApiError(400, 'User already exists. Use another email.')

      const result = fromErrorToActionState(apiError)

      expect(result.status).toBe('ERROR')
      expect(result.message).toBe('This email is already in use')
      expect(result.fieldErrors).toEqual({})
    })

    it('should handle generic ApiError', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const apiError = new ApiError(500, 'Internal server error')

      const result = fromErrorToActionState(apiError)

      expect(result.status).toBe('ERROR')
      expect(result.message).toBe('Something went wrong. Please try again later.')
      expect(result.fieldErrors).toEqual({})
      expect(consoleSpy).toHaveBeenCalledWith('Unexpeccted APIerror:', 'Internal server error')

      consoleSpy.mockRestore()
    })

    it('should handle generic Error', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const error = new Error('Something went wrong')

      const result = fromErrorToActionState(error)

      expect(result.status).toBe('ERROR')
      expect(result.message).toBe('Something went wrong')
      expect(result.fieldErrors).toEqual({})
      expect(consoleSpy).toHaveBeenCalledWith('Unexpeccted error:', 'Something went wrong')

      consoleSpy.mockRestore()
    })

    it('should handle unknown error types', () => {
      const unknownError = 'string error'

      const result = fromErrorToActionState(unknownError)

      expect(result.status).toBe('ERROR')
      expect(result.message).toBe('Something went wrong. Please try again later.')
      expect(result.fieldErrors).toEqual({})
    })

    it('should preserve payload when provided', () => {
      const formData = new FormData()
      formData.append('email', 'test@example.com')
      const error = new Error('Test error')

      const result = fromErrorToActionState(error, formData)

      expect(result.payload).toBe(formData)
    })
  })

  describe('toActionState', () => {
    it('should create success action state', () => {
      const result = toActionState('SUCCESS', 'Operation completed')

      expect(result.status).toBe('SUCCESS')
      expect(result.message).toBe('Operation completed')
      expect(result.fieldErrors).toEqual({})
      expect(result.timestamp).toBeTypeOf('number')
    })

    it('should create error action state', () => {
      const result = toActionState('ERROR', 'Operation failed')

      expect(result.status).toBe('ERROR')
      expect(result.message).toBe('Operation failed')
      expect(result.fieldErrors).toEqual({})
      expect(result.timestamp).toBeTypeOf('number')
    })

    it('should generate timestamps', () => {
      const result1 = toActionState('SUCCESS', 'Message 1')
      const result2 = toActionState('SUCCESS', 'Message 2')

      expect(result1.timestamp).toBeTypeOf('number')
      expect(result2.timestamp).toBeTypeOf('number')
      // Note: timestamps might be the same if called in rapid succession
    })
  })
})
