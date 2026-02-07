import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ClinicSchedules } from '@/components/directory/profile/ClinicSchedules'
import { sampleDentists } from '@/data/dentists/sample-dentists'

describe('ClinicSchedules', () => {
  const mockDentist = sampleDentists[0] // Dr. Jane Smith
  const mockClinics = mockDentist.clinics

  it('renders multiple clinics', () => {
    render(<ClinicSchedules clinics={mockClinics} />)

    // Check for clinic name
    expect(screen.getByText('SmileCare Dental Clinic - Makati')).toBeInTheDocument()
  })

  it('renders clinic address', () => {
    render(<ClinicSchedules clinics={mockClinics} />)

    // Check for address components
    expect(screen.getByText(/Unit 305, Greenbelt Tower 3, Ayala Avenue/i)).toBeInTheDocument()
    expect(screen.getByText(/Makati, Metro Manila 1224/i)).toBeInTheDocument()
  })

  it('renders clinic contact information', () => {
    render(<ClinicSchedules clinics={mockClinics} />)

    // Check for phone
    expect(screen.getByText('+63 2 8856 4321')).toBeInTheDocument()

    // Check for email
    expect(screen.getByText('makati@smilecare.ph')).toBeInTheDocument()
  })

  it('renders schedule for each clinic', () => {
    render(<ClinicSchedules clinics={mockClinics} />)

    // Check for schedule section
    expect(screen.getByText('Schedule')).toBeInTheDocument()

    // Check for at least one day in the schedule
    expect(screen.getByText(/Monday:/i)).toBeInTheDocument()
  })

  it('renders consultation fee', () => {
    render(<ClinicSchedules clinics={mockClinics} />)

    // Check for consultation fee section
    expect(screen.getByText('Consultation Fee')).toBeInTheDocument()

    // Check for fee amount (PHP 1,500)
    expect(screen.getByText(/PHP 1,500/i)).toBeInTheDocument()

    // Check for consultation type
    expect(screen.getByText('Initial Consultation')).toBeInTheDocument()
  })

  it('renders Book CTA button present', () => {
    render(<ClinicSchedules clinics={mockClinics} />)

    // Check for book button
    const bookButton = screen.getByRole('button', { name: /Book at SmileCare Dental Clinic - Makati/i })
    expect(bookButton).toBeInTheDocument()
  })

  it('calls onBookClick when book button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnBookClick = vi.fn()

    render(<ClinicSchedules clinics={mockClinics} onBookClick={mockOnBookClick} />)

    const bookButton = screen.getByRole('button', { name: /Book at SmileCare Dental Clinic - Makati/i })
    await user.click(bookButton)

    expect(mockOnBookClick).toHaveBeenCalledWith(mockClinics[0].id)
  })

  it('renders multiple clinic schedules when dentist has multiple clinics', () => {
    // Use a dentist with multiple clinics (if available in sample data)
    // For now, we'll test with the one clinic
    render(<ClinicSchedules clinics={mockClinics} />)

    // Check that section title exists
    expect(screen.getByText('Clinic Locations & Schedules')).toBeInTheDocument()

    // Verify clinic count matches
    const clinicCards = screen.getAllByRole('button', { name: /Book at/i })
    expect(clinicCards).toHaveLength(mockClinics.length)
  })

  it('renders schedule time slots correctly', () => {
    render(<ClinicSchedules clinics={mockClinics} />)

    // Check for morning and afternoon slots (multiple days have same slots)
    const morningSlots = screen.getAllByText(/09:00 - 12:00/i)
    expect(morningSlots.length).toBeGreaterThan(0)
    const afternoonSlots = screen.getAllByText(/14:00 - 18:00/i)
    expect(afternoonSlots.length).toBeGreaterThan(0)
  })
})
