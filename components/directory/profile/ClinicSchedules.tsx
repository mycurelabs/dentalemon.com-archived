"use client";

import { Clinic } from "@/types/dentist";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClinicSchedulesProps {
  clinics: Clinic[];
  onBookClick?: (clinicId: string) => void;
}

export function ClinicSchedules({ clinics, onBookClick }: ClinicSchedulesProps) {
  // Format time slot
  const formatTimeSlot = (start: string, end: string) => {
    return `${start} - ${end}`;
  };

  // Group schedules by open/closed
  const formatSchedule = (clinic: Clinic) => {
    const openDays = clinic.schedules.filter(s => s.isOpen);

    if (openDays.length === 0) {
      return "No schedule available";
    }

    return openDays.map(schedule => {
      const timeSlots = schedule.slots.map(slot =>
        formatTimeSlot(slot.start, slot.end)
      ).join(", ");

      return `${schedule.day}: ${timeSlots}`;
    });
  };

  // Get primary consultation fee
  const getPrimaryFee = (clinic: Clinic) => {
    const initialConsult = clinic.fees.find(f => f.consultationType === "Initial Consultation");
    return initialConsult || clinic.fees[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">Clinic Locations & Schedules</h2>

      <div className="grid gap-4">
        {clinics.map((clinic, index) => {
          const primaryFee = getPrimaryFee(clinic);
          const scheduleLines = formatSchedule(clinic);

          return (
            <motion.div
              key={clinic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start justify-between gap-2">
                    <span>{clinic.name}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Address */}
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {clinic.address.street}
                        <br />
                        {clinic.address.city}, {clinic.address.province} {clinic.address.postalCode}
                        <br />
                        {clinic.address.country}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Phone</p>
                        <a
                          href={`tel:${clinic.contact.phone}`}
                          className="text-sm text-muted-foreground hover:text-[#FFCC5E] transition-colors"
                        >
                          {clinic.contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Email</p>
                        <a
                          href={`mailto:${clinic.contact.email}`}
                          className="text-sm text-muted-foreground hover:text-[#FFCC5E] transition-colors"
                        >
                          {clinic.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-2">Schedule</p>
                      <div className="space-y-1">
                        {Array.isArray(scheduleLines) ? (
                          scheduleLines.map((line, idx) => (
                            <p key={idx} className="text-sm text-muted-foreground">
                              {line}
                            </p>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">{scheduleLines}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Consultation Fee */}
                  {primaryFee && (
                    <div className="flex gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Consultation Fee</p>
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
                      "w-full bg-[#FFCC5E] text-black hover:bg-[#FFCC5E]/90",
                      "font-semibold"
                    )}
                  >
                    Book at {clinic.name}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
