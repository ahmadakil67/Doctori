"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getMyPrescriptions() {
  try {
    const response = await serverFetch.get(
      "/prescription/my-prescription?limit=50&page=1&sortBy=createdAt&sortOrder=desc"
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message || "Failed to fetch prescriptions",
        data: [],
        meta: null,
      };
    }

    return {
      success: true,
      message:
        result?.message || "Prescriptions fetched successfully",
      data: result?.data || [],
      meta: result?.meta || null,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.message || "Failed to fetch prescriptions",
      data: [],
      meta: null,
    };
  }
}