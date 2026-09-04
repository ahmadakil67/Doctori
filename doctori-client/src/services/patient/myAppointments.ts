"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getMyAppointments() {
  try {
    const response = await serverFetch.get(
      "/appointment/my-appointments?limit=50&sortBy=createdAt&sortOrder=desc"
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Failed to fetch appointments",
        data: [],
      };
    }

    return {
      success: true,
      message: result.message,
      data: result?.data?.data || [],
      meta: result?.data?.meta,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch appointments",
      data: [],
    };
  }
}