"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
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

  const [appointmentId, setAppointmentId] = useState("");
  const [instructions, setInstructions] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const selectedAppointment = appointments.find(
    (appointment) => appointment.id === appointmentId
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!appointmentId) {
      setErrorMessage("Please select an appointment.");
      return;
    }

    if (!instructions.trim()) {
      setErrorMessage(
        "Please enter prescription instructions."
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      const result = await createPrescription({
        appointmentId,
        instructions: instructions.trim(),
        followUpDate: followUpDate || undefined,
      });

      if (!result.success) {
        setErrorMessage(result.message);
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
      console.error(error);

      setErrorMessage(
        "Something went wrong while creating the prescription."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-xl p-6 max-w-3xl">
      <h2 className="text-xl font-semibold">
        Create Prescription
      </h2>

      <p className="text-sm text-muted-foreground mt-1 mb-6">
        Select a completed appointment and provide the
        prescription instructions.
      </p>

      {appointments.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <p className="font-medium">
            No eligible appointments
          </p>

          <p className="text-sm text-muted-foreground mt-1">
            Only completed and paid appointments without an
            existing prescription are shown here.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Appointment */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Appointment
            </label>

            <select
              value={appointmentId}
              onChange={(e) => {
                setAppointmentId(e.target.value);
                setErrorMessage("");
              }}
              className="w-full border rounded-md px-3 py-2 bg-background"
            >
              <option value="">
                Select an appointment
              </option>

              {appointments.map((appointment) => {
                const date =
                  appointment.schedule?.startDateTime
                    ? new Date(
                        appointment.schedule.startDateTime
                      )
                    : null;

                return (
                  <option
                    key={appointment.id}
                    value={appointment.id}
                  >
                    {appointment.patient?.name ||
                      "Unknown Patient"}
                    {date
                      ? ` — ${format(
                          date,
                          "MMM d, yyyy h:mm a"
                        )}`
                      : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Selected Patient */}

          {selectedAppointment && (
            <div className="rounded-lg bg-muted p-4">
              <p className="font-medium">
                {selectedAppointment.patient?.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {selectedAppointment.patient?.email}
              </p>

              {selectedAppointment.schedule
                ?.startDateTime && (
                <p className="text-sm mt-2">
                  Appointment:{" "}
                  {format(
                    new Date(
                      selectedAppointment.schedule
                        .startDateTime
                    ),
                    "EEEE, MMMM d, yyyy • h:mm a"
                  )}
                </p>
              )}
            </div>
          )}

          {/* Instructions */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Prescription Instructions
            </label>

            <textarea
              value={instructions}
              onChange={(e) =>
                setInstructions(e.target.value)
              }
              rows={7}
              placeholder={`Example:

Paracetamol 500 mg
Take 1 tablet twice daily after meals for 3 days.

Drink plenty of water and rest.`}
              className="w-full border rounded-md px-3 py-2 bg-background resize-none"
            />
          </div>

          {/* Follow Up */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Follow-up Date
              <span className="text-muted-foreground font-normal">
                {" "}
                (Optional)
              </span>
            </label>

            <input
              type="date"
              value={followUpDate}
              onChange={(e) =>
                setFollowUpDate(e.target.value)
              }
              className="w-full border rounded-md px-3 py-2 bg-background"
            />
          </div>

          {/* Messages */}

          {errorMessage && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating..."
              : "Create Prescription"}
          </Button>
        </form>
      )}
    </div>
  );
}