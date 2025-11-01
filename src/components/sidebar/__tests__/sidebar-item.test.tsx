import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SidebarItem } from '@/components/sidebar/components/sidebar-item'
import type { NavItem } from '@/components/sidebar/types'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/tickets'),
  Link: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  )
}))

describe('SidebarItem Component', () => {
  const mockNavItem: NavItem = {
    title: 'Test Item',
    icon: <span data-testid="test-icon">📋</span>,
    href: '/test'
  }

  it('should render nav item with icon and title', () => {
    render(<SidebarItem navItem={mockNavItem} isOpen={true} />)

    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    expect(screen.getByText('Test Item')).toBeInTheDocument()
  })

  it('should render as link with correct href', () => {
    render(<SidebarItem navItem={mockNavItem} isOpen={true} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('should show title when sidebar is open', () => {
    render(<SidebarItem navItem={mockNavItem} isOpen={true} />)

    const titleSpan = screen.getByText('Test Item')
    expect(titleSpan).toHaveClass('hidden', 'md:block')
  })

  it('should hide title when sidebar is closed', () => {
    render(<SidebarItem navItem={mockNavItem} isOpen={false} />)

    const titleSpan = screen.getByText('Test Item')
    expect(titleSpan).toHaveClass('hidden')
  })

  it('should apply active styles when path matches href', async () => {
    const { usePathname } = await import('next/navigation')
    vi.mocked(usePathname).mockReturnValue('/test')

    render(<SidebarItem navItem={mockNavItem} isOpen={true} />)

    const link = screen.getByRole('link')
    expect(link).toHaveClass('bg-white/70', 'font-bold', 'hover:bg-white/70')
  })

  it('should not apply active styles when path does not match href', async () => {
    const { usePathname } = await import('next/navigation')
    vi.mocked(usePathname).mockReturnValue('/other')

    render(<SidebarItem navItem={mockNavItem} isOpen={true} />)

    const link = screen.getByRole('link')
    expect(link).not.toHaveClass('bg-white/70', 'font-bold')
  })

  it('should have correct base classes', () => {
    render(<SidebarItem navItem={mockNavItem} isOpen={true} />)

    const link = screen.getByRole('link')
    expect(link).toHaveClass('group', 'relative', 'flex', 'h-12', 'justify-start')
  })

  it('should apply closed className when sidebar is closed', () => {
    render(<SidebarItem navItem={mockNavItem} isOpen={false} />)

    const titleSpan = screen.getByText('Test Item')
    expect(titleSpan).toHaveClass('text-background', 'opacity-0', 'transition-all', 'duration-300')
  })

  it('should handle different nav items correctly', () => {
    const differentNavItem: NavItem = {
      title: 'Different Item',
      icon: <span data-testid="different-icon">🎯</span>,
      href: '/different'
    }

    render(<SidebarItem navItem={differentNavItem} isOpen={true} />)

    expect(screen.getByTestId('different-icon')).toBeInTheDocument()
    expect(screen.getByText('Different Item')).toBeInTheDocument()

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/different')
  })
})
