"use client";

import * as React from "react";
import { Dentist, DirectoryFilters } from "@/types/dentist";
import {
  SearchBar,
  FilterPanel,
  ActiveFilters,
  DentistGrid,
  LegalDisclaimer,
  BookingWizard,
} from "@/components/directory";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";
import { cn } from "@/lib/utils";

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
      {/* Header Section */}
      <section className="py-20 md:py-32 border-b">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Dentist
            </h1>
            <p className="text-lg text-muted-foreground">
              Search and book appointments with qualified dentists in Metro Manila
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={setSearchQuery} />
          </div>
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

                {/* View Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
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
