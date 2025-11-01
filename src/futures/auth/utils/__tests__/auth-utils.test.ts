import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getCurrentUser, getSession, getUserOrRedirect, sessionIsActive } from '@/futures/auth/utils/auth-utils'

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(() => Promise.resolve(new Headers()))
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn()
}))

// Mock auth
vi.mock('@/futures/auth/utils/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn()
    }
  }
}))

// Mock path
vi.mock('@/path', () => ({
  notSignInPath: vi.fn(() => '/not-sign-in')
}))

describe('Auth Utils', () => {
  const mockAuth = {
    api: {
      getSession: vi.fn()
    }
  }

  beforeEach(async () => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // Reset the mock implementation
    const { auth } = await import('@/futures/auth/utils/auth')
    Object.assign(auth, mockAuth)
  })

  describe('getSession', () => {
    it('should return session when auth succeeds', async () => {
      const mockSession = { user: { id: '1', email: 'test@example.com' } }
      mockAuth.api.getSession.mockResolvedValue(mockSession)

      const result = await getSession()

      expect(result).toEqual(mockSession)
      expect(mockAuth.api.getSession).toHaveBeenCalledWith({
        headers: expect.any(Headers)
      })
    })

    it('should return null when auth fails', async () => {
      mockAuth.api.getSession.mockRejectedValue(new Error('Auth failed'))

      const result = await getSession()

      expect(result).toBeNull()
      expect(console.error).toHaveBeenCalledWith('Error getting session:', expect.any(Error))
    })

    it('should handle undefined session', async () => {
      mockAuth.api.getSession.mockResolvedValue(undefined)

      const result = await getSession()

      expect(result).toBeUndefined()
    })
  })

  describe('sessionIsActive', () => {
    it('should return true when session exists', async () => {
      const mockSession = { user: { id: '1', email: 'test@example.com' } }
      mockAuth.api.getSession.mockResolvedValue(mockSession)

      const result = await sessionIsActive()

      expect(result).toBe(true)
    })

    it('should return false when session is null', async () => {
      mockAuth.api.getSession.mockResolvedValue(null)

      const result = await sessionIsActive()

      expect(result).toBe(false)
    })

    it('should return false when session is undefined', async () => {
      mockAuth.api.getSession.mockResolvedValue(undefined)

      const result = await sessionIsActive()

      expect(result).toBe(false)
    })

    it('should return false when auth throws error', async () => {
      mockAuth.api.getSession.mockRejectedValue(new Error('Auth failed'))

      const result = await sessionIsActive()

      expect(result).toBe(false)
    })
  })

  describe('getCurrentUser', () => {
    it('should return user when session exists', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
      const mockSession = { user: mockUser }
      mockAuth.api.getSession.mockResolvedValue(mockSession)

      const result = await getCurrentUser()

      expect(result).toEqual(mockUser)
    })

    it('should return null when session is null', async () => {
      mockAuth.api.getSession.mockResolvedValue(null)

      const result = await getCurrentUser()

      expect(result).toBeNull()
    })

    it('should return null when session has no user', async () => {
      mockAuth.api.getSession.mockResolvedValue({})

      const result = await getCurrentUser()

      expect(result).toBeNull()
    })

    it('should return null when auth throws error', async () => {
      mockAuth.api.getSession.mockRejectedValue(new Error('Auth failed'))

      const result = await getCurrentUser()

      expect(result).toBeNull()
      expect(console.error).toHaveBeenCalledWith('Error getting current user:', expect.any(Error))
    })
  })

  describe('getUserOrRedirect', () => {
    it('should return user when user exists', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
      const mockSession = { user: mockUser }
      mockAuth.api.getSession.mockResolvedValue(mockSession)

      const result = await getUserOrRedirect()

      expect(result).toEqual(mockUser)
    })

    it('should redirect when user does not exist', async () => {
      const { redirect } = await import('next/navigation')
      const { notSignInPath } = await import('@/path')

      mockAuth.api.getSession.mockResolvedValue(null)

      await getUserOrRedirect()

      expect(redirect).toHaveBeenCalledWith('/not-sign-in')
    })

    it('should redirect when auth throws error', async () => {
      const { redirect } = await import('next/navigation')

      mockAuth.api.getSession.mockRejectedValue(new Error('Auth failed'))

      await getUserOrRedirect()

      expect(redirect).toHaveBeenCalledWith('/not-sign-in')
    })
  })
})
