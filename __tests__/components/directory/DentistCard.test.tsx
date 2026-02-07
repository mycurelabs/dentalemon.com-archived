import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DentistCard } from '@/components/directory/DentistCard'
import { Dentist } from '@/types/dentist'

describe('DentistCard', () => {
  const mockDentist: Dentist = {
    id: 'dentist-001',
    slug: 'dr-jane-smith',
    name: 'Dr. Jane Smith',
    title: 'DMD',
    photo: 'https://example.com/photo.jpg',
    specialty: 'General Dentistry',
    specialties: ['General Dentistry', 'Cosmetic Dentistry'],
    bio: 'Experienced dentist with 15 years of practice',
    yearsOfExperience: 15,
    education: [
      {
        degree: 'Doctor of Dental Medicine (DMD)',
        institution: 'University of the Philippines Manila',
        year: 2009,
        location: 'Manila, Philippines',
      },
    ],
    certifications: [],
    affiliations: ['Philippine Dental Association'],
    services: ['Teeth Cleaning', 'Root Canal', 'Dental Implants', 'Whitening', 'Veneers'],
    clinics: [
      {
        id: 'clinic-001',
        name: 'Smile Clinic Makati',
        address: {
          street: '123 Main St',
          city: 'Makati',
          province: 'Metro Manila',
          postalCode: '1200',
          country: 'Philippines',
        },
        contact: {
          phone: '+63 2 1234 5678',
          email: 'clinic@example.com',
        },
        schedules: [],
        fees: [],
      },
    ],
    languages: ['English', 'Tagalog'],
    availability: {
      date: '2026-02-15',
      time: '14:00',
      clinicId: 'clinic-001',
      clinicName: 'Smile Clinic Makati',
    },
    faqs: [],
    contact: {
      phone: '+63 917 123 4567',
      email: 'drsmith@example.com',
    },
    verified: true,
    featured: true,
  }

  describe('Required Fields Rendering', () => {
    it('renders dentist name', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      expect(screen.getByText(/Dr. Jane Smith/i)).toBeInTheDocument()
    })

    it('renders dentist name with title', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      expect(screen.getByText(/Dr. Jane Smith, DMD/i)).toBeInTheDocument()
    })

    it('renders dentist photo', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      const image = screen.getByAltText(/Dr. Jane Smith - General Dentistry/i)
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', mockDentist.photo)
    })

    it('renders specialty badge', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      expect(screen.getByText('General Dentistry')).toBeInTheDocument()
    })

    it('renders services (first 4 displayed)', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      // Should show first 4 services
      expect(screen.getByText('Teeth Cleaning')).toBeInTheDocument()
      expect(screen.getByText('Root Canal')).toBeInTheDocument()
      expect(screen.getByText('Dental Implants')).toBeInTheDocument()
      expect(screen.getByText('Whitening')).toBeInTheDocument()

      // Should show "+1 more" since there are 5 total services
      expect(screen.getByText('+1 more')).toBeInTheDocument()

      // Fifth service should not be directly visible
      expect(screen.queryByText('Veneers')).not.toBeInTheDocument()
    })

    it('renders location from first clinic', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      expect(screen.getByText('Makati')).toBeInTheDocument()
    })

    it('renders availability date when available', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      // Check for availability indicator (now shows "Next available: Feb 15")
      expect(screen.getByText(/Next available:/i)).toBeInTheDocument()
    })
  })

  describe('Availability Indicator', () => {
    it('shows green indicator and date when dentist is available', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      // Check for availability text
      expect(screen.getByText(/Available/i)).toBeInTheDocument()
    })

    it('shows gray indicator when dentist has no availability', () => {
      const dentistNoAvailability: Dentist = {
        ...mockDentist,
        availability: {
          date: '',
          time: '',
          clinicId: '',
          clinicName: '',
        },
      }

      render(<DentistCard dentist={dentistNoAvailability} viewMode="grid" />)

      expect(screen.getByText('Contact for availability')).toBeInTheDocument()
    })
  })

  describe('CTA Links', () => {
    it('renders View Profile link with correct URL', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      const viewProfileLink = screen.getByText('View Profile').closest('a')
      expect(viewProfileLink).toBeInTheDocument()
      expect(viewProfileLink).toHaveAttribute('href', '/find-a-dentist/dr-jane-smith')
    })

    it('renders Book Appointment button', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      const bookButton = screen.getByText('Book Appointment')
      expect(bookButton).toBeInTheDocument()
    })

    it('calls onBookClick with dentist ID when Book Appointment is clicked', async () => {
      const mockOnBookClick = vi.fn()
      const user = userEvent.setup()

      render(<DentistCard dentist={mockDentist} viewMode="grid" onBookClick={mockOnBookClick} />)

      const bookButton = screen.getByText('Book Appointment')
      await user.click(bookButton)

      expect(mockOnBookClick).toHaveBeenCalledWith('dentist-001')
      expect(mockOnBookClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('View Modes', () => {
    it('applies grid view classes when viewMode is grid', () => {
      const { container } = render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      // Card always has flex-row for mobile list view, but adds md:block for desktop grid
      const card = container.querySelector('[class*="overflow-hidden"]')
      expect(card).toHaveClass('flex', 'flex-row', 'md:block')
    })

    it('applies list view classes when viewMode is list', () => {
      const { container } = render(<DentistCard dentist={mockDentist} viewMode="list" />)

      // Card should have flex and flex-row classes in list view
      const card = container.querySelector('[class*="overflow-hidden"]')
      expect(card).toHaveClass('flex', 'flex-row')
    })

    it('renders buttons with responsive width in grid view', () => {
      render(<DentistCard dentist={mockDentist} viewMode="grid" />)

      const bookButton = screen.getByText('Book Appointment')

      // Book button should have md:w-full for desktop grid view (inline on mobile)
      expect(bookButton).toHaveClass('md:w-full')

      const viewProfileLink = screen.getByText('View Profile').closest('a')
      expect(viewProfileLink).toBeInTheDocument()
    })

    it('renders buttons as inline in list view', () => {
      render(<DentistCard dentist={mockDentist} viewMode="list" />)

      const viewProfileLink = screen.getByText('View Profile').closest('a')
      const bookButton = screen.getByText('Book Appointment')

      // Buttons should NOT have w-full class in list view
      expect(viewProfileLink).not.toHaveClass('w-full')
      expect(bookButton).not.toHaveClass('w-full')
    })
  })

  describe('Edge Cases', () => {
    it('shows "Location not specified" when dentist has no clinics', () => {
      const dentistNoClinics: Dentist = {
        ...mockDentist,
        clinics: [],
      }

      render(<DentistCard dentist={dentistNoClinics} viewMode="grid" />)

      expect(screen.getByText('Location not specified')).toBeInTheDocument()
    })

    it('renders dentist without title', () => {
      const dentistNoTitle: Dentist = {
        ...mockDentist,
        title: '',
      }

      render(<DentistCard dentist={dentistNoTitle} viewMode="grid" />)

      // Should show name without comma and title
      expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument()
      expect(screen.queryByText(/,/)).not.toBeInTheDocument()
    })

    it('does not show +X more badge when services are 4 or fewer', () => {
      const dentistFewServices: Dentist = {
        ...mockDentist,
        services: ['Teeth Cleaning', 'Root Canal', 'Dental Implants'],
      }

      render(<DentistCard dentist={dentistFewServices} viewMode="grid" />)

      expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument()
    })

    it('handles dentist with no photo gracefully', () => {
      const dentistNoPhoto: Dentist = {
        ...mockDentist,
        photo: '',
      }

      const { container } = render(<DentistCard dentist={dentistNoPhoto} viewMode="grid" />)

      // Should render placeholder icon instead of image
      expect(screen.queryByAltText(/Dr. Jane Smith/i)).not.toBeInTheDocument()
      const placeholder = container.querySelector('.bg-neutral-100')
      expect(placeholder).toBeInTheDocument()
    })
  })
})
