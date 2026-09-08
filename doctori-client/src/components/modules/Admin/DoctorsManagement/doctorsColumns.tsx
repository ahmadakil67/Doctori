/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";

import { Column } from "@/components/shared/ManagementTable";

import { IDoctor } from "@/types/doctor.interface";

import {
  Phone,
  Star,
} from "lucide-react";

const getDoctorSpecialties = (
  doctor: IDoctor
) => {
  const items =
    (doctor as any)
      .doctorSpecialties || [];

  return items
    .map(
      (item: any) =>
        item?.specialities?.title ||
        item?.specialties?.title
    )
    .filter(Boolean);
};

export const doctorsColumns: Column<IDoctor>[] =
  [
    {
      header: "Doctor",

      accessor: (doctor) => (
        <UserInfoCell
          name={doctor.name}
          email={doctor.email}
          photo={
            doctor.profilePhoto as string
          }
        />
      ),

      sortKey: "name",
    },

    {
      header: "Specialties",

      accessor: (doctor) => {
        const specialties =
          getDoctorSpecialties(
            doctor
          );

        if (
          specialties.length ===
          0
        ) {
          return (
            <span className="text-xs text-slate-400">
              No specialties
            </span>
          );
        }

        return (
          <div className="flex max-w-[260px] flex-wrap gap-1.5">
            {specialties.map(
              (
                title: string,
                index: number
              ) => (
                <span
                  key={`${title}-${index}`}
                  className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                >
                  {title}
                </span>
              )
            )}
          </div>
        );
      },
    },

    {
      header: "Contact",

      accessor: (doctor) => (
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Phone className="h-4 w-4 text-slate-400" />

          {doctor.contactNumber ||
            "Not provided"}
        </div>
      ),
    },

    {
      header: "Experience",

      accessor: (doctor) => (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {doctor.experience ?? 0}{" "}
          {(doctor.experience ??
            0) === 1
            ? "year"
            : "years"}
        </span>
      ),

      sortKey: "experience",
    },

    {
      header: "Fee",

      accessor: (doctor) => (
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          BDT{" "}
          {(
            doctor.appointmentFee ??
            0
          ).toLocaleString()}
        </span>
      ),

      sortKey:
        "appointmentFee",
    },

    {
      header: "Rating",

      accessor: (doctor) => {
        const rating =
          doctor.averageRating;

        return (
          <div className="flex items-center gap-1.5">

            <Star
              className={`h-4 w-4 ${
                typeof rating ===
                "number"
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300"
              }`}
            />

            <span className="text-sm font-medium">
              {typeof rating ===
              "number"
                ? rating.toFixed(1)
                : "—"}
            </span>
          </div>
        );
      },

      sortKey:
        "averageRating",
    },

    {
      header: "Gender",

      accessor: (doctor) => (
        <span className="text-sm capitalize">
          {doctor.gender
            ? doctor.gender.toLowerCase()
            : "—"}
        </span>
      ),
    },

    {
      header: "Status",

      accessor: (doctor) => (
        <StatusBadgeCell
          isDeleted={
            doctor.isDeleted
          }
        />
      ),
    },

    {
      header: "Joined",

      accessor: (doctor) => (
        <DateCell
          date={doctor.createdAt}
        />
      ),

      sortKey: "createdAt",
    },
  ];