/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  CalendarClock,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import {
  useState,
  useTransition,
} from "react";

import BookScheduleDialog from "./BookScheduleDialog";

interface MySchedulesHeaderProps {
  availableSchedules: any[];
}

const MySchedulesHeader = ({
  availableSchedules,
}: MySchedulesHeaderProps) => {
  const router = useRouter();

  const [
    isRefreshing,
    startTransition,
  ] = useTransition();

  const [
    isDialogOpen,
    setIsDialogOpen,
  ] = useState(false);

  const handleSuccess = () => {
    setIsDialogOpen(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {/* Existing schedule selection dialog */}
      <BookScheduleDialog
        open={isDialogOpen}
        onClose={() =>
          setIsDialogOpen(false)
        }
        onSuccess={handleSuccess}
        availableSchedules={
          availableSchedules
        }
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        {/* Left */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Availability
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            My Schedules
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Manage your consultation
            availability and control when
            patients can book appointments
            with you.
          </p>
        </div>

        {/* Action */}
        <Button
          type="button"
          onClick={() =>
            setIsDialogOpen(true)
          }
          disabled={
            isRefreshing
          }
          className="h-11 w-fit rounded-xl bg-blue-600 px-5 font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />

          Add Schedule
        </Button>
      </div>

      {/* Availability information */}
      {availableSchedules.length === 0 && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">

          <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />

          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              No schedules available
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700/80 dark:text-amber-400/80">
              There are currently no
              available schedule slots that
              can be added to your
              availability.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MySchedulesHeader;