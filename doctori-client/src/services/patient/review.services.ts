"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

interface CreateReviewPayload {
  appointmentId: string;
  rating: number;
  comment?: string;
}

export async function createReview(payload: CreateReviewPayload) {
  try {
    const response = await serverFetch.post("/review", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Failed to submit review",
      };
    }

    revalidatePath("/dashboard/my-appointments");
    revalidatePath("/consultation");

    return {
      success: true,
      message: result?.message || "Review submitted successfully",
      data: result?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to submit review",
    };
  }
}