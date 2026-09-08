"use client";

import { CalendarDays } from "lucide-react";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { deleteDoctorOwnSchedule } from "@/services/doctor/doctorScedule.services";

import { IDoctorSchedule } from "@/types/schedule.interface";

import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";

import { toast } from "sonner";

import { myScheduleColumns } from "./myScheduleColumns";
import { useMemo } from "react";

interface MySchedulesTableProps {
  schedules: IDoctorSchedule[];
}

export default function MySchedulesTable({
  schedules = [],
}: MySchedulesTableProps) {
  const router = useRouter();

  const [isRefreshing, startTransition] = useTransition();

  const [deletingSchedule, setDeletingSchedule] =
    useState<IDoctorSchedule | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  /* =========================================================
     DELETE REQUEST
  ========================================================= */

  const handleDelete = (schedule: IDoctorSchedule) => {
    /*
     * A booked consultation slot
     * should never be deleted.
     */
    if (schedule.isBooked) {
      toast.error("Booked schedules cannot be deleted.");

      return;
    }

    setDeletingSchedule(schedule);
  };

  /* =========================================================
     CONFIRM DELETE
  ========================================================= */

  const confirmDelete = async () => {
    if (!deletingSchedule || isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);

      const result = await deleteDoctorOwnSchedule(deletingSchedule.scheduleId);

      if (result.success) {
        toast.success(result.message || "Schedule deleted successfully.");

        setDeletingSchedule(null);

        handleRefresh();
      } else {
        toast.error(result.message || "Failed to delete schedule.");
      }
    } catch (error) {
      console.error("Schedule delete error:", error);

      toast.error("Unable to delete the schedule.");
    } finally {
      setIsDeleting(false);
    }
  };

  const now = new Date();

  const expiredCount = schedules.filter((schedule) => {
    const endDate = schedule.schedule?.endDateTime
      ? new Date(schedule.schedule.endDateTime)
      : null;

    return endDate && endDate < now;
  }).length;

  const bookedCount = schedules.filter((schedule) => {
    const endDate = schedule.schedule?.endDateTime
      ? new Date(schedule.schedule.endDateTime)
      : null;

    return schedule.isBooked && endDate && endDate >= now;
  }).length;

  const availableCount = schedules.filter((schedule) => {
    const endDate = schedule.schedule?.endDateTime
      ? new Date(schedule.schedule.endDateTime)
      : null;

    return !schedule.isBooked && endDate && endDate >= now;
  }).length;

  const sortedSchedules = useMemo(() => {
    const now = new Date().getTime();

    return [...schedules].sort((a, b) => {
      const aTime = a.schedule?.startDateTime
        ? new Date(a.schedule.startDateTime).getTime()
        : 0;

      const bTime = b.schedule?.startDateTime
        ? new Date(b.schedule.startDateTime).getTime()
        : 0;

      const aIsPast = aTime < now;
      const bIsPast = bTime < now;

      if (aIsPast !== bIsPast) {
        return aIsPast ? 1 : -1;
      }

      // Upcoming → nearest first
      if (!aIsPast && !bIsPast) {
        return aTime - bTime;
      }

      // Past → most recent past first
      return bTime - aTime;
    });
  }, [schedules]);

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {/* ======================================
            TABLE HEADER
        ====================================== */}

        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-950 dark:text-white">
                Schedule List
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your consultation availability and booked time slots.
              </p>
            </div>
          </div>

          {/* Counts */}
          {schedules.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {schedules.length} Total
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                {availableCount} Available
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                {bookedCount} Booked
              </span>
            </div>
          )}
        </div>

        {/* ======================================
            TABLE
        ====================================== */}

        <div className={isRefreshing ? "pointer-events-none opacity-70" : ""}>
          <ManagementTable
            data={sortedSchedules}
            columns={myScheduleColumns}
            onDelete={handleDelete}
            getRowKey={(schedule) => schedule.scheduleId}
            emptyMessage="No schedules found. Adjust your filters or add a new consultation schedule."
          />
        </div>
      </section>

      {/* ======================================
          DELETE CONFIRMATION
      ====================================== */}

      <DeleteConfirmationDialog
        open={!!deletingSchedule}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setDeletingSchedule(null);
          }
        }}
        onConfirm={confirmDelete}
        title="Delete Schedule"
        description="Are you sure you want to remove this consultation slot? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
}
