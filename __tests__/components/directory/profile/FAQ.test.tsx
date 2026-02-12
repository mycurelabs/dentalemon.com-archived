import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FAQ } from '@/components/directory/profile/FAQ'
import { sampleDentists } from '@/data/dentists/sample-dentists'

describe('FAQ', () => {
  const mockDentist = sampleDentists[0] // Dr. Jane Smith
  const mockFaqs = mockDentist.faqs

  it('renders accordion items', () => {
    render(<FAQ faqs={mockFaqs} />)

    // Check for FAQ section title
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()

    // Check for FAQ questions
    expect(screen.getByText('Do you accept walk-in patients?')).toBeInTheDocument()
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument()
    expect(screen.getByText('Do you offer teeth whitening services?')).toBeInTheDocument()
  })

  it('accordion expands on click', async () => {
    const user = userEvent.setup()
    render(<FAQ faqs={mockFaqs} />)

    // Initially, answers should not be in the document (Radix Accordion unmounts collapsed content)
    expect(screen.queryByText(/We recommend scheduling an appointment/i)).not.toBeInTheDocument()

    // Click on the first question
    const question = screen.getByText('Do you accept walk-in patients?')
    await user.click(question)

    // After click, answer should be in the document
    expect(screen.getByText(/We recommend scheduling an appointment/i)).toBeInTheDocument()
  })

  it('renders all FAQ questions', () => {
    render(<FAQ faqs={mockFaqs} />)

    // Verify all questions are rendered
    mockFaqs.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument()
    })
  })

  it('does not render when faqs array is empty', () => {
    const { container } = render(<FAQ faqs={[]} />)

    // Should return null and render nothing
    expect(container.firstChild).toBeNull()
  })

  it('accordion collapses when clicked again', async () => {
    const user = userEvent.setup()
    render(<FAQ faqs={mockFaqs} />)

    // Click to expand
    const question = screen.getByText('Do you accept walk-in patients?')
    await user.click(question)

    // Verify answer is in the document
    expect(screen.getByText(/We recommend scheduling an appointment/i)).toBeInTheDocument()

    // Click again to collapse
    await user.click(question)

    // Answer should be removed from the document
    expect(screen.queryByText(/We recommend scheduling an appointment/i)).not.toBeInTheDocument()
  })

  it('only one accordion item is expanded at a time (single mode)', async () => {
    const user = userEvent.setup()
    render(<FAQ faqs={mockFaqs} />)

    // Expand first question
    const question1 = screen.getByText('Do you accept walk-in patients?')
    await user.click(question1)
    expect(screen.getByText(/We recommend scheduling an appointment/i)).toBeInTheDocument()

    // Expand second question
    const question2 = screen.getByText('What payment methods do you accept?')
    await user.click(question2)

    // First answer should no longer be in the document (single mode)
    expect(screen.queryByText(/We recommend scheduling an appointment/i)).not.toBeInTheDocument()

    // Second answer should be in the document
    expect(screen.getByText(/We accept cash, credit\/debit cards/i)).toBeInTheDocument()
  })
})
