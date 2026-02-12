"use client"

import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import { UserPlus, User } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { BookingFormData } from "../BookingWizard"

interface PatientTypeStepProps {
  form: UseFormReturn<BookingFormData>
}

export function PatientTypeStep({ form }: PatientTypeStepProps) {
  const selectedType = form.watch("patientType")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-sans font-semibold mb-2">Select Patient Type</h3>
        <p className="text-sm text-muted-foreground">
          Are you a new patient or have you visited this dentist before?
        </p>
      </div>

      <FormField
        control={form.control}
        name="patientType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => field.onChange("new")}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all cursor-pointer hover:border-[#FFCC5E]",
                    selectedType === "new"
                      ? "border-[#FFCC5E] bg-[#FFCC5E]/10"
                      : "border-border bg-background"
                  )}
                >
                  <UserPlus className="h-12 w-12 mb-3" />
                  <span className="font-semibold text-base">New Patient</span>
                  <span className="text-sm text-muted-foreground mt-1">
                    First visit to this dentist
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => field.onChange("existing")}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all cursor-pointer hover:border-[#FFCC5E]",
                    selectedType === "existing"
                      ? "border-[#FFCC5E] bg-[#FFCC5E]/10"
                      : "border-border bg-background"
                  )}
                >
                  <User className="h-12 w-12 mb-3" />
                  <span className="font-semibold text-base">Existing Patient</span>
                  <span className="text-sm text-muted-foreground mt-1">
                    Returning for follow-up
                  </span>
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
