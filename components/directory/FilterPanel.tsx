"use client"

import * as React from "react"
import { DirectoryFilters } from "@/types/dentist"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  filters: DirectoryFilters
  onFilterChange: (filters: DirectoryFilters) => void
  specialties: string[]
  locations: string[]
  services: string[]
}

interface FilterSectionProps {
  title: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}

function FilterSection({ title, options, selected, onToggle }: FilterSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${title}-${option}`}
              checked={selected.includes(option)}
              onCheckedChange={() => onToggle(option)}
            />
            <Label
              htmlFor={`${title}-${option}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

function FilterPanelContent({
  filters,
  onFilterChange,
  specialties,
  locations,
  services,
}: FilterPanelProps) {
  const handleToggleSpecialty = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter((s) => s !== specialty)
      : [...filters.specialties, specialty]

    onFilterChange({
      ...filters,
      specialties: newSpecialties,
    })
  }

  const handleToggleLocation = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter((l) => l !== location)
      : [...filters.locations, location]

    onFilterChange({
      ...filters,
      locations: newLocations,
    })
  }

  const handleToggleService = (service: string) => {
    const newServices = filters.services.includes(service)
      ? filters.services.filter((s) => s !== service)
      : [...filters.services, service]

    onFilterChange({
      ...filters,
      services: newServices,
    })
  }

  const handleClearAll = () => {
    onFilterChange({
      specialties: [],
      locations: [],
      services: [],
    })
  }

  const hasActiveFilters =
    filters.specialties.length > 0 ||
    filters.locations.length > 0 ||
    filters.services.length > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-8 px-2 text-sm"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <FilterSection
          title="Specialty"
          options={specialties}
          selected={filters.specialties}
          onToggle={handleToggleSpecialty}
        />

        <FilterSection
          title="Location"
          options={locations}
          selected={filters.locations}
          onToggle={handleToggleLocation}
        />

        <FilterSection
          title="Services"
          options={services}
          selected={filters.services}
          onToggle={handleToggleService}
        />
      </div>
    </div>
  )
}

export function FilterPanel(props: FilterPanelProps) {
  return (
    <>
      {/* Desktop: Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
          <FilterPanelContent {...props} />
        </div>
      </div>

      {/* Mobile: Sheet (Drawer) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="fixed bottom-4 right-4 z-40 h-12 w-12 rounded-full p-0 shadow-lg"
            >
              <Filter className="h-5 w-5" />
              <span className="sr-only">Open filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterPanelContent {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
