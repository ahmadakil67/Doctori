"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { IDoctorSchedule } from "@/types/schedule.interface";

import { CalendarDays, Clock3 } from "lucide-react";

import { format, isBefore, isValid } from "date-fns";

const getStartDate = (schedule: IDoctorSchedule) => {
  if (!schedule.schedule?.startDateTime) {
    return null;
  }

  const date = new Date(schedule.schedule.startDateTime);

  return isValid(date) ? date : null;
};

const getEndDate = (schedule: IDoctorSchedule) => {
  if (!schedule.schedule?.endDateTime) {
    return null;
  }

  const date = new Date(schedule.schedule.endDateTime);

  return isValid(date) ? date : null;
};

const isPastSchedule = (schedule: IDoctorSchedule) => {
  const endDate = getEndDate(schedule);

  if (!endDate) {
    return false;
  }

  return isBefore(endDate, new Date());
};

export const myScheduleColumns: Column<IDoctorSchedule>[] = [
  {
    header: "Date",

    accessor: (schedule) => {
      const startDate = getStartDate(schedule);

      return (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <CalendarDays className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {startDate ? format(startDate, "MMM d, yyyy") : "Unavailable"}
            </p>

            {startDate && (
              <p className="mt-0.5 text-xs text-slate-400">
                {format(startDate, "EEEE")}
              </p>
            )}
          </div>
        </div>
      );
    },

    sortKey: "schedule.startDateTime",
  },

  {
    header: "Time Slot",

    accessor: (schedule) => {
      const startDate = getStartDate(schedule);

      const endDate = getEndDate(schedule);

      return (
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Clock3 className="h-4 w-4 shrink-0 text-slate-400" />

          <span className="font-medium">
            {startDate ? format(startDate, "h:mm a") : "N/A"}

            {endDate && ` – ${format(endDate, "h:mm a")}`}
          </span>
        </div>
      );
    },
  },

  {
    header: "Schedule",

    accessor: (schedule) => {
      const isPast = isPastSchedule(schedule);

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
          className="rounded-full border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400"
        >
          Upcoming
        </Badge>
      );
    },
  },

  {
    header: "Booking Status",

    accessor: (schedule) => {
      const isPast = isPastSchedule(schedule);

      if (isPast) {
        return (
          <Badge
            variant="secondary"
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
          >
            Expired
          </Badge>
        );
      }

      if (schedule.isBooked) {
        return (
          <Badge className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-600">
            Booked
          </Badge>
        );
      }

      return (
        <Badge
          variant="outline"
          className="rounded-full border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400"
        >
          Available
        </Badge>
      );
    },
  },
];
