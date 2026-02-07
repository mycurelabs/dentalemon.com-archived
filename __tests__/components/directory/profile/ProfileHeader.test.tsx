import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileHeader } from '@/components/directory/profile/ProfileHeader'
import { sampleDentists } from '@/data/dentists/sample-dentists'

describe('ProfileHeader', () => {
  const mockDentist = sampleDentists[0] // Dr. Jane Smith

  it('renders dentist name and credentials', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for name
    expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument()

    // Check for title/credentials
    expect(screen.getByText('DMD')).toBeInTheDocument()
  })

  it('renders specialty badge', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for specialty
    expect(screen.getByText('General Dentistry')).toBeInTheDocument()
  })

  it('renders years of experience', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for years of experience (15 Years of Experience)
    expect(screen.getByText(/15 Years of Experience/i)).toBeInTheDocument()
  })

  it('renders accepting new patients badge', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for accepting new patients badge
    expect(screen.getByText('Accepting New Patients')).toBeInTheDocument()
  })

  it('renders verified badge when dentist is verified', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for verified badge
    expect(screen.getByText('Verified Profile')).toBeInTheDocument()
  })

  it('renders languages spoken', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for languages
    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Tagalog')).toBeInTheDocument()
    expect(screen.getByText('Cebuano')).toBeInTheDocument()
  })

  it('renders availability date when available', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for availability text (should show "Next available: Feb 10, 2026")
    expect(screen.getByText(/Next available:/i)).toBeInTheDocument()
  })
})
