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

    // Check for title/credentials (now rendered as ", DMD" suffix)
    expect(screen.getByText(', DMD')).toBeInTheDocument()
  })

  it('renders specialty', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for specialty (now rendered as plain text in subtitle)
    expect(screen.getByText(/General Dentistry/)).toBeInTheDocument()
  })

  it('renders years of experience', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for years of experience (now lowercase: "15 years of experience")
    expect(screen.getByText(/15 years of experience/i)).toBeInTheDocument()
  })

  it('renders accepting new patients indicator', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for accepting new patients (now lowercase inline text)
    expect(screen.getByText(/Accepting new patients/)).toBeInTheDocument()
  })

  it('renders verified icon when dentist is verified', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Verified badge is now a tooltip icon — check for the SVG element
    const verifiedIcon = document.querySelector('.lucide-badge-check')
    expect(verifiedIcon).toBeInTheDocument()
  })

  it('renders languages spoken', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Languages are now comma-separated text
    expect(screen.getByText(/English, Tagalog, Cebuano/)).toBeInTheDocument()
  })

  it('renders availability date when available', () => {
    render(<ProfileHeader dentist={mockDentist} />)

    // Check for availability text
    expect(screen.getByText(/Next available:/i)).toBeInTheDocument()
  })
})
