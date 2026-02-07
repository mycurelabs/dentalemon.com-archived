"use client";

import { Dentist } from "@/types/dentist";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
          <Image
            src={dentist.photo || "/placeholder-dentist.jpg"}
            alt={`${dentist.name} - ${dentist.specialty}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 128px, 160px"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          {/* Name & Credentials */}
          <div className="mb-3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {dentist.name}
              {dentist.title && (
                <span className="text-muted-foreground ml-2">{dentist.title}</span>
              )}
            </h1>

            {/* Verified Badge */}
            {dentist.verified && (
              <div className="inline-flex items-center gap-1.5 text-sm text-green-600 mb-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Verified Profile</span>
              </div>
            )}
          </div>

          {/* Specialty & Experience */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
            <Badge className="bg-[#FFCC5E] text-black hover:bg-[#FFCC5E]/90">
              {dentist.specialty}
            </Badge>
            <Badge variant="secondary">
              {dentist.yearsOfExperience} {dentist.yearsOfExperience === 1 ? 'Year' : 'Years'} of Experience
            </Badge>
          </div>

          {/* Languages */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1.5">Languages Spoken:</p>
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
              {dentist.languages.map((language) => (
                <Badge key={language} variant="outline" className="text-xs">
                  {language}
                </Badge>
              ))}
            </div>
          </div>

          {/* Accepting New Patients & Availability Status */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {isAcceptingNewPatients && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Accepting New Patients
              </Badge>
            )}

            {hasAvailability && (
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Next available: {new Date(dentist.availability.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
