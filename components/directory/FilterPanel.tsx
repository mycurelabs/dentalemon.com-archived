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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

function FilterCheckboxes({ title, options, selected, onToggle }: FilterSectionProps) {
  return (
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
    <>
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

      <Accordion type="multiple" defaultValue={["specialty", "location", "services"]}>
        <AccordionItem value="specialty">
          <AccordionTrigger className="font-sans font-semibold text-sm text-foreground hover:no-underline py-3">
            <span className="flex items-center gap-1.5">
              Specialty
              {filters.specialties.length > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-xs font-medium">
                  {filters.specialties.length}
                </span>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <FilterCheckboxes
              title="Specialty"
              options={specialties}
              selected={filters.specialties}
              onToggle={handleToggleSpecialty}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger className="font-sans font-semibold text-sm text-foreground hover:no-underline py-3">
            <span className="flex items-center gap-1.5">
              Location
              {filters.locations.length > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-xs font-medium">
                  {filters.locations.length}
                </span>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <FilterCheckboxes
              title="Location"
              options={locations}
              selected={filters.locations}
              onToggle={handleToggleLocation}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="services" className="border-b-0">
          <AccordionTrigger className="font-sans font-semibold text-sm text-foreground hover:no-underline py-3">
            <span className="flex items-center gap-1.5">
              Services
              {filters.services.length > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-xs font-medium">
                  {filters.services.length}
                </span>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <FilterCheckboxes
              title="Services"
              options={services}
              selected={filters.services}
              onToggle={handleToggleService}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export function FilterPanel(props: FilterPanelProps) {
  const { mobileOpen = false, onMobileOpenChange } = props

  const hasActiveFilters =
    props.filters.specialties.length > 0 ||
    props.filters.locations.length > 0 ||
    props.filters.services.length > 0

  const handleClearAll = () => {
    props.onFilterChange({
      specialties: [],
      locations: [],
      services: [],
    })
  }

  return (
    <>
      {/* Desktop: Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-24 rounded-lg border border-border bg-card p-6 shadow-sm">
          <FilterPanelContent {...props} />
        </div>
      </div>

      {/* Mobile: Dialog modal with fixed header/footer, scrollable body */}
      <Dialog open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <DialogContent className="sm:max-w-[400px] max-h-[80vh] flex flex-col p-0 gap-0">
          {/* Fixed header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b flex-shrink-0">
            <DialogHeader className="p-0 space-y-0">
              <DialogTitle className="font-sans text-lg">Filters</DialogTitle>
            </DialogHeader>
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

          {/* Scrollable filter content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <Accordion type="multiple" defaultValue={["specialty", "location", "services"]}>
              <AccordionItem value="specialty">
                <AccordionTrigger className="font-sans font-semibold text-sm text-foreground hover:no-underline py-3">
                  <span className="flex items-center gap-1.5">
                    Specialty
                    {props.filters.specialties.length > 0 && (
                      <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-xs font-medium">
                        {props.filters.specialties.length}
                      </span>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <FilterCheckboxes
                    title="Specialty"
                    options={props.specialties}
                    selected={props.filters.specialties}
                    onToggle={(specialty) => {
                      const newSpecialties = props.filters.specialties.includes(specialty)
                        ? props.filters.specialties.filter((s) => s !== specialty)
                        : [...props.filters.specialties, specialty]
                      props.onFilterChange({ ...props.filters, specialties: newSpecialties })
                    }}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="location">
                <AccordionTrigger className="font-sans font-semibold text-sm text-foreground hover:no-underline py-3">
                  <span className="flex items-center gap-1.5">
                    Location
                    {props.filters.locations.length > 0 && (
                      <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-xs font-medium">
                        {props.filters.locations.length}
                      </span>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <FilterCheckboxes
                    title="Location"
                    options={props.locations}
                    selected={props.filters.locations}
                    onToggle={(location) => {
                      const newLocations = props.filters.locations.includes(location)
                        ? props.filters.locations.filter((l) => l !== location)
                        : [...props.filters.locations, location]
                      props.onFilterChange({ ...props.filters, locations: newLocations })
                    }}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="services" className="border-b-0">
                <AccordionTrigger className="font-sans font-semibold text-sm text-foreground hover:no-underline py-3">
                  <span className="flex items-center gap-1.5">
                    Services
                    {props.filters.services.length > 0 && (
                      <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-xs font-medium">
                        {props.filters.services.length}
                      </span>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <FilterCheckboxes
                    title="Services"
                    options={props.services}
                    selected={props.filters.services}
                    onToggle={(service) => {
                      const newServices = props.filters.services.includes(service)
                        ? props.filters.services.filter((s) => s !== service)
                        : [...props.filters.services, service]
                      props.onFilterChange({ ...props.filters, services: newServices })
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Fixed footer CTA */}
          <div className="px-6 pb-6 pt-4 border-t flex-shrink-0">
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
