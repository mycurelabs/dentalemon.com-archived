"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: { key: string; value: string; label: string }[];
  onRemove: (key: string, value: string) => void;
}

export function ActiveFilters({ filters, onRemove }: ActiveFiltersProps) {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Badge
          key={`${filter.key}-${filter.value}`}
          variant="secondary"
          className="pl-3 pr-2 py-1.5 text-sm flex items-center gap-2"
        >
          <span>{filter.label}</span>
          <button
            type="button"
            onClick={() => onRemove(filter.key, filter.value)}
            className="ml-1 hover:bg-muted rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${filter.label} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
