"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Dentist, DirectoryFilters } from "@/types/dentist";
import {
  SearchBar,
  FilterPanel,
  ActiveFilters,
  DentistGrid,
  LegalDisclaimer,
  BookingWizard,
} from "@/components/directory";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid3x3, List } from "lucide-react";

interface DirectoryContentProps {
  initialDentists: Dentist[];
}

export function DirectoryContent({ initialDentists }: DirectoryContentProps) {
  // State management
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState<DirectoryFilters>({
    specialties: [],
    locations: [],
    services: [],
  });
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedDentistId, setSelectedDentistId] = React.useState<string | null>(null);

  // Extract unique filter options from all dentists
  const filterOptions = React.useMemo(() => {
    const specialties = new Set<string>();
    const locations = new Set<string>();
    const services = new Set<string>();

    initialDentists.forEach((dentist) => {
      // Add all specialties
      dentist.specialties.forEach((specialty) => specialties.add(specialty));

      // Add all clinic cities
      dentist.clinics.forEach((clinic) => locations.add(clinic.address.city));

      // Add all services
      dentist.services.forEach((service) => services.add(service));
    });

    return {
      specialties: Array.from(specialties).sort(),
      locations: Array.from(locations).sort(),
      services: Array.from(services).sort(),
    };
  }, [initialDentists]);

  // Filter and search logic
  const filteredDentists = React.useMemo(() => {
    return initialDentists.filter((dentist) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = dentist.name.toLowerCase().includes(query);
        const matchesSpecialty = dentist.specialties.some((s) =>
          s.toLowerCase().includes(query)
        );
        const matchesService = dentist.services.some((s) =>
          s.toLowerCase().includes(query)
        );

        if (!matchesName && !matchesSpecialty && !matchesService) {
          return false;
        }
      }

      // Specialty filter
      if (filters.specialties.length > 0) {
        const hasMatchingSpecialty = dentist.specialties.some((specialty) =>
          filters.specialties.includes(specialty)
        );
        if (!hasMatchingSpecialty) {
          return false;
        }
      }

      // Location filter
      if (filters.locations.length > 0) {
        const hasMatchingLocation = dentist.clinics.some((clinic) =>
          filters.locations.includes(clinic.address.city)
        );
        if (!hasMatchingLocation) {
          return false;
        }
      }

      // Services filter
      if (filters.services.length > 0) {
        const hasMatchingService = dentist.services.some((service) =>
          filters.services.includes(service)
        );
        if (!hasMatchingService) {
          return false;
        }
      }

      return true;
    });
  }, [initialDentists, searchQuery, filters]);

  // Active filters for display
  const activeFilters = React.useMemo(() => {
    const active: { key: string; value: string; label: string }[] = [];

    filters.specialties.forEach((specialty) => {
      active.push({ key: "specialties", value: specialty, label: specialty });
    });

    filters.locations.forEach((location) => {
      active.push({ key: "locations", value: location, label: location });
    });

    filters.services.forEach((service) => {
      active.push({ key: "services", value: service, label: service });
    });

    return active;
  }, [filters]);

  // Handle filter removal
  const handleRemoveFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: (prev[key as keyof DirectoryFilters] as string[]).filter(
        (item) => item !== value
      ),
    }));
  };

  // Handle booking click
  const handleBookClick = (dentistId: string) => {
    setSelectedDentistId(dentistId);
  };

  const selectedDentist = selectedDentistId
    ? initialDentists.find((d) => d.id === selectedDentistId)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden text-white relative brand-gradient-bg">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="container px-4 sm:px-6 md:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6 text-white">
              Find the Right Dentist.<br />Book in Minutes.
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              Search verified dentists in Metro Manila by specialty, clinic, or location—and book appointments instantly, no calls required.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={setSearchQuery}
                className="[&_input]:bg-white [&_input]:shadow-md [&_input]:border-neutral-200 [&_input]:text-foreground [&_input]:placeholder:text-neutral-400 [&_svg]:text-neutral-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex gap-8">
            {/* Sidebar Filter Panel (Desktop) / Sheet (Mobile) */}
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              specialties={filterOptions.specialties}
              locations={filterOptions.locations}
              services={filterOptions.services}
            />

            {/* Results Area */}
            <div className="flex-1 min-w-0">
              {/* Legal Disclaimer */}
              <LegalDisclaimer />

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {filteredDentists.length}{" "}
                    {filteredDentists.length === 1 ? "dentist" : "dentists"} found
                  </h2>
                  {activeFilters.length > 0 && (
                    <div className="mt-3">
                      <ActiveFilters
                        filters={activeFilters}
                        onRemove={handleRemoveFilter}
                      />
                    </div>
                  )}
                </div>

                {/* View Toggle — hidden on mobile where grid is always single-column */}
                <ToggleGroup
                  type="single"
                  variant="outline"
                  value={viewMode}
                  onValueChange={(value) => {
                    if (value) setViewMode(value as "grid" | "list");
                  }}
                  className="hidden md:flex"
                >
                  <ToggleGroupItem value="grid" aria-label="Grid view">
                    <Grid3x3 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="List view">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Dentist Grid */}
              <DentistGrid
                dentists={filteredDentists}
                viewMode={viewMode}
                onBookClick={handleBookClick}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Wizard Dialog */}
      {selectedDentist && (
        <BookingWizard
          dentist={selectedDentist}
          isOpen={!!selectedDentistId}
          onClose={() => setSelectedDentistId(null)}
        />
      )}
    </div>
  );
}
