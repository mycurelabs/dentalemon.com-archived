"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface AffiliationsProps {
  affiliations: string[];
}

export function Affiliations({ affiliations }: AffiliationsProps) {
  if (affiliations.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#FFCC5E]" />
          Professional Affiliations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {affiliations.map((affiliation, index) => (
            <Badge key={index} variant="outline">
              {affiliation}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
