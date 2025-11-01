import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Sidebar } from '@/components/sidebar/components/sidebar'

describe('Sidebar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render sidebar when user is logged in', () => {
    render(<Sidebar isLoggedIn={true} />)

    expect(screen.getByRole('complementary')).toBeInTheDocument()
  })

  it('should render placeholder when user is not logged in', () => {
    render(<Sidebar isLoggedIn={false} />)

    const placeholder = screen.getByRole('generic', { hidden: true })
    expect(placeholder).toHaveClass('w-[78px]', 'bg-secondary/20')
  })

  it('should expand on mouse enter', async () => {
    const user = userEvent.setup()
    render(<Sidebar isLoggedIn={true} />)

    const sidebar = screen.getByRole('complementary')

    await user.hover(sidebar)

    await waitFor(() => {
      expect(sidebar).toHaveClass('w-[78px]', 'md:w-60')
    })
  })

  it('should collapse on mouse leave', async () => {
    const user = userEvent.setup()
    render(<Sidebar isLoggedIn={true} />)

    const sidebar = screen.getByRole('complementary')

    // First hover to expand
    await user.hover(sidebar)
    await waitFor(() => {
      expect(sidebar).toHaveClass('w-[78px]', 'md:w-60')
    })

    // Then leave to collapse
    await user.unhover(sidebar)
    await waitFor(() => {
      expect(sidebar).toHaveClass('w-[78px]')
    })
  })

  it('should have correct initial classes', () => {
    render(<Sidebar isLoggedIn={true} />)

    const sidebar = screen.getByRole('complementary')
    expect(sidebar).toHaveClass(
      'animate-sidebar-left',
      'h-screen',
      'border-r',
      'pt-24',
      'w-[78px]'
    )
  })

  it('should apply transition classes during animation', async () => {
    const user = userEvent.setup()
    render(<Sidebar isLoggedIn={true} />)

    const sidebar = screen.getByRole('complementary')

    await user.hover(sidebar)

    // During transition, should have duration class
    expect(sidebar).toHaveClass('duration-200')
  })

  it('should render navigation items', () => {
    render(<Sidebar isLoggedIn={true} />)

    // Check if navigation container exists
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('space-y-2')
  })

  it('should handle rapid mouse enter/leave events', async () => {
    const user = userEvent.setup()
    render(<Sidebar isLoggedIn={true} />)

    const sidebar = screen.getByRole('complementary')

    // Rapid hover events
    await user.hover(sidebar)
    await user.unhover(sidebar)
    await user.hover(sidebar)
    await user.unhover(sidebar)

    // Should still be in collapsed state
    await waitFor(() => {
      expect(sidebar).toHaveClass('w-[78px]')
    })
  })

  it('should maintain state consistency during transitions', async () => {
    const user = userEvent.setup()
    render(<Sidebar isLoggedIn={true} />)

    const sidebar = screen.getByRole('complementary')

    // Start hover
    await user.hover(sidebar)

    // Should be transitioning
    expect(sidebar).toHaveClass('duration-200')

    // Wait for transition to complete
    await waitFor(() => {
      expect(sidebar).not.toHaveClass('duration-200')
    }, { timeout: 300 })
  })
})
