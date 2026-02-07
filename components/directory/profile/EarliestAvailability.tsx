"use client";

import { Availability } from "@/types/dentist";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

interface EarliestAvailabilityProps {
  availability: Availability;
  consultationFee?: number;
  onBookClick?: () => void;
}

export function EarliestAvailability({
  availability,
  consultationFee,
  onBookClick
}: EarliestAvailabilityProps) {
  const hasDetails = !!(availability.date && availability.clinicName);

  // Format the date
  const formattedDate = availability.date
    ? new Date(availability.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : "Not available";

  // Format the time
  const formattedTime = availability.time || "Not available";

  return (
    <Card className="border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="font-sans text-lg">Earliest Availability</CardTitle>
        <CardDescription>Book this slot to secure your appointment</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Date */}
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Date</p>
            <p className="font-semibold">{formattedDate}</p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Time</p>
            <p className="font-semibold">{formattedTime}</p>
          </div>
        </div>

        {/* Clinic */}
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Clinic</p>
            <p className="font-semibold text-sm">{availability.clinicName || "Not available"}</p>
          </div>
        </div>

        {/* Consultation Fee */}
        {consultationFee && (
          <div className="flex items-start gap-3">
            <Banknote className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Consultation Fee</p>
              <p className="font-semibold">PHP {consultationFee.toLocaleString()}</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          onClick={onBookClick}
          disabled={!hasDetails}
          className={cn(
            "w-full rounded-lg font-semibold",
            hasDetails
              ? "bg-[#FFCC5E] text-black hover:bg-[#FFCC5E]/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {hasDetails ? "Book This Slot" : "No Availability"}
        </Button>
      </CardFooter>
    </Card>
  );
}
