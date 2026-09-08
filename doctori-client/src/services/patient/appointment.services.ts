"use server";

import { serverFetch } from "@/lib/server-fetch";

interface CreateAppointmentPayload {
  doctorId: string;
  scheduleId: string;
}

export async function createAppointment(
  payload: CreateAppointmentPayload
) {
  try {
    const response = await serverFetch.post("/appointment", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return {
      ...result,
      statusCode: response.status,
    };
  } catch (error) {
    console.error("Create appointment error:", error);

    return {
      success: false,
      message: "Unable to create appointment. Please try again.",
    };
  }
}