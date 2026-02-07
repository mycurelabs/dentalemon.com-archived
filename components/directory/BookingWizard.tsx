"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dentist } from "@/types/dentist"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { PatientTypeStep } from "./booking/PatientTypeStep"
import { AppointmentDetailsStep } from "./booking/AppointmentDetailsStep"
import { ContactInfoStep } from "./booking/ContactInfoStep"
import { Check, Loader2 } from "lucide-react"

// Zod validation schemas
const patientTypeSchema = z.object({
  patientType: z.enum(["new", "existing"], {
    required_error: "Please select a patient type",
  }),
})

const appointmentDetailsSchema = z.object({
  consultationType: z.string().min(1, "Consultation type is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  reason: z.string().optional(),
})

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

// Combined schema for the entire form
const bookingFormSchema = patientTypeSchema
  .merge(appointmentDetailsSchema)
  .merge(contactInfoSchema)

export type BookingFormData = z.infer<typeof bookingFormSchema>

interface BookingWizardProps {
  dentist: Dentist
  isOpen: boolean
  onClose: () => void
}

const STEPS = [
  { number: 1, title: "Patient Type" },
  { number: 2, title: "Appointment" },
  { number: 3, title: "Contact" },
]

export function BookingWizard({ dentist, isOpen, onClose }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: "success" | "error" | null
    message: string
    requestId?: string
  }>({ type: null, message: "" })

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      patientType: undefined,
      consultationType: "",
      preferredDate: "",
      preferredTime: "",
      reason: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      consent: false,
    },
    mode: "onTouched",
  })

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["patientType"]
        break
      case 2:
        fieldsToValidate = ["consultationType", "preferredDate", "preferredTime"]
        break
      case 3:
        fieldsToValidate = ["firstName", "lastName", "phone", "email", "consent"]
        break
    }

    const result = await form.trigger(fieldsToValidate)
    return result
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < 3) {
      const nextStep = currentStep + 1
      // Clear errors for the next step's fields so they don't show on arrival
      if (nextStep === 2) {
        form.clearErrors(["consultationType", "preferredDate", "preferredTime"])
      } else if (nextStep === 3) {
        form.clearErrors(["firstName", "lastName", "phone", "email", "consent"])
      }
      setCurrentStep(nextStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Get the first clinic (or allow user to select if multiple)
      const clinic = dentist.clinics[0]

      const requestPayload = {
        dentistId: dentist.id,
        clinicId: clinic.id,
        patientType: data.patientType,
        consultationType: data.consultationType,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        reason: data.reason || "",
        patientInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
        },
        consent: data.consent,
      }

      const response = await fetch("/api/appointments/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Appointment request submitted successfully!",
          requestId: result.requestId,
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to submit appointment request. Please try again.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    form.reset()
    setCurrentStep(1)
    setSubmitStatus({ type: null, message: "" })
    onClose()
  }

  const handleRetry = () => {
    setSubmitStatus({ type: null, message: "" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-sans">Book Appointment with {dentist.name}</DialogTitle>
          <DialogDescription>
            {dentist.clinics[0]?.name || "Clinic"}
          </DialogDescription>
        </DialogHeader>

        {submitStatus.type === "success" ? (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-sans font-semibold mb-2">Request Submitted!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {submitStatus.message}
              </p>
              {submitStatus.requestId && (
                <p className="text-xs text-muted-foreground">
                  Reference ID: {submitStatus.requestId}
                </p>
              )}
            </div>
            <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1">Important:</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                This is an appointment request, not a confirmed booking. The clinic will
                contact you within 24-48 hours to confirm your appointment.
              </p>
            </div>
            <Button onClick={handleClose} className="mt-4 rounded-lg">
              Close
            </Button>
          </div>
        ) : submitStatus.type === "error" ? (
          <div className="py-8 text-center space-y-4">
            <div className="text-destructive mb-4">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{submitStatus.message}</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={handleRetry} variant="outline" className="rounded-lg">
                Try Again
              </Button>
              <Button onClick={handleClose} className="rounded-lg">Close</Button>
            </div>
          </div>
        ) : (
          <>
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {STEPS.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
                        currentStep >= step.number
                          ? "bg-[#FFCC5E] text-black"
                          : "bg-gray-200 text-gray-500"
                      )}
                    >
                      {step.number}
                    </div>
                    <span className="text-xs mt-1 text-muted-foreground">
                      {step.title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 w-12 transition-colors",
                        currentStep > step.number ? "bg-[#FFCC5E]" : "bg-gray-200"
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {currentStep === 1 && <PatientTypeStep form={form} />}
                {currentStep === 2 && <AppointmentDetailsStep form={form} />}
                {currentStep === 3 && <ContactInfoStep form={form} />}

                {/* Legal Disclaimer */}
                <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1">Legal Disclaimer:</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    By submitting this form, you acknowledge that this is an appointment
                    request and not a confirmed booking. The clinic will contact you to
                    confirm availability. All information provided will be handled in
                    accordance with our Privacy Policy and RA 10173 (Data Privacy Act of
                    2012).
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                    onClick={currentStep === 1 ? handleClose : handleBack}
                  >
                    {currentStep === 1 ? "Cancel" : "Back"}
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="rounded-lg bg-[#FFCC5E] text-black hover:bg-[#FFCC5E]/90"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-lg bg-[#FFCC5E] text-black hover:bg-[#FFCC5E]/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
