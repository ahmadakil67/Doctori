"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { createAppointment } from "@/services/patient/appointment.services";

import { IDoctor } from "@/types/doctor.interface";
import { IDoctorSchedule } from "@/types/schedule.interface";

import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { useState } from "react";

interface BookAppointmentDialogProps {
  doctor: IDoctor;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookAppointmentDialog({
  doctor,
  isOpen,
  onClose,
}: BookAppointmentDialogProps) {
  const doctorSchedules = doctor.doctorSchedules || [];

  const [selectedSchedule, setSelectedSchedule] =
    useState<IDoctorSchedule | null>(null);

  const [isBooking, setIsBooking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // --------------------------------------------------
  // CLOSE MODAL
  // --------------------------------------------------

  const handleCloseModal = () => {
    if (isBooking) return;

    setSelectedSchedule(null);
    setErrorMessage("");
    onClose();
  };

  // --------------------------------------------------
  // BOOK APPOINTMENT
  // --------------------------------------------------

  const handleBookAppointment = async () => {
    if (!selectedSchedule) {
      setErrorMessage("Please select a schedule.");
      return;
    }

    try {
      setIsBooking(true);
      setErrorMessage("");

      const result = await createAppointment(
        doctor.id,
        selectedSchedule.scheduleId
      );

      console.log("Appointment result:", result);

      if (!result?.success) {
        setErrorMessage(
          result?.message || "Failed to book appointment."
        );
        return;
      }

      const paymentUrl = result?.data?.paymentUrl;

      if (!paymentUrl) {
        setErrorMessage(
          "Appointment created but payment URL was not received."
        );
        return;
      }

      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Appointment booking error:", error);

      setErrorMessage(
        "Something went wrong while booking the appointment."
      );
    } finally {
      setIsBooking(false);
    }
  };

  // --------------------------------------------------
  // GROUP SCHEDULES BY DATE
  // --------------------------------------------------

  const groupSchedulesByDate = () => {
    const grouped: Record<string, IDoctorSchedule[]> = {};

    doctorSchedules.forEach((schedule) => {
      if (!schedule.schedule?.startDateTime) return;

      const startDate = new Date(
        schedule.schedule.startDateTime
      )
        .toISOString()
        .split("T")[0];

      if (!startDate) return;

      if (!grouped[startDate]) {
        grouped[startDate] = [];
      }

      grouped[startDate].push(schedule);
    });

    return Object.entries(grouped).sort(([a], [b]) =>
      a.localeCompare(b)
    );
  };

  const groupedSchedules = groupSchedulesByDate();

  const hasSchedulesWithoutData =
    doctorSchedules.length > 0 &&
    groupedSchedules.length === 0;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleCloseModal();
        }
      }}
    >
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            Book Appointment with Dr. {doctor.name}
          </DialogTitle>

          <DialogDescription>
            Select an available time slot for your consultation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Doctor Info */}
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">
                {doctor.designation}
              </p>

              <p className="text-sm text-muted-foreground">
                Consultation Fee: ${doctor.appointmentFee}
              </p>
            </div>
          </div>

          {/* Schedule Content */}
          {hasSchedulesWithoutData ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />

              <p className="text-muted-foreground">
                Schedule data not available
              </p>

              <p className="text-sm text-muted-foreground mt-1">
                The doctor has {doctorSchedules.length} schedule
                {doctorSchedules.length !== 1 ? "s" : ""}, but
                detailed schedule information is not loaded.
              </p>
            </div>
          ) : groupedSchedules.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />

              <p className="text-muted-foreground">
                No available slots at the moment
              </p>

              <p className="text-sm text-muted-foreground mt-1">
                Please check back later
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {groupedSchedules.map(
                  ([date, dateSchedules]) => (
                    <div key={date}>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />

                        <h4 className="font-medium">
                          {format(
                            new Date(date),
                            "EEEE, MMMM d, yyyy"
                          )}
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {dateSchedules.map((schedule) => {
                          const startTime =
                            schedule.schedule?.startDateTime
                              ? new Date(
                                  schedule.schedule.startDateTime
                                )
                              : null;

                          const isSelected =
                            selectedSchedule?.scheduleId ===
                            schedule.scheduleId;

                          return (
                            <Button
                              key={schedule.scheduleId}
                              type="button"
                              variant={
                                isSelected
                                  ? "default"
                                  : "outline"
                              }
                              className="justify-start h-auto py-2"
                              disabled={isBooking}
                              onClick={() => {
                                setSelectedSchedule(schedule);
                                setErrorMessage("");
                              }}
                            >
                              <Clock className="h-4 w-4 mr-2" />

                              <span className="text-sm">
                                {startTime
                                  ? format(startTime, "h:mm a")
                                  : "N/A"}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            </ScrollArea>
          )}

          {/* Error */}
          {errorMessage && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCloseModal}
            disabled={isBooking}
          >
            Close
          </Button>

          <Button
            type="button"
            onClick={handleBookAppointment}
            disabled={!selectedSchedule || isBooking}
          >
            {isBooking
              ? "Processing..."
              : "Book Appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}