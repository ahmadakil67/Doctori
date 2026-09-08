"use client";

import { Column } from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialities.interface";

import Image from "next/image";

import {
  Stethoscope,
} from "lucide-react";

export const specialitiesColumns: Column<ISpecialty>[] =
  [
    {
      header: "Specialty",

      accessor: (
        speciality
      ) => (
        <div className="flex items-center gap-3">

          {speciality.icon ? (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-800">

              <Image
                src={
                  speciality.icon
                }
                alt={
                  speciality.title
                }
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
              <Stethoscope className="h-5 w-5" />
            </div>
          )}

          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {speciality.title}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Medical specialty
            </p>
          </div>
        </div>
      ),
    },
  ];