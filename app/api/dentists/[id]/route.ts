/**
 * API Route: GET /api/dentists/[id]
 * Returns a single dentist by ID or slug
 */

import { NextResponse } from "next/server";
import { sampleDentists } from "@/data/dentists/sample-dentists";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    // Find dentist by ID or slug
    const dentist = sampleDentists.find(
      (d) => d.id === id || d.slug === id
    );

    if (!dentist) {
      return NextResponse.json(
        { error: "Dentist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(dentist, { status: 200 });
  } catch (error) {
    console.error("Error fetching dentist:", error);
    return NextResponse.json(
      { error: "Failed to fetch dentist" },
      { status: 500 }
    );
  }
}
