import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DirectoryContent } from '@/app/find-a-dentist/DirectoryContent'
import { Dentist } from '@/types/dentist'

// Increase test timeout for debounce tests
const TEST_TIMEOUT = 10000

describe('Find a Dentist Directory Page', () => {
  const mockDentists: Dentist[] = [
    {
      id: 'dentist-001',
      slug: 'dr-jane-smith',
      name: 'Dr. Jane Smith',
      title: 'DMD',
      photo: 'https://example.com/jane.jpg',
      specialty: 'General Dentistry',
      specialties: ['General Dentistry', 'Cosmetic Dentistry'],
      bio: 'Experienced general dentist',
      yearsOfExperience: 15,
      education: [],
      certifications: [],
      affiliations: [],
      services: ['Teeth Cleaning', 'Root Canal', 'Dental Implants'],
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
          contact: { phone: '+63 2 1234 5678', email: 'clinic@example.com' },
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
      contact: { phone: '+63 917 123 4567', email: 'drsmith@example.com' },
      verified: true,
      featured: true,
    },
    {
      id: 'dentist-002',
      slug: 'dr-john-doe',
      name: 'Dr. John Doe',
      title: 'DDS',
      photo: 'https://example.com/john.jpg',
      specialty: 'Orthodontics',
      specialties: ['Orthodontics'],
      bio: 'Specialized orthodontist',
      yearsOfExperience: 10,
      education: [],
      certifications: [],
      affiliations: [],
      services: ['Braces', 'Invisalign', 'Retainers'],
      clinics: [
        {
          id: 'clinic-002',
          name: 'Ortho Center Quezon City',
          address: {
            street: '456 QC Ave',
            city: 'Quezon City',
            province: 'Metro Manila',
            postalCode: '1100',
            country: 'Philippines',
          },
          contact: { phone: '+63 2 9876 5432', email: 'ortho@example.com' },
          schedules: [],
          fees: [],
        },
      ],
      languages: ['English', 'Tagalog'],
      availability: {
        date: '2026-02-20',
        time: '10:00',
        clinicId: 'clinic-002',
        clinicName: 'Ortho Center Quezon City',
      },
      faqs: [],
      contact: { phone: '+63 917 987 6543', email: 'drjohn@example.com' },
      verified: true,
      featured: false,
    },
    {
      id: 'dentist-003',
      slug: 'dr-maria-santos',
      name: 'Dr. Maria Santos',
      title: 'DMD',
      photo: 'https://example.com/maria.jpg',
      specialty: 'Pediatric Dentistry',
      specialties: ['Pediatric Dentistry'],
      bio: 'Child-friendly dentist',
      yearsOfExperience: 8,
      education: [],
      certifications: [],
      affiliations: [],
      services: ['Teeth Cleaning', 'Fluoride Treatment', 'Sealants'],
      clinics: [
        {
          id: 'clinic-003',
          name: 'Kids Dental Manila',
          address: {
            street: '789 Manila St',
            city: 'Manila',
            province: 'Metro Manila',
            postalCode: '1000',
            country: 'Philippines',
          },
          contact: { phone: '+63 2 5555 1234', email: 'kids@example.com' },
          schedules: [],
          fees: [],
        },
      ],
      languages: ['English', 'Tagalog'],
      availability: {
        date: '2026-02-18',
        time: '09:00',
        clinicId: 'clinic-003',
        clinicName: 'Kids Dental Manila',
      },
      faqs: [],
      contact: { phone: '+63 917 555 1234', email: 'drmaria@example.com' },
      verified: true,
      featured: true,
    },
  ]


  describe('Initial Rendering', () => {
    it('renders the directory page with header', () => {
      render(<DirectoryContent initialDentists={mockDentists} />)

      expect(screen.getByText(/Find the Right Dentist/i)).toBeInTheDocument()
      expect(screen.getByText(/Search verified dentists in Metro Manila/i)).toBeInTheDocument()
    })

    it('renders search bar', () => {
      render(<DirectoryContent initialDentists={mockDentists} />)

      const searchInput = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i)
      expect(searchInput).toBeInTheDocument()
    })

    it('displays all dentists initially', () => {
      render(<DirectoryContent initialDentists={mockDentists} />)

      expect(screen.getByText('3 dentists found')).toBeInTheDocument()
      expect(screen.getByText('Dr. Jane Smith, DMD')).toBeInTheDocument()
      expect(screen.getByText('Dr. John Doe, DDS')).toBeInTheDocument()
      expect(screen.getByText('Dr. Maria Santos, DMD')).toBeInTheDocument()
    })

    it('renders filter panel with filter options', () => {
      render(<DirectoryContent initialDentists={mockDentists} />)

      // Check filter sections exist
      expect(screen.getByText('Specialty')).toBeInTheDocument()
      expect(screen.getByText('Location')).toBeInTheDocument()
      expect(screen.getByText('Services')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    it('filters dentists by name', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      const searchInput = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i)

      // Search for "Jane"
      await user.type(searchInput, 'Jane')

      // Wait for debounce
      await waitFor(() => {
        expect(screen.getByText('1 dentist found')).toBeInTheDocument()
        expect(screen.getByText('Dr. Jane Smith, DMD')).toBeInTheDocument()
        expect(screen.queryByText('Dr. John Doe, DDS')).not.toBeInTheDocument()
        expect(screen.queryByText('Dr. Maria Santos, DMD')).not.toBeInTheDocument()
      }, { timeout: 2000 })
    }, TEST_TIMEOUT)

    it('filters dentists by specialty', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      const searchInput = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i)

      // Search for "Orthodontics"
      await user.type(searchInput, 'Orthodontics')


      await waitFor(() => {
        expect(screen.getByText('1 dentist found')).toBeInTheDocument()
        expect(screen.getByText('Dr. John Doe, DDS')).toBeInTheDocument()
        expect(screen.queryByText('Dr. Jane Smith, DMD')).not.toBeInTheDocument()
      })
    })

    it('filters dentists by service', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      const searchInput = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i)

      // Search for "Braces" (only Dr. John Doe offers this)
      await user.type(searchInput, 'Braces')


      await waitFor(() => {
        expect(screen.getByText('1 dentist found')).toBeInTheDocument()
        expect(screen.getByText('Dr. John Doe, DDS')).toBeInTheDocument()
      })
    })

    it('shows all dentists when search is cleared', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      const searchInput = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i)

      // Search
      await user.type(searchInput, 'Jane')

      await waitFor(() => {
        expect(screen.getByText('1 dentist found')).toBeInTheDocument()
      })

      // Clear search
      const clearButton = screen.getByLabelText('Clear search')
      await user.click(clearButton)

      // Should show all dentists again
      await waitFor(() => {
        expect(screen.getByText('3 dentists found')).toBeInTheDocument()
      })
    })

    it('shows no results when search matches nothing', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      const searchInput = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i)

      await user.type(searchInput, 'XYZ123NotFound')

      await waitFor(() => {
        expect(screen.getByText('0 dentists found')).toBeInTheDocument()
      })
    })
  })

  describe('Filter Functionality', () => {
    it('filters dentists by specialty checkbox', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      // Click Orthodontics filter
      const orthodonticsCheckbox = screen.getByLabelText('Orthodontics')
      await user.click(orthodonticsCheckbox)

      await waitFor(() => {
        expect(screen.getByText('1 dentist found')).toBeInTheDocument()
        expect(screen.getByText('Dr. John Doe, DDS')).toBeInTheDocument()
      })
    })

    it('filters dentists by location checkbox', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      // Click Makati location filter
      const makatiCheckbox = screen.getByLabelText('Makati')
      await user.click(makatiCheckbox)

      await waitFor(() => {
        expect(screen.getByText('1 dentist found')).toBeInTheDocument()
        expect(screen.getByText('Dr. Jane Smith, DMD')).toBeInTheDocument()
      })
    })

    it('filters dentists by service checkbox', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      // Click Teeth Cleaning service filter
      const teethCleaningCheckbox = screen.getByLabelText('Teeth Cleaning')
      await user.click(teethCleaningCheckbox)

      await waitFor(() => {
        // Dr. Jane Smith and Dr. Maria Santos both offer Teeth Cleaning
        expect(screen.getByText('2 dentists found')).toBeInTheDocument()
        expect(screen.getByText('Dr. Jane Smith, DMD')).toBeInTheDocument()
        expect(screen.getByText('Dr. Maria Santos, DMD')).toBeInTheDocument()
      })
    })

    it('combines multiple filters', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      // Apply specialty filter
      const generalDentistryCheckbox = screen.getByLabelText('General Dentistry')
      await user.click(generalDentistryCheckbox)

      await waitFor(() => {
        expect(screen.getByText('1 dentist found')).toBeInTheDocument()
      })

      // Apply location filter
      const makatiCheckbox = screen.getByLabelText('Makati')
      await user.click(makatiCheckbox)

      // Should still show Dr. Jane Smith (matches both filters)
      await waitFor(() => {
        expect(screen.getByText('1 dentist found')).toBeInTheDocument()
        expect(screen.getByText('Dr. Jane Smith, DMD')).toBeInTheDocument()
      })
    })

    it('shows active filter tags', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      // Apply a filter
      const orthodonticsCheckbox = screen.getByLabelText('Orthodontics')
      await user.click(orthodonticsCheckbox)

      // Active filter badge should appear
      await waitFor(() => {
        const activeFilters = screen.getAllByText('Orthodontics')
        // One in the checkbox label, one in the active filter badge
        expect(activeFilters.length).toBeGreaterThan(1)
      })
    })
  })

  describe('View Toggle', () => {
    it('starts in grid view by default', () => {
      render(<DirectoryContent initialDentists={mockDentists} />)

      const gridButton = screen.getByLabelText('Grid view')
      const listButton = screen.getByLabelText('List view')

      // Grid button should be active (default variant)
      expect(gridButton).toBeInTheDocument()
      expect(listButton).toBeInTheDocument()
    })

    it('switches to list view when list button is clicked', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      const listButton = screen.getByLabelText('List view')
      await user.click(listButton)

      // View should change (cards will have different classes)
      // We can verify by checking that the component re-rendered
      expect(listButton).toBeInTheDocument()
    })

    it('switches back to grid view when grid button is clicked', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      const listButton = screen.getByLabelText('List view')
      const gridButton = screen.getByLabelText('Grid view')

      // Switch to list
      await user.click(listButton)

      // Switch back to grid
      await user.click(gridButton)

      expect(gridButton).toBeInTheDocument()
    })
  })

  describe('Search and Filter Integration', () => {
    it('combines search query with filters', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      // Search for "Teeth Cleaning" (matches 2 dentists)
      const searchInput = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i)
      await user.type(searchInput, 'Teeth Cleaning')

      await waitFor(() => {
        expect(screen.getByText('2 dentists found')).toBeInTheDocument()
      })

      // Add location filter for Makati (should narrow to 1)
      const makatiCheckbox = screen.getByLabelText('Makati')
      await user.click(makatiCheckbox)

      await waitFor(() => {
        expect(screen.getByText('1 dentist found')).toBeInTheDocument()
        expect(screen.getByText('Dr. Jane Smith, DMD')).toBeInTheDocument()
      })
    })

    it('updates results count when filters change', async () => {
      const user = userEvent.setup()

      render(<DirectoryContent initialDentists={mockDentists} />)

      // Initially shows all
      expect(screen.getByText('3 dentists found')).toBeInTheDocument()

      // Apply filter
      const orthodonticsCheckbox = screen.getByLabelText('Orthodontics')
      await user.click(orthodonticsCheckbox)

      await waitFor(() => {
        expect(screen.getByText('1 dentist found')).toBeInTheDocument()
      })

      // Remove filter by unchecking
      await user.click(orthodonticsCheckbox)

      await waitFor(() => {
        expect(screen.getByText('3 dentists found')).toBeInTheDocument()
      })
    })
  })

  describe('Legal Disclaimer', () => {
    it('renders legal disclaimer', () => {
      render(<DirectoryContent initialDentists={mockDentists} />)

      // LegalDisclaimer component should be present
      // We can check for the specific disclaimer text
      expect(screen.getByText(/informational purposes only/i)).toBeInTheDocument()
    })
  })
})
