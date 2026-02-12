"use client";

import { Dentist } from "@/types/dentist";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck, User } from "lucide-react";

interface ProfileHeaderProps {
  dentist: Dentist;
}

export function ProfileHeader({ dentist }: ProfileHeaderProps) {
  const hasAvailability = dentist.availability && dentist.availability.date;
  const isAcceptingNewPatients = dentist.clinics.some(clinic => clinic.schedules.some(s => s.isOpen));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-lg border shadow-sm p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Photo */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0 ring-2 ring-neutral-100 dark:ring-neutral-800">
          {dentist.photo ? (
            <Image
              src={dentist.photo}
              alt={`${dentist.name} - ${dentist.specialty}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 112px, 144px"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
              <User className="h-12 w-12 md:h-16 md:w-16 text-neutral-400 dark:text-neutral-500" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          {/* Name + Verified */}
          <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
            <h1 className="text-2xl md:text-3xl font-bold">
              {dentist.name}
              {dentist.title && (
                <span className="font-normal text-muted-foreground">, {dentist.title}</span>
              )}
            </h1>
            {dentist.verified && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <BadgeCheck className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Verified by Dentalemon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* Specialty & Experience — plain text subtitle */}
          <p className="text-base text-muted-foreground mb-4 justify-center md:justify-start">
            {dentist.specialty}
            <span className="mx-2 text-neutral-300 dark:text-neutral-600">·</span>
            {dentist.yearsOfExperience} {dentist.yearsOfExperience === 1 ? 'year' : 'years'} of experience
          </p>

          {/* Status indicators — subtle inline text */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center md:justify-start mb-4">
            {isAcceptingNewPatients && (
              <span className="inline-flex items-center gap-1.5 text-sm text-green-700 dark:text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                Accepting new patients
              </span>
            )}
            {hasAvailability && (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                Next available: {new Date(dentist.availability.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            )}
          </div>

          {/* Languages — simple comma-separated text */}
          {dentist.languages.length > 0 && (
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Languages:</span>{" "}
              {dentist.languages.join(", ")}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
