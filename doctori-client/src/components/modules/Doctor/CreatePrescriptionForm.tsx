"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import {
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Mail,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { createPrescription } from "@/services/doctor/prescription.services";

interface Appointment {
  id: string;

  patient?: {
    id: string;
    name: string;
    email: string;
  };

  schedule?: {
    startDateTime: string;
    endDateTime: string;
  };
}

interface Props {
  appointments: Appointment[];
}

export default function CreatePrescriptionForm({
  appointments,
}: Props) {
  const router = useRouter();

  const [appointmentId, setAppointmentId] =
    useState("");

  const [instructions, setInstructions] =
    useState("");

  const [followUpDate, setFollowUpDate] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const selectedAppointment =
    appointments.find(
      (appointment) =>
        appointment.id === appointmentId
    );

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!appointmentId) {
      setErrorMessage(
        "Please select a patient appointment."
      );
      return;
    }

    if (!instructions.trim()) {
      setErrorMessage(
        "Please enter prescription instructions."
      );
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const result =
        await createPrescription({
          appointmentId,
          instructions:
            instructions.trim(),
          followUpDate:
            followUpDate ||
            undefined,
        });

      if (!result?.success) {
        setErrorMessage(
          result?.message ||
            "Failed to create prescription."
        );
        return;
      }

      setSuccessMessage(
        result.message ||
          "Prescription created successfully."
      );

      setAppointmentId("");
      setInstructions("");
      setFollowUpDate("");

      router.refresh();
    } catch (error) {
      console.error(
        "Prescription create error:",
        error
      );

      setErrorMessage(
        "Something went wrong while creating the prescription."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     EMPTY
  ========================================================= */

  if (appointments.length === 0) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 px-6 text-center dark:border-slate-700">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 dark:bg-slate-950">
          <FileText className="h-6 w-6" />
        </div>

        <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
          No eligible consultations
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Completed and paid consultations
          without an existing prescription
          will appear here.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* ==================================================
          APPOINTMENT
      ================================================== */}

      <div className="space-y-2">

        <Label
          htmlFor="appointment"
          className="text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          Patient Consultation
        </Label>

        <select
          id="appointment"
          value={appointmentId}
          disabled={isSubmitting}
          onChange={(e) => {
            setAppointmentId(
              e.target.value
            );

            setErrorMessage("");
            setSuccessMessage("");
          }}
          className="flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">
            Select a completed consultation
          </option>

          {appointments.map(
            (appointment) => {
              const date =
                appointment.schedule
                  ?.startDateTime
                  ? new Date(
                      appointment.schedule.startDateTime
                    )
                  : null;

              return (
                <option
                  key={
                    appointment.id
                  }
                  value={
                    appointment.id
                  }
                >
                  {appointment.patient
                    ?.name ||
                    "Unknown Patient"}

                  {date
                    ? ` — ${format(
                        date,
                        "MMM d, yyyy • h:mm a"
                      )}`
                    : ""}
                </option>
              );
            }
          )}
        </select>

        <p className="text-xs text-slate-400">
          Only completed, paid consultations
          that do not already have a
          prescription are available.
        </p>
      </div>

      {/* ==================================================
          SELECTED PATIENT
      ================================================== */}

      {selectedAppointment && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
            Selected Patient
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Patient */}
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-900">
                <UserRound className="h-5 w-5" />
              </div>

              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  {selectedAppointment
                    .patient?.name ||
                    "Unknown Patient"}
                </p>

                {selectedAppointment
                  .patient?.email && (
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">

                    <Mail className="h-3.5 w-3.5" />

                    {
                      selectedAppointment
                        .patient.email
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Schedule */}
            {selectedAppointment
              .schedule
              ?.startDateTime && (
              <div className="space-y-1.5 text-sm">

                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">

                  <CalendarDays className="h-4 w-4 text-blue-600" />

                  <span className="font-medium">
                    {format(
                      new Date(
                        selectedAppointment.schedule.startDateTime
                      ),
                      "MMM d, yyyy"
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-500">

                  <Clock className="h-4 w-4" />

                  <span>
                    {format(
                      new Date(
                        selectedAppointment.schedule.startDateTime
                      ),
                      "h:mm a"
                    )}

                    {selectedAppointment
                      .schedule
                      .endDateTime &&
                      ` – ${format(
                        new Date(
                          selectedAppointment.schedule.endDateTime
                        ),
                        "h:mm a"
                      )}`}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================
          INSTRUCTIONS
      ================================================== */}

      <div className="space-y-2">

        <div className="flex items-end justify-between gap-3">

          <Label
            htmlFor="instructions"
            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            Prescription Instructions
          </Label>

          <span className="text-xs text-slate-400">
            {instructions.length} characters
          </span>
        </div>

        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => {
            setInstructions(
              e.target.value
            );

            setErrorMessage("");
          }}
          disabled={isSubmitting}
          rows={8}
          placeholder={`Enter the treatment instructions clearly.

For example:
• Medication and dosage
• Frequency and duration
• Usage instructions
• Additional care advice`}
          className="w-full resize-y rounded-2xl border border-input bg-background px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <p className="text-xs leading-5 text-slate-400">
          Provide clear instructions that
          the patient can easily review from
          their prescription page.
        </p>
      </div>

      {/* ==================================================
          FOLLOW-UP
      ================================================== */}

      <div className="max-w-sm space-y-2">

        <Label
          htmlFor="followUpDate"
          className="text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          Follow-up Date{" "}
          <span className="font-normal text-slate-400">
            (Optional)
          </span>
        </Label>

        <div className="relative">

          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            id="followUpDate"
            type="date"
            value={followUpDate}
            disabled={isSubmitting}
            onChange={(e) =>
              setFollowUpDate(
                e.target.value
              )
            }
            className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      {/* ==================================================
          ERROR
      ================================================== */}

      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
        >
          {errorMessage}
        </div>
      )}

      {/* ==================================================
          SUCCESS
      ================================================== */}

      {successMessage && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />

          {successMessage}
        </div>
      )}

      {/* ==================================================
          SUBMIT
      ================================================== */}

      <div className="flex justify-end border-t border-slate-100 pt-5 dark:border-slate-800">

        <Button
          type="submit"
          disabled={
            isSubmitting ||
            !appointmentId ||
            !instructions.trim()
          }
          className="h-11 min-w-[190px] rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />

              Creating...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />

              Create Prescription
            </>
          )}
        </Button>
      </div>
    </form>
  );
}