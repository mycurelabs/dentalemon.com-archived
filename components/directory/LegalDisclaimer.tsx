"use client";

import { Info } from "lucide-react";

export function LegalDisclaimer() {
  return (
    <div className="mb-6 flex gap-3 rounded-lg border border-neutral-100 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        This directory is for informational purposes only. Booking through this platform
        constitutes an appointment request, not a confirmed appointment. Please verify
        credentials independently.
      </p>
    </div>
  );
}
