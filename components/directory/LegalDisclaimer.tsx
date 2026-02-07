"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function LegalDisclaimer() {
  return (
    <Alert variant="default" className="mb-6">
      <Info className="h-4 w-4" />
      <AlertDescription>
        This directory is for informational purposes only. Booking through this platform
        constitutes an appointment request, not a confirmed appointment. Please verify
        credentials independently.
      </AlertDescription>
    </Alert>
  );
}
