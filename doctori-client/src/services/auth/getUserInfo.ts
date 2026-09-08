/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";

export const getUserInfo = async (): Promise<UserInfo | any> => {
  try {
    const response = await serverFetch.get("/user/me", {
      cache: "force-cache",
      next: {
        tags: ["user-info"],
      },
    });

    const result = await response.json();

    if (!result.success || !result.data) {
      throw new Error(
        result.message || "Unable to fetch user information"
      );
    }

    const profile = result.data;

    /*
     * /user/me returns the role profile in flattened form.
     *
     * We keep the top-level values and also create the
     * nested patient / doctor / admin object because the
     * existing UI components expect those properties.
     */
    return {
      ...profile,

      name: profile.name || "Unknown User",

      patient:
        profile.role === "PATIENT"
          ? profile
          : undefined,

      doctor:
        profile.role === "DOCTOR"
          ? profile
          : undefined,

      admin:
        profile.role === "ADMIN"
          ? profile
          : undefined,
    };
  } catch (error: any) {
    console.log(error);

    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "PATIENT",
    };
  }
};