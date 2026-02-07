"use client";

import { Education, Certification } from "@/types/dentist";
import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationCertificationsProps {
  education: Education[];
  certifications: Certification[];
}

export function EducationCertifications({
  education,
  certifications,
}: EducationCertificationsProps) {
  const hasEducation = education.length > 0;
  const hasCertifications = certifications.length > 0;

  if (!hasEducation && !hasCertifications) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-lg border shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold mb-6">Education & Certifications</h2>

      <div className="space-y-8">
        {/* Education Section */}
        {hasEducation && (
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#FFCC5E]" />
              Education
            </h3>

            <div className="relative pl-8 space-y-6">
              {/* Vertical timeline line */}
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />

              {education.map((edu, index) => (
                <motion.div
                  key={`${edu.institution}-${edu.year}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full bg-[#FFCC5E] border-2 border-background" />

                  <div>
                    <p className="font-semibold text-sm mb-1">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground mb-0.5">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>{edu.year}</span>
                      {edu.location && (
                        <>
                          <span>•</span>
                          <span>{edu.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {hasCertifications && (
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-[#FFCC5E]" />
              Certifications
            </h3>

            <div className="relative pl-8 space-y-6">
              {/* Vertical timeline line */}
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />

              {certifications.map((cert, index) => {
                const isExpired = cert.expiryDate
                  ? new Date(cert.expiryDate) < new Date()
                  : false;

                return (
                  <motion.div
                    key={`${cert.title}-${cert.year}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * (index + education.length) }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div
                      className={cn(
                        "absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-background",
                        isExpired ? "bg-muted" : "bg-[#FFCC5E]"
                      )}
                    />

                    <div>
                      <p className="font-semibold text-sm mb-1">{cert.title}</p>
                      <p className="text-sm text-muted-foreground mb-0.5">
                        {cert.issuingOrganization}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>Issued {cert.year}</span>
                        {cert.expiryDate && (
                          <>
                            <span>•</span>
                            <span className={cn(isExpired && "text-red-500")}>
                              {isExpired ? "Expired" : "Expires"}{" "}
                              {new Date(cert.expiryDate).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
