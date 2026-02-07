"use client";

import { Dentist } from "@/types/dentist";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DentistCardProps {
  dentist: Dentist;
  viewMode: "grid" | "list";
  onBookClick?: (dentistId: string) => void;
}

export function DentistCard({ dentist, viewMode, onBookClick }: DentistCardProps) {
  const isGridView = viewMode === "grid";
  const hasAvailability = dentist.availability && dentist.availability.date;

  // Get first clinic location
  const location = dentist.clinics.length > 0
    ? dentist.clinics[0].address.city
    : "Location not specified";

  // Display first 3-4 services
  const displayedServices = dentist.services.slice(0, 4);
  const remainingServicesCount = dentist.services.length - displayedServices.length;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "overflow-hidden h-full shadow-md",
        !isGridView && "flex flex-row"
      )}>
        {/* Image Section */}
        <div className={cn(
          "relative bg-muted",
          isGridView ? "w-full h-48" : "w-48 h-auto flex-shrink-0"
        )}>
          <Image
            src={dentist.photo || "/placeholder-dentist.jpg"}
            alt={`${dentist.name} - ${dentist.specialty}`}
            fill
            className="object-cover"
            sizes={isGridView ? "(max-width: 768px) 100vw, 33vw" : "192px"}
          />
        </div>

        {/* Content Section */}
        <div className={cn(
          "flex flex-col",
          !isGridView && "flex-1"
        )}>
          <CardContent className={cn(
            "flex-1",
            isGridView ? "p-4" : "p-4 py-4"
          )}>
            {/* Name & Title */}
            <div className="mb-3">
              <h3 className="text-lg font-semibold mb-1">
                {dentist.name}{dentist.title && `, ${dentist.title}`}
              </h3>

              {/* Specialty Badge */}
              <Badge variant="secondary" className="mb-2">
                {dentist.specialty}
              </Badge>
            </div>

            {/* Services */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1.5">Services:</p>
              <div className="flex flex-wrap gap-1.5">
                {displayedServices.map((service) => (
                  <Badge
                    key={service}
                    variant="outline"
                    className="text-xs"
                  >
                    {service}
                  </Badge>
                ))}
                {remainingServicesCount > 0 && (
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="text-xs cursor-default">
                          +{remainingServicesCount} more
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-[200px]">
                        <div className="flex flex-wrap gap-1">
                          {dentist.services.slice(4).map((service) => (
                            <span key={service} className="text-xs">{service}</span>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{location}</span>
            </div>

            {/* Availability Indicator */}
            <div className="flex items-center gap-2">
              {hasAvailability ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-green-700 dark:text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Next available: {new Date(dentist.availability.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                  Contact for availability
                </span>
              )}
            </div>
          </CardContent>

          {/* CTA Buttons */}
          <CardFooter className={cn(
            "gap-2 p-4 pt-0",
            isGridView ? "flex-col" : "flex-row"
          )}>
            <Button
              asChild
              variant="outline"
              className={cn("rounded-lg", isGridView && "w-full")}
            >
              <Link href={`/find-a-dentist/${dentist.slug}`}>
                View Profile
              </Link>
            </Button>
            <Button
              onClick={() => onBookClick?.(dentist.id)}
              className={cn(
                "rounded-lg bg-[#FFCC5E] text-black hover:bg-[#FFCC5E]/90",
                isGridView && "w-full"
              )}
            >
              Book Appointment
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
