import { describe, it, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AppointmentDetailsStep } from "@/components/directory/booking/AppointmentDetailsStep"
import { BookingFormData } from "@/components/directory/BookingWizard"
import { Form } from "@/components/ui/form"
import React from "react"

const appointmentDetailsSchema = z.object({
  consultationType: z.string().min(1, "Consultation type is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  reason: z.string().optional(),
})

function TestWrapper() {
  const form = useForm<Partial<BookingFormData>>({
    resolver: zodResolver(appointmentDetailsSchema),
    defaultValues: {
      consultationType: "",
      preferredDate: "",
      preferredTime: "",
      reason: "",
    },
  })

  return (
    <Form {...form}>
      <form>
        <AppointmentDetailsStep form={form as any} />
      </form>
    </Form>
  )
}

describe("AppointmentDetailsStep", () => {
  it("renders all appointment detail fields", () => {
    render(<TestWrapper />)

    expect(screen.getByText("Consultation Type *")).toBeInTheDocument()
    expect(screen.getByText("Preferred Date *")).toBeInTheDocument()
    expect(screen.getByText("Preferred Time *")).toBeInTheDocument()
    expect(screen.getByText("Reason for Visit (Optional)")).toBeInTheDocument()
  })

  it("renders consultation type dropdown with options", async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)

    const consultationTypeButton = screen.getByRole("combobox", { name: /consultation type/i })
    expect(consultationTypeButton).toBeInTheDocument()

    await user.click(consultationTypeButton)

    // Check for consultation type options
    expect(screen.getByRole("option", { name: "General Consultation" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Follow-up" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Emergency" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Procedure" })).toBeInTheDocument()
  })

  it("allows selecting a date", async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        defaultValues: {
          consultationType: "",
          preferredDate: "",
          preferredTime: "",
          reason: "",
        },
      })

      React.useEffect(() => {
        ;(window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <AppointmentDetailsStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const dateInput = screen.getByLabelText(/preferred date/i) as HTMLInputElement
    expect(dateInput).toBeInTheDocument()

    await user.type(dateInput, "2026-03-15")

    const form = (window as any).testForm
    expect(form.getValues("preferredDate")).toBe("2026-03-15")
  })

  it("allows entering a reason for visit", async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        defaultValues: {
          consultationType: "",
          preferredDate: "",
          preferredTime: "",
          reason: "",
        },
      })

      React.useEffect(() => {
        ;(window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <AppointmentDetailsStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const reasonTextarea = screen.getByPlaceholderText(/please describe the reason/i)
    expect(reasonTextarea).toBeInTheDocument()

    await user.type(reasonTextarea, "Tooth pain in upper left molar")

    const form = (window as any).testForm
    expect(form.getValues("reason")).toBe("Tooth pain in upper left molar")
  })

  it("validates required fields", async () => {
    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        resolver: zodResolver(appointmentDetailsSchema),
        defaultValues: {
          consultationType: "",
          preferredDate: "",
          preferredTime: "",
          reason: "",
        },
      })

      React.useEffect(() => {
        ;(window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <AppointmentDetailsStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    // Trigger validation
    const form = (window as any).testForm as UseFormReturn<Partial<BookingFormData>>
    await form.trigger()

    await waitFor(() => {
      const errors = form.formState.errors
      expect(errors.consultationType?.message).toBe("Consultation type is required")
      expect(errors.preferredDate?.message).toBe("Preferred date is required")
      expect(errors.preferredTime?.message).toBe("Preferred time is required")
    })
  })

  it("date input has minimum date set to today", () => {
    render(<TestWrapper />)

    const dateInput = screen.getByLabelText(/preferred date/i) as HTMLInputElement
    const today = new Date().toISOString().split("T")[0]

    expect(dateInput.getAttribute("min")).toBe(today)
  })
})
