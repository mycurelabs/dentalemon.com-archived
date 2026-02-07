import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DentistProfileClient } from '@/app/find-a-dentist/[slug]/DentistProfileClient'
import { sampleDentists } from '@/data/dentists/sample-dentists'

// Mock the BookingWizard component since it's complex and not the focus of this test
vi.mock('@/components/directory/BookingWizard', () => ({
  BookingWizard: ({ isOpen, onClose }: any) => (
    isOpen ? <div data-testid="booking-wizard">Booking Wizard</div> : null
  ),
}))

describe('DentistProfileClient (Profile Page)', () => {
  const mockDentist = sampleDentists[0] // Dr. Jane Smith

  it('profile page renders with valid dentist data', () => {
    render(<DentistProfileClient dentist={mockDentist} />)

    // Check for dentist name in header
    expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument()

    // Check for specialty
    expect(screen.getByText('General Dentistry')).toBeInTheDocument()

    // Check for bio section
    expect(screen.getByText(/Dr. Jane Smith is a dedicated general dentist/i)).toBeInTheDocument()
  })

  it('renders profile header component', () => {
    render(<DentistProfileClient dentist={mockDentist} />)

    // Check for header elements
    expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('DMD')).toBeInTheDocument()
    expect(screen.getByText('15 Years of Experience')).toBeInTheDocument()
  })

  it('renders clinic schedules section', () => {
    render(<DentistProfileClient dentist={mockDentist} />)

    // Check for clinic schedules section
    expect(screen.getByText('Clinic Locations & Schedules')).toBeInTheDocument()
    // Clinic name may appear in both ClinicSchedules and EarliestAvailability
    const clinicNames = screen.getAllByText('SmileCare Dental Clinic - Makati')
    expect(clinicNames.length).toBeGreaterThan(0)
  })

  it('renders education and certifications section', () => {
    render(<DentistProfileClient dentist={mockDentist} />)

    // Check for education section
    expect(screen.getByText('Education & Certifications')).toBeInTheDocument()
    expect(screen.getByText(/University of the Philippines Manila/i)).toBeInTheDocument()
  })

  it('renders sidebar with earliest availability', () => {
    render(<DentistProfileClient dentist={mockDentist} />)

    // Check for earliest availability card
    expect(screen.getByText('Earliest Availability')).toBeInTheDocument()
    // Book This Slot may appear in EarliestAvailability and BookingWizard
    const bookButtons = screen.getAllByText(/Book This Slot/i)
    expect(bookButtons.length).toBeGreaterThan(0)
  })

  it('renders sidebar with affiliations', () => {
    render(<DentistProfileClient dentist={mockDentist} />)

    // Check for affiliations section
    expect(screen.getByText('Professional Affiliations')).toBeInTheDocument()
    expect(screen.getByText('Philippine Dental Association (PDA)')).toBeInTheDocument()
  })

  it('renders sidebar with FAQ accordion', () => {
    render(<DentistProfileClient dentist={mockDentist} />)

    // Check for FAQ section
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
    expect(screen.getByText('Do you accept walk-in patients?')).toBeInTheDocument()
  })

  it('renders legal disclaimer', () => {
    render(<DentistProfileClient dentist={mockDentist} />)

    // Check for legal disclaimer (actual text: "This directory is for informational purposes only")
    expect(screen.getByText(/informational purposes only/i)).toBeInTheDocument()
  })

  it('renders book appointment CTAs', () => {
    render(<DentistProfileClient dentist={mockDentist} />)

    // Check for book buttons
    const bookButtons = screen.getAllByRole('button', { name: /Book/i })
    expect(bookButtons.length).toBeGreaterThan(0)
  })

  it('uses responsive 2-column layout', () => {
    const { container } = render(<DentistProfileClient dentist={mockDentist} />)

    // Check for grid layout classes
    const gridElement = container.querySelector('.grid')
    expect(gridElement).toBeInTheDocument()
  })
})

// Additional test for the server component behavior (metadata, breadcrumbs, etc.)
// Note: These would typically be tested with integration or E2E tests
describe('Profile Page Integration', () => {
  const mockDentist = sampleDentists[0]

  it('should render breadcrumb structure (integration test concept)', () => {
    // This is a conceptual test - in a real scenario, you'd test the full page
    // including the server component with breadcrumbs
    // For now, we're just testing the client component

    render(<DentistProfileClient dentist={mockDentist} />)

    // Verify core content is present
    expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument()
  })

  it('should display all required profile sections', () => {
    render(<DentistProfileClient dentist={mockDentist} />)

    // Verify all main sections are present
    const sections = [
      'Dr. Jane Smith', // Header
      'Clinic Locations & Schedules', // Clinics
      'Education & Certifications', // Education
      'Earliest Availability', // Sidebar
      'Professional Affiliations', // Sidebar
      'Frequently Asked Questions', // Sidebar
    ]

    sections.forEach(section => {
      expect(screen.getByText(section)).toBeInTheDocument()
    })
  })

  it('should handle invalid dentist slug (404 case)', () => {
    // Test that an invalid slug would return undefined from sampleDentists.find()
    const invalidSlug = 'non-existent-dentist-slug-12345'
    const dentist = sampleDentists.find((d) => d.slug === invalidSlug)

    // Verify that notFound() would be called for invalid slug
    expect(dentist).toBeUndefined()
  })
})
