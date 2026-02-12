import { describe, it, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ContactInfoStep } from "@/components/directory/booking/ContactInfoStep"
import { BookingFormData } from "@/components/directory/BookingWizard"
import { Form } from "@/components/ui/form"
import React from "react"

const contactInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?63\s?\d{3}\s?\d{3}\s?\d{4}$/, "Invalid Philippine phone format"),
  email: z.string().email("Invalid email address"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to continue",
  }),
})

function TestWrapper() {
  const form = useForm<Partial<BookingFormData>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      consent: false,
    },
  })

  return (
    <Form {...form}>
      <form>
        <ContactInfoStep form={form as any} />
      </form>
    </Form>
  )
}

describe("ContactInfoStep", () => {
  it("renders all contact information fields", () => {
    render(<TestWrapper />)

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("allows entering name information", async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        defaultValues: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          consent: false,
        },
      })

      React.useEffect(() => {
        ;(window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <ContactInfoStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const firstNameInput = screen.getByPlaceholderText("Juan")
    const lastNameInput = screen.getByPlaceholderText("Dela Cruz")

    await user.type(firstNameInput, "Maria")
    await user.type(lastNameInput, "Santos")

    const form = (window as any).testForm
    expect(form.getValues("firstName")).toBe("Maria")
    expect(form.getValues("lastName")).toBe("Santos")
  })

  it("allows entering phone number", async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        defaultValues: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          consent: false,
        },
      })

      React.useEffect(() => {
        ;(window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <ContactInfoStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const phoneInput = screen.getByPlaceholderText("+63 917 123 4567")

    await user.type(phoneInput, "+63 917 123 4567")

    const form = (window as any).testForm
    expect(form.getValues("phone")).toBe("+63 917 123 4567")
  })

  it("allows entering email address", async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        defaultValues: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          consent: false,
        },
      })

      React.useEffect(() => {
        ;(window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <ContactInfoStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const emailInput = screen.getByPlaceholderText("juan.delacruz@example.com")

    await user.type(emailInput, "maria.santos@example.com")

    const form = (window as any).testForm
    expect(form.getValues("email")).toBe("maria.santos@example.com")
  })

  it("allows checking the consent checkbox", async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        defaultValues: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          consent: false,
        },
      })

      React.useEffect(() => {
        ;(window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <ContactInfoStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const consentCheckbox = screen.getByRole("checkbox")

    await user.click(consentCheckbox)

    const form = (window as any).testForm
    expect(form.getValues("consent")).toBe(true)
  })

  it("validates email format", async () => {
    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        resolver: zodResolver(contactInfoSchema),
        defaultValues: {
          firstName: "Maria",
          lastName: "Santos",
          phone: "+63 917 123 4567",
          email: "invalid-email",
          consent: true,
        },
      })

      React.useEffect(() => {
        ;(window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <ContactInfoStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const form = (window as any).testForm as UseFormReturn<Partial<BookingFormData>>
    await form.trigger("email")

    await waitFor(() => {
      expect(form.formState.errors.email?.message).toBe("Invalid email address")
    })
  })

  it("validates Philippine phone format", async () => {
    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        resolver: zodResolver(contactInfoSchema),
        defaultValues: {
          firstName: "Maria",
          lastName: "Santos",
          phone: "123456",
          email: "maria@example.com",
          consent: true,
        },
      })

      React.useEffect(() => {
        ;(window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <ContactInfoStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const form = (window as any).testForm as UseFormReturn<Partial<BookingFormData>>
    await form.trigger("phone")

    await waitFor(() => {
      expect(form.formState.errors.phone?.message).toBe("Invalid Philippine phone format")
    })
  })

  it("validates required fields", async () => {
    function TestComponent() {
      const form = useForm<Partial<BookingFormData>>({
        resolver: zodResolver(contactInfoSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          consent: false,
        },
      })

      React.useEffect(() => {
        ;(window as any).testForm = form
      }, [form])

      return (
        <Form {...form}>
          <form>
            <ContactInfoStep form={form as any} />
          </form>
        </Form>
      )
    }

    render(<TestComponent />)

    const form = (window as any).testForm as UseFormReturn<Partial<BookingFormData>>
    await form.trigger()

    await waitFor(() => {
      const errors = form.formState.errors
      expect(errors.firstName?.message).toBe("First name is required")
      expect(errors.lastName?.message).toBe("Last name is required")
      expect(errors.phone?.message).toBe("Phone number is required")
      expect(errors.email?.message).toContain("Invalid") // "Invalid email address" is shown for empty string
      expect(errors.consent?.message).toBe("You must agree to continue")
    })
  })

  it("displays Philippine phone format description", () => {
    render(<TestWrapper />)

    expect(screen.getByText(/philippine phone format/i)).toBeInTheDocument()
  })

  it("displays consent agreement text", () => {
    render(<TestWrapper />)

    expect(screen.getByText(/i understand this is an appointment request/i)).toBeInTheDocument()
    expect(
      screen.getByText(/the clinic will contact me to confirm/i)
    ).toBeInTheDocument()
  })
})
