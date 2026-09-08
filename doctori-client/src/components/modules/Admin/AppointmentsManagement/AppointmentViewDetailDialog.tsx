"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  AppointmentStatus,
  IAppointment,
  PaymentStatus,
} from "@/types/appointments.interface";

import {
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  UserRound,
  Video,
} from "lucide-react";

interface AppointmentViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  appointment: IAppointment | null;
}

const AppointmentViewDetailDialog = ({
  open,
  onClose,
  appointment,
}: AppointmentViewDetailDialogProps) => {
  if (!appointment) return null;

  const startDate = appointment.schedule
    ? new Date(appointment.schedule.startDateTime)
    : null;

  const endDate = appointment.schedule
    ? new Date(appointment.schedule.endDateTime)
    : null;

  const getStatusBadge = () => {
    switch (appointment.status) {
      case AppointmentStatus.SCHEDULED:
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Scheduled
          </Badge>
        );

      case AppointmentStatus.INPROGRESS:
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            In Progress
          </Badge>
        );

      case AppointmentStatus.COMPLETED:
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Completed
          </Badge>
        );

      default:
        return (
          <Badge variant="destructive">
            Canceled
          </Badge>
        );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="max-w-3xl p-0">
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-3 pr-6">
            <div>
              <DialogTitle className="text-xl">
                Appointment Details
              </DialogTitle>

              <DialogDescription className="mt-1">
                Complete information about this appointment
              </DialogDescription>
            </div>

            <div className="flex items-center gap-2">
              {getStatusBadge()}

              {appointment.paymentStatus === PaymentStatus.PAID ? (
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  Paid
                </Badge>
              ) : (
                <Badge variant="outline">Unpaid</Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[72vh]">
          <div className="space-y-5 p-6">
            {/* Patient + Doctor */}
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                icon={<UserRound className="h-4 w-4" />}
                title="Patient"
              >
                <InfoRow
                  label="Name"
                  value={appointment.patient?.name}
                />

                <InfoRow
                  icon={<Mail className="h-3.5 w-3.5" />}
                  label="Email"
                  value={appointment.patient?.email}
                />

                <InfoRow
                  icon={<Phone className="h-3.5 w-3.5" />}
                  label="Phone"
                  value={appointment.patient?.contactNumber}
                />

                <InfoRow
                  icon={<MapPin className="h-3.5 w-3.5" />}
                  label="Address"
                  value={appointment.patient?.address}
                />
              </InfoCard>

              <InfoCard
                icon={<Stethoscope className="h-4 w-4" />}
                title="Doctor"
              >
                <InfoRow
                  label="Name"
                  value={appointment.doctor?.name}
                />

                <InfoRow
                  icon={<Mail className="h-3.5 w-3.5" />}
                  label="Email"
                  value={appointment.doctor?.email}
                />

                <InfoRow
                  icon={<Phone className="h-3.5 w-3.5" />}
                  label="Phone"
                  value={appointment.doctor?.contactNumber}
                />

                <InfoRow
                  label="Designation"
                  value={appointment.doctor?.designation}
                />
              </InfoCard>
            </div>

            {/* Schedule */}
            <InfoCard
              icon={<CalendarDays className="h-4 w-4" />}
              title="Schedule"
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Appointment Date
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {startDate
                      ? startDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" />
                    Start Time
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {startDate
                      ? startDate.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" />
                    End Time
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {endDate
                      ? endDate.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </InfoCard>

            {/* Video Call */}
            <InfoCard
              icon={<Video className="h-4 w-4" />}
              title="Video Consultation"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Video Calling ID
                  </p>

                  <p className="mt-1 font-mono text-sm font-medium">
                    {appointment.videoCallingId || "Not set"}
                  </p>
                </div>

                <Badge variant="outline">
                  {appointment.videoCallingId
                    ? "Available"
                    : "Not available"}
                </Badge>
              </div>
            </InfoCard>

            {/* Timestamps */}
            <div className="grid gap-3 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">
                  Created
                </p>

                <p className="mt-1 text-sm font-medium">
                  {appointment.createdAt
                    ? new Date(
                        appointment.createdAt
                      ).toLocaleString()
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Last Updated
                </p>

                <p className="mt-1 text-sm font-medium">
                  {appointment.updatedAt
                    ? new Date(
                        appointment.updatedAt
                      ).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const InfoCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>

        <h3 className="font-semibold">{title}</h3>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
}) => {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default AppointmentViewDetailDialog;