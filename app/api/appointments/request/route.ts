/**
 * API Route: POST /api/appointments/request
 * Handles appointment request submissions
 */

import { NextResponse } from "next/server";
import { AppointmentRequest, AppointmentRequestResponse } from "@/types/dentist";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const body: AppointmentRequest = await request.json();

    // Validate required fields
    const requiredFields = [
      "dentistId",
      "clinicId",
      "patientType",
      "consultationType",
      "preferredDate",
      "preferredTime",
      "reason",
      "patientInfo",
      "consent"
    ];

    for (const field of requiredFields) {
      if (!(field in body) || body[field as keyof AppointmentRequest] === undefined) {
        return NextResponse.json(
          {
            success: false,
            message: `Missing required field: ${field}`,
            error: `Field '${field}' is required`
          } as AppointmentRequestResponse,
          { status: 400 }
        );
      }
    }

    // Validate patientInfo subfields
    const patientInfoFields = ["firstName", "lastName", "phone", "email"];
    for (const field of patientInfoFields) {
      if (!(field in body.patientInfo) || !body.patientInfo[field as keyof typeof body.patientInfo]) {
        return NextResponse.json(
          {
            success: false,
            message: `Missing required patient info: ${field}`,
            error: `Patient info field '${field}' is required`
          } as AppointmentRequestResponse,
          { status: 400 }
        );
      }
    }

    // Validate consent
    if (body.consent !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "Consent is required to submit an appointment request",
          error: "Consent must be true"
        } as AppointmentRequestResponse,
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.patientInfo.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address",
          error: "Please provide a valid email address"
        } as AppointmentRequestResponse,
        { status: 400 }
      );
    }

    // Validate phone format (basic check)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(body.patientInfo.phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid phone number",
          error: "Please provide a valid phone number"
        } as AppointmentRequestResponse,
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(body.preferredDate)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid date format",
          error: "Date must be in YYYY-MM-DD format"
        } as AppointmentRequestResponse,
        { status: 400 }
      );
    }

    // Validate time format (HH:MM)
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(body.preferredTime)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid time format",
          error: "Time must be in HH:MM format"
        } as AppointmentRequestResponse,
        { status: 400 }
      );
    }

    // Validate patient type
    if (!["new", "existing"].includes(body.patientType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid patient type",
          error: "Patient type must be 'new' or 'existing'"
        } as AppointmentRequestResponse,
        { status: 400 }
      );
    }

    // Generate a unique request ID
    const requestId = randomUUID();

    // In a real application, this would:
    // 1. Save the appointment request to a database
    // 2. Send confirmation email to patient
    // 3. Notify the dentist/clinic
    // 4. Create a calendar event
    // For now, we just return a success response

    return NextResponse.json(
      {
        success: true,
        requestId,
        message: `Thank you for your appointment request! Your request ID is ${requestId}. We will contact you within 24 hours to confirm your appointment.`
      } as AppointmentRequestResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing appointment request:", error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request format",
          error: "Request body must be valid JSON"
        } as AppointmentRequestResponse,
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process appointment request",
        error: "An unexpected error occurred. Please try again later."
      } as AppointmentRequestResponse,
      { status: 500 }
    );
  }
}
