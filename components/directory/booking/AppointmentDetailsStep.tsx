"use client"

import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { BookingFormData } from "../BookingWizard"

interface AppointmentDetailsStepProps {
  form: UseFormReturn<BookingFormData>
}

const consultationTypes = [
  "General Consultation",
  "Follow-up",
  "Emergency",
  "Procedure",
]

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30",
]

export function AppointmentDetailsStep({ form }: AppointmentDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-sans font-semibold mb-2">Appointment Details</h3>
        <p className="text-sm text-muted-foreground">
          Please provide your preferred appointment details.
        </p>
      </div>

      <FormField
        control={form.control}
        name="consultationType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Consultation Type *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select consultation type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {consultationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferredDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Preferred Date *</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      field.onChange(format(date, "yyyy-MM-dd"))
                    }
                  }}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="preferredTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Time *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="reason"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reason for Visit (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please describe the reason for your appointment..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
