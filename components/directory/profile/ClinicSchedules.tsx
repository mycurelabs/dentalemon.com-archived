"use client";

import { Clinic } from "@/types/dentist";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClinicSchedulesProps {
  clinics: Clinic[];
  onBookClick?: (clinicId: string) => void;
}

function ClinicDetails({
  clinic,
  onBookClick,
}: {
  clinic: Clinic;
  onBookClick?: (clinicId: string) => void;
}) {
  const formatTimeSlot = (start: string, end: string) => `${start} - ${end}`;

  const openDays = clinic.schedules.filter((s) => s.isOpen);
  const scheduleLines =
    openDays.length === 0
      ? "No schedule available"
      : openDays.map((schedule) => {
          const timeSlots = schedule.slots
            .map((slot) => formatTimeSlot(slot.start, slot.end))
            .join(", ");
          return `${schedule.day}: ${timeSlots}`;
        });

  const primaryFee =
    clinic.fees.find((f) => f.consultationType === "Initial Consultation") ||
    clinic.fees[0];

  return (
    <>
      <CardContent className="space-y-5 pt-4">
        {/* Address */}
        <div className="flex gap-3">
          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            {clinic.address.street}, {clinic.address.city},{" "}
            {clinic.address.province} {clinic.address.postalCode}
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={`tel:${clinic.contact.phone}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4 flex-shrink-0" />
            {clinic.contact.phone}
          </a>
          <a
            href={`mailto:${clinic.contact.email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4 flex-shrink-0" />
            {clinic.contact.email}
          </a>
        </div>

        {/* Schedule */}
        <div className="flex gap-3">
          <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium mb-1.5">Schedule</p>
            <div className="space-y-0.5">
              {Array.isArray(scheduleLines) ? (
                scheduleLines.map((line, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  {scheduleLines}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Consultation Fee */}
        {primaryFee && (
          <div className="flex gap-3">
            <Banknote className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold">
                  {primaryFee.currency} {primaryFee.amount.toLocaleString()}
                </span>
                <Badge variant="outline" className="text-xs">
                  {primaryFee.consultationType}
                </Badge>
              </div>
              {primaryFee.notes && (
                <p className="text-xs text-muted-foreground mt-1">
                  {primaryFee.notes}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => onBookClick?.(clinic.id)}
          className={cn(
            "w-full rounded-lg bg-[#FFCC5E] text-black hover:bg-[#FFCC5E]/90",
            "font-semibold"
          )}
        >
          Book at {clinic.name}
        </Button>
      </CardFooter>
    </>
  );
}

export function ClinicSchedules({
  clinics,
  onBookClick,
}: ClinicSchedulesProps) {
  // Single clinic — no accordion needed
  if (clinics.length === 1) {
    const clinic = clinics[0];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="font-sans text-xl font-semibold mb-4">
          Clinic Location & Schedule
        </h2>
        <Card>
          <div className="px-6 pt-6">
            <h3 className="font-sans text-lg font-semibold">{clinic.name}</h3>
          </div>
          <ClinicDetails clinic={clinic} onBookClick={onBookClick} />
        </Card>
      </motion.div>
    );
  }

  // Multiple clinics — use accordion, first expanded by default
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-4"
    >
      <h2 className="font-sans text-xl font-semibold mb-4">
        Clinic Locations & Schedules
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          ({clinics.length} locations)
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        defaultValue={`clinic-${clinics[0].id}`}
        className="space-y-3"
      >
        {clinics.map((clinic, index) => (
          <motion.div
            key={clinic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
            viewport={{ once: true }}
          >
            <AccordionItem
              value={`clinic-${clinic.id}`}
              className="border rounded-lg overflow-hidden bg-card"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline font-sans text-lg font-semibold">
                <div className="flex items-center gap-3 text-left">
                  <span>{clinic.name}</span>
                  <Badge variant="outline" className="text-xs font-normal">
                    {clinic.address.city}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <ClinicDetails clinic={clinic} onBookClick={onBookClick} />
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}
