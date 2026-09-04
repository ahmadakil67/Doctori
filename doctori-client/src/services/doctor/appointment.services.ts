"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function updateAppointmentStatus(
  appointmentId: string,
  status: string
) {
  try {
    const response = await serverFetch.patch(
      `/appointment/status/${appointmentId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to update appointment status",
      };
    }

    revalidatePath("/doctor/dashboard/appointments");

    return {
      success: true,
      message:
        result?.message ||
        "Appointment status updated successfully",
      data: result?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.message ||
        "Failed to update appointment status",
    };
  }
}