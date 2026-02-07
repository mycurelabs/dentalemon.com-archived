"use client"

import * as React from "react"
import { DirectoryFilters } from "@/types/dentist"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FilterPanelProps {
  filters: DirectoryFilters
  onFilterChange: (filters: DirectoryFilters) => void
  specialties: string[]
  locations: string[]
  services: string[]
  mobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
}

interface FilterSectionProps {
  title: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  count?: number
}

function FilterSection({ title, options, selected, onToggle, count = 0 }: FilterSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-sans font-semibold text-sm text-foreground">
        {title}
        {count > 0 && (
          <span className="ml-1.5 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-xs font-medium">
            {count}
          </span>
        )}
      </h3>
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
        <h2 className="font-sans text-lg font-semibold">Filters</h2>
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
          count={filters.specialties.length}
        />

        <FilterSection
          title="Location"
          options={locations}
          selected={filters.locations}
          onToggle={handleToggleLocation}
          count={filters.locations.length}
        />

        <FilterSection
          title="Services"
          options={services}
          selected={filters.services}
          onToggle={handleToggleService}
          count={filters.services.length}
        />
      </div>
    </div>
  )
}

export function FilterPanel(props: FilterPanelProps) {
  const { mobileOpen = false, onMobileOpenChange } = props

  return (
    <>
      {/* Desktop: Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
          <FilterPanelContent {...props} />
        </div>
      </div>

      {/* Mobile: Dialog modal (triggered externally) */}
      <Dialog open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <DialogContent className="sm:max-w-[400px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-sans">Filters</DialogTitle>
          </DialogHeader>
          <FilterPanelContent {...props} />
          <div className="pt-4 border-t">
            <Button
              className="w-full rounded-lg bg-[#FFCC5E] text-black hover:bg-[#FFCC5E]/90"
              onClick={() => onMobileOpenChange?.(false)}
            >
              Show Results
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
