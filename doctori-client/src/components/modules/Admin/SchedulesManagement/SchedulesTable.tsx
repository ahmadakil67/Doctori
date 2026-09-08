"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { deleteSchedule } from "@/services/admin/schedulesManagement";

import { ISchedule } from "@/types/schedule.interface";

import {
  CalendarDays,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  useState,
  useTransition,
} from "react";

import { toast } from "sonner";

import { schedulesColumns } from "./schedulesColumns";

interface SchedulesTableProps {
  schedules: ISchedule[];
}

const SchedulesTable = ({
  schedules = [],
}: SchedulesTableProps) => {
  const router = useRouter();

  const [
    isRefreshing,
    startTransition,
  ] = useTransition();

  const [
    deletingSchedule,
    setDeletingSchedule,
  ] =
    useState<ISchedule | null>(
      null
    );

  const [
    isDeleting,
    setIsDeleting,
  ] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (
    schedule: ISchedule
  ) => {
    setDeletingSchedule(
      schedule
    );
  };

  const confirmDelete =
    async () => {
      if (
        !deletingSchedule ||
        !deletingSchedule.id ||
        isDeleting
      ) {
        return;
      }

      try {
        setIsDeleting(true);

        const result =
          await deleteSchedule(
            deletingSchedule.id
          );

        if (result.success) {
          toast.success(
            result.message ||
              "Schedule deleted successfully."
          );

          setDeletingSchedule(
            null
          );

          handleRefresh();
        } else {
          toast.error(
            result.message ||
              "Failed to delete schedule."
          );
        }
      } catch (error) {
        console.error(
          "Schedule delete error:",
          error
        );

        toast.error(
          "Unable to delete the schedule."
        );
      } finally {
        setIsDeleting(false);
      }
    };

  const now =
    new Date();

  const upcomingCount =
    schedules.filter(
      (schedule) =>
        new Date(
          schedule.startDateTime
        ).getTime() >
        now.getTime()
    ).length;

  const pastCount =
    schedules.length -
    upcomingCount;

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-950 dark:text-white">
                Schedule Inventory
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Global consultation
                slots available across
                Doctori.
              </p>
            </div>
          </div>

          {schedules.length > 0 && (
            <div className="flex flex-wrap gap-2">

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {schedules.length} Total
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                {upcomingCount} Upcoming
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {pastCount} Past
              </span>
            </div>
          )}
        </div>

        {/* Table */}
        <div
          className={
            isRefreshing
              ? "pointer-events-none opacity-70"
              : ""
          }
        >
          <ManagementTable
            data={schedules}
            columns={
              schedulesColumns
            }
            onDelete={
              handleDelete
            }
            getRowKey={(
              schedule
            ) =>
              schedule.id!
            }
            emptyMessage="No schedules found. Generate consultation schedules or adjust your date filters."
          />
        </div>
      </section>

      <DeleteConfirmationDialog
        open={
          !!deletingSchedule
        }
        onOpenChange={(
          open
        ) => {
          if (
            !open &&
            !isDeleting
          ) {
            setDeletingSchedule(
              null
            );
          }
        }}
        onConfirm={
          confirmDelete
        }
        title="Delete Schedule"
        description="Are you sure you want to delete this consultation schedule? If the schedule is already referenced elsewhere, the server may prevent deletion."
        isDeleting={
          isDeleting
        }
      />
    </>
  );
};

export default SchedulesTable;