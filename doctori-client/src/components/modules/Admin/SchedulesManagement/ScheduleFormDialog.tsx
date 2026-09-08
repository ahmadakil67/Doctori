"use client";

import InputFieldError from "@/components/shared/InputFieldError";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Field,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { createSchedule } from "@/services/admin/schedulesManagement";

import {
  CalendarDays,
  Clock3,
  Info,
  Loader2,
} from "lucide-react";

import {
  useActionState,
  useEffect,
  useRef,
} from "react";

import { toast } from "sonner";

interface IScheduleFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ScheduleFormDialog = ({
  open,
  onClose,
  onSuccess,
}: IScheduleFormDialogProps) => {
  const formRef =
    useRef<HTMLFormElement>(
      null
    );

  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    createSchedule,
    null
  );

  /*
   * Prevent selecting dates
   * before today.
   */
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  /* =========================================================
     SERVER ACTION RESULT
  ========================================================= */

  useEffect(() => {
    if (state?.success) {
      toast.success(
        state.message ||
          "Schedules created successfully."
      );

      formRef.current?.reset();

      onSuccess();
      onClose();

      return;
    }

    if (
      state?.message &&
      !state.success
    ) {
      toast.error(
        state.message
      );
    }
  }, [
    state,
    onSuccess,
    onClose,
  ]);

  /* =========================================================
     CLOSE
  ========================================================= */

  const handleClose = () => {
    if (isPending) return;

    formRef.current?.reset();

    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(
        nextOpen
      ) => {
        if (!nextOpen) {
          handleClose();
        }
      }}
    >
      <DialogContent className="max-w-xl overflow-hidden rounded-3xl p-0">

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
                Generate Schedules
              </DialogTitle>

              <DialogDescription className="mt-1 leading-6">
                Create consultation
                slots for a date range
                and daily time range.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          ref={formRef}
          action={formAction}
        >
          <div className="space-y-6 px-6 py-5">

            {/* Info */}
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-950/60">

              <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

              <p className="text-xs leading-5 text-slate-500">
                Doctori will create
                consultation slots in{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  30-minute intervals
                </span>{" "}
                between the selected
                start and end times.
              </p>
            </div>

            {/* Dates */}
            <div className="grid gap-5 sm:grid-cols-2">

              <Field>
                <FieldLabel
                  htmlFor="startDate"
                  className="text-sm font-semibold"
                >
                  Start Date
                </FieldLabel>

                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  min={today}
                  defaultValue={
                    state?.formData
                      ?.startDate || ""
                  }
                  required
                  disabled={
                    isPending
                  }
                  className="mt-2 h-11 rounded-xl"
                />

                <InputFieldError
                  field="startDate"
                  state={state}
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="endDate"
                  className="text-sm font-semibold"
                >
                  End Date
                </FieldLabel>

                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  min={today}
                  defaultValue={
                    state?.formData
                      ?.endDate || ""
                  }
                  required
                  disabled={
                    isPending
                  }
                  className="mt-2 h-11 rounded-xl"
                />

                <InputFieldError
                  field="endDate"
                  state={state}
                />
              </Field>
            </div>

            {/* Times */}
            <div className="grid gap-5 sm:grid-cols-2">

              <Field>
                <FieldLabel
                  htmlFor="startTime"
                  className="text-sm font-semibold"
                >
                  Start Time
                </FieldLabel>

                <div className="relative mt-2">

                  <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    defaultValue={
                      state?.formData
                        ?.startTime || ""
                    }
                    required
                    disabled={
                      isPending
                    }
                    className="h-11 rounded-xl pl-10"
                  />
                </div>

                <InputFieldError
                  field="startTime"
                  state={state}
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="endTime"
                  className="text-sm font-semibold"
                >
                  End Time
                </FieldLabel>

                <div className="relative mt-2">

                  <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    defaultValue={
                      state?.formData
                        ?.endTime || ""
                    }
                    required
                    disabled={
                      isPending
                    }
                    className="h-11 rounded-xl pl-10"
                  />
                </div>

                <InputFieldError
                  field="endTime"
                  state={state}
                />
              </Field>
            </div>
          </div>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <DialogFooter className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/40">

            <Button
              type="button"
              variant="outline"
              onClick={
                handleClose
              }
              disabled={
                isPending
              }
              className="h-10 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isPending
              }
              className="h-10 min-w-[165px] rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                  Generating...
                </>
              ) : (
                <>
                  <CalendarDays className="mr-2 h-4 w-4" />

                  Generate Schedules
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleFormDialog;