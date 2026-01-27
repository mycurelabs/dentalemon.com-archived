import { NextResponse } from "next/server"

/**
 * GET /api/config
 *
 * Returns runtime configuration for the frontend
 */
export async function GET() {
  const accountUrl =
    process.env.ACCOUNT_URL ||
    process.env.NEXT_PUBLIC_ACCOUNT_URL ||
    "https://app.dentalemon.com"

  return NextResponse.json({
    accountUrl,
  })
}
