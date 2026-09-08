"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";

import { Column } from "@/components/shared/ManagementTable";

import { IPatient } from "@/types/patient.interface";

import {
  MapPin,
  Phone,
} from "lucide-react";

export const patientsColumns: Column<IPatient>[] =
  [
    {
      header: "Patient",

      accessor: (patient) => (
        <UserInfoCell
          name={patient.name}
          email={patient.email}
          photo={
            patient.profilePhoto
          }
        />
      ),

      sortKey: "name",
    },

    {
      header: "Contact",

      accessor: (patient) => (
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">

          <Phone className="h-4 w-4 shrink-0 text-slate-400" />

          <span>
            {patient.contactNumber ||
              "Not provided"}
          </span>
        </div>
      ),
    },

    {
      header: "Address",

      accessor: (patient) => (
        <div className="flex max-w-[220px] items-center gap-2 text-sm text-slate-600 dark:text-slate-300">

          <MapPin className="h-4 w-4 shrink-0 text-slate-400" />

          <span
            className="truncate"
            title={
              patient.address ||
              undefined
            }
          >
            {patient.address ||
              "Not provided"}
          </span>
        </div>
      ),
    },

    {
      header: "Gender",

      accessor: (patient) => {
        const gender =
          patient.patientHealthData
            ?.gender;

        return (
          <span className="text-sm capitalize text-slate-700 dark:text-slate-300">
            {gender
              ? gender.toLowerCase()
              : "—"}
          </span>
        );
      },
    },

    {
      header: "Status",

      accessor: (patient) => (
        <StatusBadgeCell
          isDeleted={
            patient.isDeleted
          }
        />
      ),
    },

    {
      header: "Joined",

      accessor: (patient) => (
        <DateCell
          date={patient.createdAt}
        />
      ),

      sortKey: "createdAt",
    },
  ];