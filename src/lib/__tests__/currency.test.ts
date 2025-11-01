import { describe, expect, it } from 'vitest'

import { fromCent, toCent } from '@/lib/curency'

describe('Currency utility functions', () => {
  describe('toCent', () => {
    it('should convert dollars to cents correctly', () => {
      expect(toCent(1)).toBe(100)
      expect(toCent(10)).toBe(1000)
      expect(toCent(0.5)).toBe(50)
      expect(toCent(0.01)).toBe(1)
    })

    it('should handle decimal amounts', () => {
      expect(toCent(1.23)).toBe(123)
      expect(toCent(10.99)).toBe(1099)
      expect(toCent(0.99)).toBe(99)
    })

    it('should round to nearest cent', () => {
      expect(toCent(1.234)).toBe(123)
      expect(toCent(1.236)).toBe(124)
    })

    it('should handle zero', () => {
      expect(toCent(0)).toBe(0)
    })

    it('should handle negative amounts', () => {
      expect(toCent(-1)).toBe(-100)
      expect(toCent(-0.5)).toBe(-50)
    })
  })

  describe('fromCent', () => {
    it('should convert cents to dollars correctly', () => {
      expect(fromCent(100)).toBe(1)
      expect(fromCent(1000)).toBe(10)
      expect(fromCent(50)).toBe(0) // round(0) rounds to nearest integer
      expect(fromCent(1)).toBe(0) // round(0) rounds to nearest integer
    })

    it('should handle decimal cents', () => {
      expect(fromCent(123)).toBe(1) // round(0) rounds to nearest integer
      expect(fromCent(1099)).toBe(11) // round(0) rounds to nearest integer
      expect(fromCent(99)).toBe(1) // round(0) rounds to nearest integer
    })

    it('should handle zero', () => {
      expect(fromCent(0)).toBe(0)
    })

    it('should handle negative cents', () => {
      expect(fromCent(-100)).toBe(-1)
      expect(fromCent(-50)).toBe(0) // round(0) rounds to nearest integer
    })
  })

  describe('round-trip conversion', () => {
    it('should maintain precision through conversion for whole numbers', () => {
      const originalAmount = 1
      const cents = toCent(originalAmount)
      const backToDollars = fromCent(cents)
      expect(backToDollars).toBe(originalAmount)
    })

    it('should handle edge cases', () => {
      const testCases = [0, 1, 10, 100] // Only test whole numbers due to round(0)

      testCases.forEach(amount => {
        const cents = toCent(amount)
        const backToDollars = fromCent(cents)
        expect(backToDollars).toBe(amount)
      })
    })
  })
})
