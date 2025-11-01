import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { SignInForm } from '@/futures/auth/components/sign-in-form'

// Mock the sign-in action
vi.mock('@/futures/auth/actions/sign-in', () => ({
  signIn: vi.fn()
}))

describe('SignInForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render email and password fields', () => {
    render(<SignInForm />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('should render submit button', () => {
    render(<SignInForm />)

    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('should have correct input types', () => {
    render(<SignInForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')

    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should have correct input names', () => {
    render(<SignInForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')

    expect(emailInput).toHaveAttribute('name', 'email')
    expect(passwordInput).toHaveAttribute('name', 'password')
  })

  it('should have correct placeholders', () => {
    render(<SignInForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')

    expect(emailInput).toHaveAttribute('placeholder', 'Email')
    expect(passwordInput).toHaveAttribute('placeholder', 'Password')
  })

  it('should call signIn action when form is submitted', async () => {
    const user = userEvent.setup()
    render(<SignInForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Sign In' })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    expect(mockSignIn).toHaveBeenCalledTimes(1)
  })

  it('should preserve form values on error', () => {
    const actionState = {
      status: 'ERROR' as const,
      message: 'Invalid credentials',
      fieldErrors: { email: ['Email is required'] },
      payload: new FormData(),
      timestamp: Date.now()
    }

    // Mock useActionState to return error state
    vi.mocked(require('react').useActionState).mockReturnValue([
      actionState,
      mockSignIn,
      false
    ])

    render(<SignInForm />)

    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toHaveValue('')
  })

  it('should display field errors when present', () => {
    const actionState = {
      status: 'ERROR' as const,
      message: 'Validation failed',
      fieldErrors: {
        email: ['Email is required'],
        password: ['Password must be at least 6 characters']
      },
      payload: new FormData(),
      timestamp: Date.now()
    }

    // Mock useActionState to return error state
    vi.mocked(require('react').useActionState).mockReturnValue([
      actionState,
      mockSignIn,
      false
    ])

    render(<SignInForm />)

    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
  })

  it('should not display field errors when none present', () => {
    const actionState = {
      status: 'SUCCESS' as const,
      message: 'Successfully signed in',
      fieldErrors: {},
      payload: new FormData(),
      timestamp: Date.now()
    }

    // Mock useActionState to return success state
    vi.mocked(require('react').useActionState).mockReturnValue([
      actionState,
      mockSignIn,
      false
    ])

    render(<SignInForm />)

    expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    expect(screen.queryByText('Password must be at least 6 characters')).not.toBeInTheDocument()
  })

  it('should show loading state when pending', () => {
    // Mock useActionState to return pending state
    vi.mocked(require('react').useActionState).mockReturnValue([
      { status: 'SUCCESS', message: '', fieldErrors: {}, payload: new FormData(), timestamp: Date.now() },
      mockSignIn,
      true
    ])

    render(<SignInForm />)

    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    expect(submitButton).toBeDisabled()
  })
})
