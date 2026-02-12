import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterPanel } from '@/components/directory/FilterPanel'
import { DirectoryFilters } from '@/types/dentist'

describe('FilterPanel', () => {
  const mockSpecialties = ['General Dentistry', 'Orthodontics', 'Pediatric Dentistry']
  const mockLocations = ['Makati', 'Quezon City', 'Manila']
  const mockServices = ['Teeth Cleaning', 'Root Canal', 'Dental Implants']

  const defaultFilters: DirectoryFilters = {
    specialties: [],
    locations: [],
    services: [],
  }

  it('renders three filter sections: Specialty, Location, and Services', () => {
    const mockOnFilterChange = vi.fn()

    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // Check for section headings (desktop view)
    expect(screen.getByText('Specialty')).toBeInTheDocument()
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
  })

  it('renders all specialty options', () => {
    const mockOnFilterChange = vi.fn()

    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    mockSpecialties.forEach(specialty => {
      expect(screen.getByText(specialty)).toBeInTheDocument()
    })
  })

  it('renders all location options', () => {
    const mockOnFilterChange = vi.fn()

    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    mockLocations.forEach(location => {
      expect(screen.getByText(location)).toBeInTheDocument()
    })
  })

  it('renders all service options', () => {
    const mockOnFilterChange = vi.fn()

    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    mockServices.forEach(service => {
      expect(screen.getByText(service)).toBeInTheDocument()
    })
  })

  it('toggles specialty filter when checkbox is clicked', async () => {
    const mockOnFilterChange = vi.fn()
    const user = userEvent.setup()

    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // Click the "Orthodontics" checkbox
    const checkbox = screen.getByLabelText('Orthodontics')
    await user.click(checkbox)

    // onFilterChange should be called with updated filters
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      specialties: ['Orthodontics'],
      locations: [],
      services: [],
    })
  })

  it('toggles location filter when checkbox is clicked', async () => {
    const mockOnFilterChange = vi.fn()
    const user = userEvent.setup()

    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // Click the "Makati" checkbox
    const checkbox = screen.getByLabelText('Makati')
    await user.click(checkbox)

    // onFilterChange should be called with updated filters
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      specialties: [],
      locations: ['Makati'],
      services: [],
    })
  })

  it('toggles service filter when checkbox is clicked', async () => {
    const mockOnFilterChange = vi.fn()
    const user = userEvent.setup()

    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // Click the "Root Canal" checkbox
    const checkbox = screen.getByLabelText('Root Canal')
    await user.click(checkbox)

    // onFilterChange should be called with updated filters
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      specialties: [],
      locations: [],
      services: ['Root Canal'],
    })
  })

  it('unchecks a previously checked filter', async () => {
    const mockOnFilterChange = vi.fn()
    const user = userEvent.setup()

    const filtersWithSelection: DirectoryFilters = {
      specialties: ['Orthodontics'],
      locations: [],
      services: [],
    }

    render(
      <FilterPanel
        filters={filtersWithSelection}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // The "Orthodontics" checkbox should be checked
    const checkbox = screen.getByLabelText('Orthodontics') as HTMLInputElement
    expect(checkbox).toBeChecked()

    // Click to uncheck
    await user.click(checkbox)

    // onFilterChange should be called with empty specialties array
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      specialties: [],
      locations: [],
      services: [],
    })
  })

  it('shows Clear All button when filters are active', () => {
    const mockOnFilterChange = vi.fn()

    const activeFilters: DirectoryFilters = {
      specialties: ['General Dentistry'],
      locations: ['Makati'],
      services: [],
    }

    render(
      <FilterPanel
        filters={activeFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // Clear All button should be visible
    expect(screen.getByText('Clear All')).toBeInTheDocument()
  })

  it('does not show Clear All button when no filters are active', () => {
    const mockOnFilterChange = vi.fn()

    render(
      <FilterPanel
        filters={defaultFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // Clear All button should not be visible
    expect(screen.queryByText('Clear All')).not.toBeInTheDocument()
  })

  it('clears all filters when Clear All button is clicked', async () => {
    const mockOnFilterChange = vi.fn()
    const user = userEvent.setup()

    const activeFilters: DirectoryFilters = {
      specialties: ['General Dentistry', 'Orthodontics'],
      locations: ['Makati', 'Manila'],
      services: ['Teeth Cleaning'],
    }

    render(
      <FilterPanel
        filters={activeFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // Click Clear All
    const clearButton = screen.getByText('Clear All')
    await user.click(clearButton)

    // onFilterChange should be called with all empty arrays
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      specialties: [],
      locations: [],
      services: [],
    })
  })

  it('allows multiple selections in the same category', async () => {
    const mockOnFilterChange = vi.fn()
    const user = userEvent.setup()

    const partialFilters: DirectoryFilters = {
      specialties: ['General Dentistry'],
      locations: [],
      services: [],
    }

    render(
      <FilterPanel
        filters={partialFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // Click second specialty
    const checkbox = screen.getByLabelText('Orthodontics')
    await user.click(checkbox)

    // onFilterChange should be called with both specialties
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      specialties: ['General Dentistry', 'Orthodontics'],
      locations: [],
      services: [],
    })
  })

  it('allows selections across different categories', async () => {
    const mockOnFilterChange = vi.fn()
    const user = userEvent.setup()

    const partialFilters: DirectoryFilters = {
      specialties: ['General Dentistry'],
      locations: [],
      services: [],
    }

    const { rerender } = render(
      <FilterPanel
        filters={partialFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // Click a location
    const locationCheckbox = screen.getByLabelText('Makati')
    await user.click(locationCheckbox)

    // Verify the call includes the specialty from initial state
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      specialties: ['General Dentistry'],
      locations: ['Makati'],
      services: [],
    })

    // Update the component with new filters
    const updatedFilters: DirectoryFilters = {
      specialties: ['General Dentistry'],
      locations: ['Makati'],
      services: [],
    }

    rerender(
      <FilterPanel
        filters={updatedFilters}
        onFilterChange={mockOnFilterChange}
        specialties={mockSpecialties}
        locations={mockLocations}
        services={mockServices}
      />
    )

    // Now click a service
    const serviceCheckbox = screen.getByLabelText('Root Canal')
    await user.click(serviceCheckbox)

    // Verify all three categories are included
    expect(mockOnFilterChange).toHaveBeenLastCalledWith({
      specialties: ['General Dentistry'],
      locations: ['Makati'],
      services: ['Root Canal'],
    })
  })
})
