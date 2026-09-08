"use client";

import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeAppointmentStatus } from "@/services/admin/appoitmentsManagement";
import {
  AppointmentStatus,
  IAppointment,
} from "@/types/appointments.interface";
import {
  ArrowRight,
  CalendarClock,
  Loader2,
  UserRound,
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface ChangeAppointmentStatusDialogProps {
  open: boolean;
  onClose: () => void;
  appointment: IAppointment | null;
  onSuccess: () => void;
}

const ChangeAppointmentStatusDialog = ({
  open,
  onClose,
  appointment,
  onSuccess,
}: ChangeAppointmentStatusDialogProps) => {
  const [selectedStatus, setSelectedStatus] =
    useState<AppointmentStatus>(AppointmentStatus.SCHEDULED);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (open && appointment) {
      setSelectedStatus(appointment.status);
    }
  }, [open, appointment]);

  if (!appointment) return null;

  const hasChanged = selectedStatus !== appointment.status;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasChanged) return;

    startTransition(async () => {
      const result = await changeAppointmentStatus(
        appointment.id!,
        selectedStatus
      );

      if (result?.success) {
        toast.success("Appointment status updated successfully");
        onSuccess();
      } else {
        toast.error(result?.message || "Failed to update status");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <CalendarClock className="h-5 w-5 text-primary" />
          </div>

          <DialogTitle className="pt-2">
            Change Appointment Status
          </DialogTitle>

          <DialogDescription>
            Select the new status for this appointment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 py-4">
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <UserRound className="h-4 w-4 text-muted-foreground" />
                Appointment
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Patient</p>
                  <p className="mt-1 text-sm font-medium">
                    {appointment.patient?.name || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Doctor</p>
                  <p className="mt-1 text-sm font-medium">
                    {appointment.doctor?.name || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Appointment Status
              </label>

              <Select
                value={selectedStatus}
                onValueChange={(value) =>
                  setSelectedStatus(value as AppointmentStatus)
                }
                disabled={isPending}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select appointment status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={AppointmentStatus.SCHEDULED}>
                    Scheduled
                  </SelectItem>

                  <SelectItem value={AppointmentStatus.INPROGRESS}>
                    In Progress
                  </SelectItem>

                  <SelectItem value={AppointmentStatus.COMPLETED}>
                    Completed
                  </SelectItem>

                  <SelectItem value={AppointmentStatus.CANCELED}>
                    Canceled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2.5">
              <Badge variant="outline">{appointment.status}</Badge>

              <ArrowRight className="h-4 w-4 text-muted-foreground" />

              <Badge variant="secondary">{selectedStatus}</Badge>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending || !hasChanged}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAppointmentStatusDialog;