import { getMyAppointments } from "@/services/patient/myAppointments";
import { CalendarDays, Clock, User, CreditCard } from "lucide-react";
import { format } from "date-fns";
import AppointmentStatusSelect from "@/components/modules/Doctor/AppointmentStatusSelect";

type Appointment = {
  id: string;
  status: "SCHEDULED" | "INPROGRESS" | "COMPLETED" | "CANCEL";
  paymentStatus: "PAID" | "UNPAID";

  patient?: {
    id: string;
    name: string;
    email: string;
    contactNumber?: string;
    profilePhoto?: string | null;
  };

  schedule?: {
    id: string;
    startDateTime: string;
    endDateTime: string;
  };

  payment?: {
    amount: number;
    status: "PAID" | "UNPAID";
  } | null;
};

const statusClass = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "INPROGRESS":
      return "bg-blue-100 text-blue-700";

    case "CANCEL":
      return "bg-red-100 text-red-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const DoctorAppointmentsPage = async () => {
  const result = await getMyAppointments();

  const appointments: Appointment[] = result.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Appointments</h1>

        <p className="text-sm text-muted-foreground mt-1">
          View and manage patient appointments
        </p>
      </div>

      {/* Error */}
      {!result.success && (
        <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg p-4">
          {result.message}
        </div>
      )}

      {/* Empty */}
      {result.success && appointments.length === 0 && (
        <div className="border rounded-xl p-12 text-center">
          <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-3" />

          <h2 className="font-medium">No appointments found</h2>

          <p className="text-sm text-muted-foreground mt-1">
            Patient appointments will appear here.
          </p>
        </div>
      )}

      {/* Appointments */}
      <div className="grid gap-4">
        {appointments.map((appointment) => {
          const startTime = appointment.schedule?.startDateTime
            ? new Date(appointment.schedule.startDateTime)
            : null;

          const endTime = appointment.schedule?.endDateTime
            ? new Date(appointment.schedule.endDateTime)
            : null;

          return (
            <div key={appointment.id} className="border rounded-xl p-5">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Patient */}
                <div className="flex items-center gap-3">
                  {appointment.patient?.profilePhoto ? (
                    <img
                      src={appointment.patient.profilePhoto}
                      alt={appointment.patient.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  )}

                  <div>
                    <h2 className="font-semibold">
                      {appointment.patient?.name || "Unknown Patient"}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {appointment.patient?.email}
                    </p>

                    {appointment.patient?.contactNumber && (
                      <p className="text-sm text-muted-foreground">
                        {appointment.patient.contactNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4" />

                    {startTime
                      ? format(startTime, "EEEE, MMMM d, yyyy")
                      : "Date unavailable"}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />

                    {startTime ? format(startTime, "h:mm a") : "N/A"}

                    {endTime && ` - ${format(endTime, "h:mm a")}`}
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />

                    <span>BDT {appointment.payment?.amount ?? 0}</span>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusClass(
                        appointment.status,
                      )}`}
                    >
                      {appointment.status}
                    </span>
                    <AppointmentStatusSelect
                      appointmentId={appointment.id}
                      currentStatus={appointment.status}
                    />

                    <span
                      className={
                        appointment.paymentStatus === "PAID"
                          ? "text-xs px-3 py-1 rounded-full bg-green-100 text-green-700"
                          : "text-xs px-3 py-1 rounded-full bg-red-100 text-red-700"
                      }
                    >
                      {appointment.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t mt-4 pt-3">
                <p className="text-xs text-muted-foreground">
                  Appointment ID: {appointment.id}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorAppointmentsPage;
