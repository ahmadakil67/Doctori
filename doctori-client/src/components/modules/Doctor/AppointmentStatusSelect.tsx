"use client";

import { useState } from "react";
import { updateAppointmentStatus } from "@/services/doctor/appointment.services";

interface Props {
  appointmentId: string;
  currentStatus: string;
}

export default function AppointmentStatusSelect({
  appointmentId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = event.target.value;

    setLoading(true);
    setMessage("");

    const previousStatus = status;

    setStatus(newStatus);

    const result = await updateAppointmentStatus(
      appointmentId,
      newStatus
    );

    if (!result.success) {
      setStatus(previousStatus);
      setMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-1">
      <select
        value={status}
        onChange={handleChange}
        disabled={loading}
        className="border rounded-md px-3 py-2 text-sm bg-background"
      >
        <option value="SCHEDULED">
          Scheduled
        </option>

        <option value="INPROGRESS">
          In Progress
        </option>

        <option value="COMPLETED">
          Completed
        </option>

        <option value="CANCEL">
          Cancelled
        </option>
      </select>

      {loading && (
        <p className="text-xs text-muted-foreground">
          Updating...
        </p>
      )}

      {message && (
        <p className="text-xs text-red-600">
          {message}
        </p>
      )}
    </div>
  );
}