import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { ActionState } from '@/components/form/action-state-type'
import { FieldError } from '@/components/form/field-error'

describe('FieldError Component', () => {
  const createActionState = (fieldErrors: Record<string, string[]>): ActionState => ({
    status: 'ERROR',
    message: '',
    fieldErrors,
    timestamp: Date.now()
  })

  it('should render error message when field has error', () => {
    const actionState = createActionState({
      email: ['Email is required']
    })

    render(<FieldError actionState={actionState} fieldName="email" />)

    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toHaveClass('text-red-500', 'text-sxs')
  })

  it('should render first error message when field has multiple errors', () => {
    const actionState = createActionState({
      email: ['Email is required', 'Email format is invalid']
    })

    render(<FieldError actionState={actionState} fieldName="email" />)

    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.queryByText('Email format is invalid')).not.toBeInTheDocument()
  })

  it('should not render anything when field has no error', () => {
    const actionState = createActionState({
      password: ['Password is required']
    })

    const { container } = render(<FieldError actionState={actionState} fieldName="email" />)

    expect(container.firstChild).toBeNull()
  })

  it('should not render anything when fieldErrors is empty', () => {
    const actionState = createActionState({})

    const { container } = render(<FieldError actionState={actionState} fieldName="email" />)

    expect(container.firstChild).toBeNull()
  })

  it('should not render anything when fieldErrors is undefined', () => {
    const actionState: ActionState = {
      status: 'ERROR',
      message: '',
      fieldErrors: undefined,
      timestamp: Date.now()
    }

    const { container } = render(<FieldError actionState={actionState} fieldName="email" />)

    expect(container.firstChild).toBeNull()
  })

  it('should handle different field names correctly', () => {
    const actionState = createActionState({
      email: ['Email error'],
      password: ['Password error'],
      confirmPassword: ['Password confirmation error']
    })

    render(<FieldError actionState={actionState} fieldName="password" />)

    expect(screen.getByText('Password error')).toBeInTheDocument()
    expect(screen.queryByText('Email error')).not.toBeInTheDocument()
    expect(screen.queryByText('Password confirmation error')).not.toBeInTheDocument()
  })
})

