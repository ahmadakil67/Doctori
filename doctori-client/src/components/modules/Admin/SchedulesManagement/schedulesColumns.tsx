"use client";

import { Column } from "@/components/shared/ManagementTable";

import { Badge } from "@/components/ui/badge";

import { ISchedule } from "@/types/schedule.interface";

import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import {
  format,
  isBefore,
  isValid,
} from "date-fns";

const getDate = (
  value?: string
) => {
  if (!value) return null;

  const date =
    new Date(value);

  return isValid(date)
    ? date
    : null;
};

export const schedulesColumns: Column<ISchedule>[] =
  [
    {
      header: "Start",

      accessor: (schedule) => {
        const date =
          getDate(
            schedule.startDateTime
          );

        if (!date) {
          return (
            <span className="text-sm text-slate-400">
              Unavailable
            </span>
          );
        }

        return (
          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <CalendarDays className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {format(
                  date,
                  "MMM d, yyyy"
                )}
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                {format(
                  date,
                  "h:mm a"
                )}
              </p>
            </div>
          </div>
        );
      },

      sortKey:
        "startDateTime",
    },

    {
      header: "End",

      accessor: (schedule) => {
        const date =
          getDate(
            schedule.endDateTime
          );

        if (!date) {
          return "—";
        }

        return (
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {format(
                date,
                "MMM d, yyyy"
              )}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              {format(
                date,
                "h:mm a"
              )}
            </p>
          </div>
        );
      },

      sortKey:
        "endDateTime",
    },

    {
      header: "Duration",

      accessor: (schedule) => {
        const start =
          getDate(
            schedule.startDateTime
          );

        const end =
          getDate(
            schedule.endDateTime
          );

        if (
          !start ||
          !end
        ) {
          return "—";
        }

        const durationMinutes =
          Math.round(
            (end.getTime() -
              start.getTime()) /
              (1000 * 60)
          );

        return (
          <div className="flex items-center gap-2">

            <Clock3 className="h-4 w-4 text-slate-400" />

            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {durationMinutes} min
            </span>
          </div>
        );
      },
    },

    {
      header: "Status",

      accessor: (schedule) => {
        const start =
          getDate(
            schedule.startDateTime
          );

        if (!start) {
          return "—";
        }

        const isPast =
          isBefore(
            start,
            new Date()
          );

        return isPast ? (
          <Badge
            variant="secondary"
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            Past
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="rounded-full border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400"
          >
            Upcoming
          </Badge>
        );
      },
    },
  ];