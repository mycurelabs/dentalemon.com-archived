/**
 * API Route: GET /api/dentists
 * Returns list of all dentists from sample data
 */

import { NextResponse } from "next/server";
import { sampleDentists } from "@/data/dentists/sample-dentists";

export async function GET() {
  try {
    return NextResponse.json(
      {
        dentists: sampleDentists,
        total: sampleDentists.length,
        page: 1,
        limit: sampleDentists.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dentists:", error);
    return NextResponse.json(
      { error: "Failed to fetch dentists" },
      { status: 500 }
    );
  }
}
