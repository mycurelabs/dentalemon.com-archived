"use client";

import { useState } from "react";
import { Dentist } from "@/types/dentist";
import { BookingWizard } from "@/components/directory/BookingWizard";
import { ProfileHeader } from "@/components/directory/profile/ProfileHeader";
import { ProfileBio } from "@/components/directory/profile/ProfileBio";
import { ClinicSchedules } from "@/components/directory/profile/ClinicSchedules";
import { EducationCertifications } from "@/components/directory/profile/EducationCertifications";
import { EarliestAvailability } from "@/components/directory/profile/EarliestAvailability";
import { Affiliations } from "@/components/directory/profile/Affiliations";
import { FAQ } from "@/components/directory/profile/FAQ";
import { LegalDisclaimer } from "@/components/directory/LegalDisclaimer";

interface DentistProfileClientProps {
  dentist: Dentist;
}

export function DentistProfileClient({ dentist }: DentistProfileClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

  const handleBookClick = (clinicId?: string) => {
    setSelectedClinicId(clinicId || dentist.clinics[0]?.id || null);
    setIsBookingOpen(true);
  };

  const handleBookingClose = () => {
    setIsBookingOpen(false);
    setSelectedClinicId(null);
  };

  // Get primary consultation fee
  const primaryClinic = dentist.clinics[0];
  const primaryFee = primaryClinic?.fees.find(f => f.consultationType === "Initial Consultation") || primaryClinic?.fees[0];

  return (
    <>
      {/* Legal Disclaimer */}
      <LegalDisclaimer />

      {/* Profile Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main Content (60% - 3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          <ProfileHeader dentist={dentist} />
          <ProfileBio bio={dentist.bio} />
          <ClinicSchedules clinics={dentist.clinics} onBookClick={handleBookClick} />
          <EducationCertifications
            education={dentist.education}
            certifications={dentist.certifications}
          />
        </div>

        {/* Sidebar (40% - 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <EarliestAvailability
            availability={dentist.availability}
            consultationFee={primaryFee?.amount}
            onBookClick={() => handleBookClick()}
          />
          <Affiliations affiliations={dentist.affiliations} />
          <FAQ faqs={dentist.faqs} />
        </div>
      </div>

      {/* Booking Modal */}
      <BookingWizard
        dentist={dentist}
        isOpen={isBookingOpen}
        onClose={handleBookingClose}
      />
    </>
  );
}
