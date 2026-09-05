"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getAdminDashboardMeta() {
  try {
    const response = await serverFetch.get("/metadata");

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to load dashboard data",
        data: null,
      };
    }

    return {
      success: true,
      message: result?.message,
      data: result?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.message ||
        "Failed to load dashboard data",
      data: null,
    };
  }
}