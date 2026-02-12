import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BookingWizard } from "@/components/directory/BookingWizard"
import { Dentist } from "@/types/dentist"

// Helper to fill the native date input
async function fillDateInput() {
  const dateInput = screen.getByLabelText(/preferred date/i)
  fireEvent.change(dateInput, { target: { value: "2026-03-28" } })
}

// Mock dentist data
const mockDentist: Dentist = {
  id: "dentist-1",
  name: "Dr. Maria Santos",
  specialty: "General Dentistry",
  yearsOfExperience: 10,
  rating: 4.8,
  reviewCount: 120,
  imageUrl: "/dentists/maria-santos.jpg",
  prcLicense: "12345",
  clinics: [
    {
      id: "clinic-1",
      name: "Santos Dental Clinic",
      address: "123 Main St, Makati City",
      city: "Makati",
      contactNumber: "+63 2 1234 5678",
    },
  ],
}

describe("BookingWizard", () => {
  beforeEach(() => {
    // Mock fetch globally
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders with step indicator", () => {
    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={() => {}} />)

    expect(screen.getByText("Patient Type")).toBeInTheDocument()
    expect(screen.getByText("Appointment")).toBeInTheDocument()
    expect(screen.getByText("Contact")).toBeInTheDocument()
  })

  it("renders dentist name and clinic in header", () => {
    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={() => {}} />)

    expect(screen.getByText("Book Appointment with Dr. Maria Santos")).toBeInTheDocument()
    expect(screen.getByText("Santos Dental Clinic")).toBeInTheDocument()
  })

  it("shows step 1 (Patient Type) initially", () => {
    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={() => {}} />)

    expect(screen.getByText("Select Patient Type")).toBeInTheDocument()
    expect(screen.getByText("New Patient")).toBeInTheDocument()
    expect(screen.getByText("Existing Patient")).toBeInTheDocument()
  })

  it("navigates to step 2 after selecting patient type and clicking Next", async () => {
    const user = userEvent.setup()
    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={() => {}} />)

    // Select patient type
    const newPatientButton = screen.getByText("New Patient").closest("button")
    await user.click(newPatientButton!)

    // Click Next
    const nextButton = screen.getByText("Next")
    await user.click(nextButton)

    // Should now be on step 2
    await waitFor(() => {
      expect(screen.getByText("Appointment Details")).toBeInTheDocument()
    })
  })

  it("does not navigate to next step if current step is invalid", async () => {
    const user = userEvent.setup()
    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={() => {}} />)

    // Try to click Next without selecting patient type
    const nextButton = screen.getByText("Next")
    await user.click(nextButton)

    // Should still be on step 1
    expect(screen.getByText("Select Patient Type")).toBeInTheDocument()
  })

  it("allows going back to previous step", async () => {
    const user = userEvent.setup()
    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={() => {}} />)

    // Navigate to step 2
    const newPatientButton = screen.getByText("New Patient").closest("button")
    await user.click(newPatientButton!)
    const nextButton = screen.getByText("Next")
    await user.click(nextButton)

    await waitFor(() => {
      expect(screen.getByText("Appointment Details")).toBeInTheDocument()
    })

    // Click Back
    const backButton = screen.getByText("Back")
    await user.click(backButton)

    // Should be back on step 1
    await waitFor(() => {
      expect(screen.getByText("Select Patient Type")).toBeInTheDocument()
    })
  })

  it("shows Submit button on final step", async () => {
    const user = userEvent.setup()
    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={() => {}} />)

    // Navigate to step 2
    const newPatientButton = screen.getByText("New Patient").closest("button")
    await user.click(newPatientButton!)
    await user.click(screen.getByText("Next"))

    await waitFor(() => {
      expect(screen.getByText("Appointment Details")).toBeInTheDocument()
    })

    // Fill appointment details
    const consultationTypeButton = screen.getByRole("combobox", { name: /consultation type/i })
    await user.click(consultationTypeButton)
    await user.click(screen.getByRole("option", { name: "General Consultation" }))

    await fillDateInput()

    const timeButton = screen.getByRole("combobox", { name: /preferred time/i })
    await user.click(timeButton)
    await user.click(screen.getByRole("option", { name: "10:00" }))

    // Navigate to step 3
    await user.click(screen.getByText("Next"))

    await waitFor(() => {
      expect(screen.getByText("Contact Information")).toBeInTheDocument()
    })

    // Should show Submit button on step 3
    expect(screen.getByText("Submit Request")).toBeInTheDocument()
  })

  it("submits form successfully and shows success message", async () => {
    const user = userEvent.setup()
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "Appointment request submitted successfully!",
        requestId: "REQ-12345",
      }),
    })
    global.fetch = mockFetch

    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={() => {}} />)

    // Step 1: Select patient type
    await user.click(screen.getByText("New Patient").closest("button")!)
    await user.click(screen.getByText("Next"))

    await waitFor(() => {
      expect(screen.getByText("Appointment Details")).toBeInTheDocument()
    })

    // Step 2: Fill appointment details
    const consultationTypeButton = screen.getByRole("combobox", { name: /consultation type/i })
    await user.click(consultationTypeButton)
    await user.click(screen.getByRole("option", { name: "General Consultation" }))

    await fillDateInput()

    const timeButton = screen.getByRole("combobox", { name: /preferred time/i })
    await user.click(timeButton)
    await user.click(screen.getByRole("option", { name: "10:00" }))

    await user.click(screen.getByText("Next"))

    await waitFor(() => {
      expect(screen.getByText("Contact Information")).toBeInTheDocument()
    })

    // Step 3: Fill contact info
    await user.type(screen.getByPlaceholderText("Juan"), "Maria")
    await user.type(screen.getByPlaceholderText("Dela Cruz"), "Santos")
    await user.type(screen.getByPlaceholderText("+63 917 123 4567"), "+63 917 123 4567")
    await user.type(
      screen.getByPlaceholderText("juan.delacruz@example.com"),
      "maria.santos@example.com"
    )
    await user.click(screen.getByRole("checkbox"))

    // Submit
    await user.click(screen.getByText("Submit Request"))

    // Should show success message
    await waitFor(() => {
      expect(screen.getByText("Request Submitted!")).toBeInTheDocument()
    })

    expect(screen.getByText(/appointment request submitted successfully/i)).toBeInTheDocument()
    expect(screen.getByText("Reference ID: REQ-12345")).toBeInTheDocument()

    // Verify fetch was called with correct data
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/appointments/request",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.stringContaining("maria.santos@example.com"),
      })
    )
  })

  it("shows error message when submission fails", async () => {
    const user = userEvent.setup()
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        success: false,
        error: "Failed to submit appointment request",
      }),
    })
    global.fetch = mockFetch

    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={() => {}} />)

    // Navigate through all steps and submit
    await user.click(screen.getByText("New Patient").closest("button")!)
    await user.click(screen.getByText("Next"))

    await waitFor(() => {
      expect(screen.getByText("Appointment Details")).toBeInTheDocument()
    })

    const consultationTypeButton = screen.getByRole("combobox", { name: /consultation type/i })
    await user.click(consultationTypeButton)
    await user.click(screen.getByRole("option", { name: "General Consultation" }))

    await fillDateInput()

    const timeButton = screen.getByRole("combobox", { name: /preferred time/i })
    await user.click(timeButton)
    await user.click(screen.getByRole("option", { name: "10:00" }))

    await user.click(screen.getByText("Next"))

    await waitFor(() => {
      expect(screen.getByText("Contact Information")).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText("Juan"), "Maria")
    await user.type(screen.getByPlaceholderText("Dela Cruz"), "Santos")
    await user.type(screen.getByPlaceholderText("+63 917 123 4567"), "+63 917 123 4567")
    await user.type(
      screen.getByPlaceholderText("juan.delacruz@example.com"),
      "maria.santos@example.com"
    )
    await user.click(screen.getByRole("checkbox"))

    await user.click(screen.getByText("Submit Request"))

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument()
    })

    expect(screen.getByText(/failed to submit appointment request/i)).toBeInTheDocument()
  })

  it("displays legal disclaimer", () => {
    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={() => {}} />)

    expect(screen.getByText(/legal disclaimer/i)).toBeInTheDocument()
    expect(screen.getByText(/data privacy act/i)).toBeInTheDocument()
  })

  it("calls onClose when Cancel is clicked on step 1", async () => {
    const user = userEvent.setup()
    const mockOnClose = vi.fn()

    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={mockOnClose} />)

    const cancelButton = screen.getByText("Cancel")
    await user.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it("calls onClose when Close is clicked after successful submission", async () => {
    const user = userEvent.setup()
    const mockOnClose = vi.fn()
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "Success",
        requestId: "REQ-123",
      }),
    })
    global.fetch = mockFetch

    render(<BookingWizard dentist={mockDentist} isOpen={true} onClose={mockOnClose} />)

    // Complete the entire flow
    await user.click(screen.getByText("New Patient").closest("button")!)
    await user.click(screen.getByText("Next"))

    await waitFor(() => {
      expect(screen.getByText("Appointment Details")).toBeInTheDocument()
    })

    const consultationTypeButton = screen.getByRole("combobox", { name: /consultation type/i })
    await user.click(consultationTypeButton)
    await user.click(screen.getByRole("option", { name: "General Consultation" }))

    await fillDateInput()

    const timeButton = screen.getByRole("combobox", { name: /preferred time/i })
    await user.click(timeButton)
    await user.click(screen.getByRole("option", { name: "10:00" }))

    await user.click(screen.getByText("Next"))

    await waitFor(() => {
      expect(screen.getByText("Contact Information")).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText("Juan"), "Maria")
    await user.type(screen.getByPlaceholderText("Dela Cruz"), "Santos")
    await user.type(screen.getByPlaceholderText("+63 917 123 4567"), "+63 917 123 4567")
    await user.type(
      screen.getByPlaceholderText("juan.delacruz@example.com"),
      "maria.santos@example.com"
    )
    await user.click(screen.getByRole("checkbox"))

    await user.click(screen.getByText("Submit Request"))

    await waitFor(() => {
      expect(screen.getByText("Request Submitted!")).toBeInTheDocument()
    })

    const closeButtons = screen.getAllByText("Close")
    // Click the visible Close button (not the sr-only one from Dialog)
    const visibleCloseButton = closeButtons.find(
      (el) => !el.classList.contains("sr-only") && el.closest("button")?.classList.contains("mt-4")
    )?.closest("button") || closeButtons[0].closest("button")
    await user.click(visibleCloseButton!)

    expect(mockOnClose).toHaveBeenCalled()
  })
})
