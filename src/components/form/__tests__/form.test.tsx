import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { ActionState } from '@/components/form/action-state-type'
import { Form } from '@/components/form/form'

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock useActionFeedback hook
const mockUseActionFeedback = vi.fn()
vi.mock('@/components/form/hooks/use-action-feedback', () => ({
  useActionFeedback: mockUseActionFeedback
}))

describe('Form Component', () => {
  const createActionState = (status: 'SUCCESS' | 'ERROR', message: string): ActionState => ({
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now()
  })

  const mockAction = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseActionFeedback.mockImplementation((actionState, callbacks) => {
      // Simulate the hook behavior
      if (actionState.status === 'SUCCESS' && actionState.message) {
        callbacks.onSuccess?.({ actionState })
      } else if (actionState.status === 'ERROR' && actionState.message) {
        callbacks.onError?.({ actionState })
      }
    })
  })

  it('should render children correctly', () => {
    const actionState = createActionState('SUCCESS', 'Success message')

    render(
      <Form action={mockAction} actionState={actionState}>
        <input type="text" name="test" />
        <button type="submit">Submit</button>
      </Form>
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should call action when form is submitted', async () => {
    const user = userEvent.setup()
    const actionState = createActionState('SUCCESS', 'Success message')

    render(
      <Form action={mockAction} actionState={actionState}>
        <input type="text" name="test" />
        <button type="submit">Submit</button>
      </Form>
    )

    await user.click(screen.getByRole('button'))

    expect(mockAction).toHaveBeenCalledTimes(1)
  })

  it('should show success toast when action state is SUCCESS', async () => {
    const { toast } = await import('sonner')
    const actionState = createActionState('SUCCESS', 'Success message')

    render(
      <Form action={mockAction} actionState={actionState}>
        <button type="submit">Submit</button>
      </Form>
    )

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Success message')
    })
  })

  it('should show error toast when action state is ERROR', async () => {
    const { toast } = await import('sonner')
    const actionState = createActionState('ERROR', 'Error message')

    render(
      <Form action={mockAction} actionState={actionState}>
        <button type="submit">Submit</button>
      </Form>
    )

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error message')
    })
  })

  it('should call onSuccess callback when provided', async () => {
    const onSuccess = vi.fn()
    const actionState = createActionState('SUCCESS', 'Success message')

    render(
      <Form action={mockAction} actionState={actionState} onSuccess={onSuccess}>
        <button type="submit">Submit</button>
      </Form>
    )

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(actionState)
    })
  })

  it('should call onError callback when provided', async () => {
    const onError = vi.fn()
    const actionState = createActionState('ERROR', 'Error message')

    render(
      <Form action={mockAction} actionState={actionState} onError={onError}>
        <button type="submit">Submit</button>
      </Form>
    )

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(actionState)
    })
  })

  it('should not show toast when message is empty', async () => {
    const { toast } = await import('sonner')
    const actionState = createActionState('SUCCESS', '')

    render(
      <Form action={mockAction} actionState={actionState}>
        <button type="submit">Submit</button>
      </Form>
    )

    await waitFor(() => {
      expect(toast.success).not.toHaveBeenCalled()
    })
  })

  it('should have correct form attributes', () => {
    const actionState = createActionState('SUCCESS', 'Success message')

    render(
      <Form action={mockAction} actionState={actionState}>
        <button type="submit">Submit</button>
      </Form>
    )

    const form = screen.getByRole('form', { hidden: true })
    expect(form).toHaveClass('flex', 'flex-col', 'gap-y-2')
  })
})
