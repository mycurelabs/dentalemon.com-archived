import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '@/components/directory/SearchBar'

describe('SearchBar', () => {
  it('renders with placeholder text', () => {
    const mockOnSearch = vi.fn()
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i)
    expect(input).toBeInTheDocument()
  })

  it('renders with custom placeholder text', () => {
    const mockOnSearch = vi.fn()
    const customPlaceholder = "Custom search placeholder"
    render(<SearchBar onSearch={mockOnSearch} placeholder={customPlaceholder} />)

    const input = screen.getByPlaceholderText(customPlaceholder)
    expect(input).toBeInTheDocument()
  })

  it('debounces search input and fires onSearch after 300ms', async () => {
    const mockOnSearch = vi.fn()
    const user = userEvent.setup()

    render(<SearchBar onSearch={mockOnSearch} />)

    // Wait for initial mount effect to fire (empty string call)
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('')
    }, { timeout: 500 })

    // Clear mock to reset
    mockOnSearch.mockClear()

    const input = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i)

    // Type some text
    await user.type(input, 'orthodontist')

    // Wait for debounce delay
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('orthodontist')
    }, { timeout: 1000 })
  }, 10000)

  it('shows clear button when text is entered', async () => {
    const mockOnSearch = vi.fn()
    const user = userEvent.setup()

    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i)

    // Initially no clear button
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()

    // Type some text
    await user.type(input, 'test')

    // Clear button should appear
    const clearButton = screen.getByLabelText('Clear search')
    expect(clearButton).toBeInTheDocument()
  }, 10000)

  it('clears input and fires onSearch with empty string when clear button is clicked', async () => {
    const mockOnSearch = vi.fn()
    const user = userEvent.setup()

    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText(/search dentists by name, specialty, or location/i) as HTMLInputElement

    // Type some text
    await user.type(input, 'test query')

    // Wait for debounced search
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query')
    }, { timeout: 1000 })

    // Clear the mock to reset call count
    mockOnSearch.mockClear()

    // Click clear button
    const clearButton = screen.getByLabelText('Clear search')
    await user.click(clearButton)

    // Input should be empty
    expect(input.value).toBe('')

    // onSearch should be called immediately with empty string (not debounced)
    expect(mockOnSearch).toHaveBeenCalledWith('')
    expect(mockOnSearch).toHaveBeenCalledTimes(1)

    // Clear button should disappear
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  }, 10000)

  it('applies custom className', () => {
    const mockOnSearch = vi.fn()
    const customClass = 'custom-search-class'

    const { container } = render(
      <SearchBar onSearch={mockOnSearch} className={customClass} />
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass(customClass)
  })
})
