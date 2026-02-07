"use client"

import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { BookingFormData } from "../BookingWizard"

interface ContactInfoStepProps {
  form: UseFormReturn<BookingFormData>
}

export function ContactInfoStep({ form }: ContactInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
        <p className="text-sm text-muted-foreground">
          Please provide your contact details so the clinic can reach you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input placeholder="Juan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name *</FormLabel>
              <FormControl>
                <Input placeholder="Dela Cruz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number *</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="+63 917 123 4567"
                {...field}
              />
            </FormControl>
            <FormDescription>Philippine phone format (e.g., +63 917 123 4567)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address *</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="juan.delacruz@example.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="consent"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I understand this is an appointment request *
              </FormLabel>
              <FormDescription>
                I agree that this is an appointment request, not a confirmed booking.
                The clinic will contact me to confirm the appointment.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}
