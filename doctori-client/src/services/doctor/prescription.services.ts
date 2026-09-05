"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

interface CreatePrescriptionPayload {
  appointmentId: string;
  instructions: string;
  followUpDate?: string;
}

export async function createPrescription(
  payload: CreatePrescriptionPayload
) {
  try {
    const body = {
      appointmentId: payload.appointmentId,
      instructions: payload.instructions,
      followUpDate: payload.followUpDate
        ? new Date(payload.followUpDate).toISOString()
        : null,
    };

    const response = await serverFetch.post("/prescription", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message || "Failed to create prescription",
      };
    }

    revalidatePath("/doctor/dashboard/prescriptions");
    revalidatePath("/doctor/dashboard/appoinments");

    return {
      success: true,
      message:
        result?.message ||
        "Prescription created successfully",
      data: result?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.message ||
        "Failed to create prescription",
    };
  }
}