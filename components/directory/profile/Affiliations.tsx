"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <CardTitle className="font-sans text-lg">
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
