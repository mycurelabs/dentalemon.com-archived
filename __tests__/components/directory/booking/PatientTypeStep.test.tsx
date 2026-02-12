import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm } from "react-hook-form"
import { PatientTypeStep } from "@/components/directory/booking/PatientTypeStep"
import { BookingFormData } from "@/components/directory/BookingWizard"
import { Form } from "@/components/ui/form"
import React from "react"

// Wrapper component to provide form context
function TestWrapper() {
  const form = useForm<Partial<BookingFormData>>({
    defaultValues: {
      patientType: undefined,
    },
  })

  return (
    <Form {...form}>
      <form>
        <PatientTypeStep form={form as any} />
      </form>
    </Form>
  )
}

describe("PatientTypeStep", () => {
  it("renders New Patient and Existing Patient options", () => {
    render(<TestWrapper />)

    expect(screen.getByText("New Patient")).toBeInTheDocument()
    expect(screen.getByText("Existing Patient")).toBeInTheDocument()
    expect(screen.getByText("First visit to this dentist")).toBeInTheDocument()
    expect(screen.getByText("Returning for follow-up")).toBeInTheDocument()
  })

  it("updates form value when New Patient is selected", async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        defaultValues: {
          patientType: undefined,
        },
      })

      // Store form instance for assertions
      React.useEffect(() => {
        (window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <PatientTypeStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const newPatientButton = screen.getByText("New Patient").closest("button")
    expect(newPatientButton).toBeInTheDocument()

    await user.click(newPatientButton!)

    const form = (window as any).testForm
    expect(form.getValues("patientType")).toBe("new")
  })

  it("updates form value when Existing Patient is selected", async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        defaultValues: {
          patientType: undefined,
        },
      })

      React.useEffect(() => {
        (window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <PatientTypeStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const existingPatientButton = screen.getByText("Existing Patient").closest("button")
    expect(existingPatientButton).toBeInTheDocument()

    await user.click(existingPatientButton!)

    const form = (window as any).testForm
    expect(form.getValues("patientType")).toBe("existing")
  })

  it("shows visual selection state when option is selected", async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        defaultValues: {
          patientType: undefined,
        },
      })

      return (
        <Form {...form}>
          <form>
            <PatientTypeStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const newPatientButton = screen.getByText("New Patient").closest("button")
    await user.click(newPatientButton!)

    // Check that the selected button has the active styling classes
    expect(newPatientButton).toHaveClass("border-[#FFCC5E]")
  })
})
