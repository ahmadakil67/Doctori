"use client";

import {
  CalendarDays,
  Check,
  Clock3,
  Loader2,
} from "lucide-react";

import { format } from "date-fns";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  createDoctorSchedule,
  getAvailableSchedules,
} from "@/services/doctor/doctorScedule.services";

import { ISchedule } from "@/types/schedule.interface";

interface BookScheduleDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  availableSchedules: ISchedule[];
}

export default function BookScheduleDialog({
  open,
  onClose,
  onSuccess,
  availableSchedules:
    initialAvailableSchedules = [],
}: BookScheduleDialogProps) {
  const router = useRouter();

  const [
    availableSchedules,
    setAvailableSchedules,
  ] = useState<ISchedule[]>(
    initialAvailableSchedules
  );

  const [
    selectedSchedules,
    setSelectedSchedules,
  ] = useState<string[]>([]);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    isLoadingSchedules,
    setIsLoadingSchedules,
  ] = useState(false);

  /* =========================================================
     LOAD FRESH AVAILABLE SCHEDULES
  ========================================================= */

  useEffect(() => {
    if (!open) {
      setSelectedSchedules(
        []
      );

      return;
    }

    const loadAvailableSchedules =
      async () => {
        try {
          setIsLoadingSchedules(
            true
          );

          const response =
            await getAvailableSchedules();

          setAvailableSchedules(
            response?.data || []
          );
        } catch (error) {
          console.error(
            "Error loading schedules:",
            error
          );

          toast.error(
            "Failed to load available schedules."
          );
        } finally {
          setIsLoadingSchedules(
            false
          );
        }
      };

    loadAvailableSchedules();
  }, [open]);

  /* =========================================================
     TOGGLE SCHEDULE
  ========================================================= */

  const handleToggleSchedule = (
    scheduleId: string
  ) => {
    if (isSubmitting) return;

    setSelectedSchedules(
      (current) =>
        current.includes(
          scheduleId
        )
          ? current.filter(
              (id) =>
                id !==
                scheduleId
            )
          : [
              ...current,
              scheduleId,
            ]
    );
  };

  /* =========================================================
     GROUP BY DATE
  ========================================================= */

  const groupedSchedules =
    useMemo(() => {
      const grouped: Record<
        string,
        ISchedule[]
      > = {};

      availableSchedules.forEach(
        (schedule) => {
          const scheduleDate =
            new Date(
              schedule.startDateTime
            );

          const key = format(
            scheduleDate,
            "yyyy-MM-dd"
          );

          if (!grouped[key]) {
            grouped[key] = [];
          }

          grouped[key].push(
            schedule
          );
        }
      );

      /*
       * Sort time slots inside
       * every date.
       */
      Object.values(
        grouped
      ).forEach(
        (schedules) => {
          schedules.sort(
            (a, b) =>
              new Date(
                a.startDateTime
              ).getTime() -
              new Date(
                b.startDateTime
              ).getTime()
          );
        }
      );

      /*
       * Sort date groups.
       */
      return Object.entries(
        grouped
      ).sort(
        ([, schedulesA], [
          ,
          schedulesB,
        ]) =>
          new Date(
            schedulesA[0]
              .startDateTime
          ).getTime() -
          new Date(
            schedulesB[0]
              .startDateTime
          ).getTime()
      );
    }, [availableSchedules]);

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit =
    async () => {
      if (
        selectedSchedules.length ===
        0
      ) {
        toast.error(
          "Select at least one schedule."
        );

        return;
      }

      if (isSubmitting) return;

      try {
        setIsSubmitting(true);

        const result =
          await createDoctorSchedule(
            selectedSchedules
          );

        /*
         * Support service functions that
         * explicitly return success: false.
         */
        if (
          result &&
          "success" in result &&
          result.success === false
        ) {
          toast.error(
            result.message ||
              "Failed to add schedules."
          );

          return;
        }

        toast.success(
          `${selectedSchedules.length} schedule${
            selectedSchedules.length >
            1
              ? "s"
              : ""
          } added successfully.`
        );

        setSelectedSchedules(
          []
        );

        if (onSuccess) {
          onSuccess();
        } else {
          router.refresh();
          onClose();
        }
      } catch (error) {
        console.error(
          "Error adding schedules:",
          error
        );

        toast.error(
          "Failed to add schedules."
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <Dialog
      open={open}
      onOpenChange={(
        nextOpen
      ) => {
        if (
          !nextOpen &&
          !isSubmitting
        ) {
          onClose();
        }
      }}
    >
      <DialogContent className="flex max-h-[85vh] max-w-3xl flex-col overflow-hidden rounded-3xl p-0">

        {/* ==================================================
            HEADER
        ================================================== */}

        <DialogHeader className="border-b border-slate-100 px-6 py-5 text-left dark:border-slate-800">

          <div className="flex items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">

              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold text-slate-950 dark:text-white">
                Add Schedule
              </DialogTitle>

              <DialogDescription className="mt-1 leading-6">
                Select available consultation
                slots to add to your Doctori
                schedule.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* ==================================================
            BODY
        ================================================== */}

        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* Loading */}
          {isLoadingSchedules ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center">

              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />

              <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                Loading available
                schedules...
              </p>
            </div>
          ) : availableSchedules.length ===
            0 ? (
            /* Empty */
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 px-6 text-center dark:border-slate-700">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 dark:bg-slate-950">

                <CalendarDays className="h-6 w-6" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                No available schedules
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                There are currently no
                consultation slots available
                to add to your schedule.
              </p>
            </div>
          ) : (
            /* Schedule Groups */
            <div className="space-y-7">

              {groupedSchedules.map(
                ([
                  date,
                  daySchedules,
                ]) => {
                  const displayDate =
                    new Date(
                      daySchedules[0]
                        .startDateTime
                    );

                  return (
                    <section
                      key={date}
                    >
                      {/* Date Header */}
                      <div className="mb-3 flex items-center justify-between gap-3">

                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white">
                            {format(
                              displayDate,
                              "EEEE, MMMM d"
                            )}
                          </h3>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {
                              daySchedules.length
                            }{" "}
                            available slot
                            {daySchedules.length !==
                            1
                              ? "s"
                              : ""}
                          </p>
                        </div>

                        <span className="text-xs font-medium text-slate-400">
                          {format(
                            displayDate,
                            "yyyy"
                          )}
                        </span>
                      </div>

                      {/* Slots */}
                      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">

                        {daySchedules.map(
                          (
                            schedule
                          ) => {
                            const isSelected =
                              selectedSchedules.includes(
                                schedule.id
                              );

                            return (
                              <button
                                key={
                                  schedule.id
                                }
                                type="button"
                                disabled={
                                  isSubmitting
                                }
                                onClick={() =>
                                  handleToggleSchedule(
                                    schedule.id
                                  )
                                }
                                className={`group relative flex min-h-[72px] items-center gap-3 rounded-2xl border p-3 text-left transition ${
                                  isSelected
                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10 dark:bg-blue-950/30"
                                    : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-blue-950/20"
                                } disabled:cursor-not-allowed disabled:opacity-60`}
                              >
                                {/* Checkbox is visual;
                                    button handles the click */}
                                <Checkbox
                                  checked={
                                    isSelected
                                  }
                                  tabIndex={
                                    -1
                                  }
                                  aria-hidden="true"
                                  className="pointer-events-none"
                                />

                                <div className="min-w-0 flex-1">

                                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">

                                    <Clock3 className="h-3.5 w-3.5 text-slate-400" />

                                    {format(
                                      new Date(
                                        schedule.startDateTime
                                      ),
                                      "h:mm a"
                                    )}
                                  </div>

                                  <p className="mt-1 text-xs text-slate-400">
                                    until{" "}
                                    {format(
                                      new Date(
                                        schedule.endDateTime
                                      ),
                                      "h:mm a"
                                    )}
                                  </p>
                                </div>

                                {isSelected && (
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">

                                    <Check className="h-3.5 w-3.5" />
                                  </div>
                                )}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </section>
                  );
                }
              )}
            </div>
          )}
        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <DialogFooter className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/40">

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {
                  selectedSchedules.length
                }{" "}
                schedule
                {selectedSchedules.length !==
                1
                  ? "s"
                  : ""}{" "}
                selected
              </p>

              {selectedSchedules.length >
                0 && (
                <p className="mt-0.5 text-xs text-slate-400">
                  Selected slots will be
                  added to your availability.
                </p>
              )}
            </div>

            <div className="flex gap-2">

              <Button
                type="button"
                variant="outline"
                onClick={
                  onClose
                }
                disabled={
                  isSubmitting
                }
                className="h-10 rounded-xl"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={
                  handleSubmit
                }
                disabled={
                  selectedSchedules.length ===
                    0 ||
                  isSubmitting ||
                  isLoadingSchedules
                }
                className="h-10 min-w-[145px] rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                    Adding...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />

                    Add Schedules
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}