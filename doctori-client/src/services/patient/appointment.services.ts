"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function createAppointment(
  doctorId: string,
  scheduleId: string
) {
  try {
    const response = await serverFetch.post("/appointment", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctorId,
        scheduleId,
      }),
    });

    const result = await response.json();

    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.message || "Failed to create appointment",
    };
  }
}