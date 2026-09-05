import { getMyPrescriptions } from "@/services/patient/prescription.services";

import {
  CalendarDays,
  Clock,
  FileText,
  Stethoscope,
  CalendarCheck,
} from "lucide-react";

import { format } from "date-fns";

interface Prescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;

  instructions: string;
  followUpDate: string | null;

  createdAt: string;
  updatedAt: string;

  doctor?: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    designation: string;
    qualification: string;
    currentWorkingPlace: string;
    appointmentFee: number;
  };

  appointment?: {
    id: string;
    status:
      | "SCHEDULED"
      | "INPROGRESS"
      | "COMPLETED"
      | "CANCEL";

    paymentStatus: "PAID" | "UNPAID";

    schedule?: {
      id: string;
      startDateTime: string;
      endDateTime: string;
    };
  };
}

const MyPrescriptionsPage = async () => {
  const result = await getMyPrescriptions();

  const prescriptions: Prescription[] =
    result.data || [];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          My Prescriptions
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          View prescriptions and follow-up instructions
          from your doctors
        </p>
      </div>

      {/* Error */}
      {!result.success && (
        <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg p-4">
          {result.message}
        </div>
      )}

      {/* Empty State */}
      {result.success &&
        prescriptions.length === 0 && (
          <div className="border rounded-xl py-16 px-6 text-center">

            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

            <h2 className="font-semibold text-lg">
              No prescriptions yet
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              Prescriptions provided by your doctor
              will appear here.
            </p>
          </div>
        )}

      {/* Prescription List */}
      <div className="grid gap-5">
        {prescriptions.map((prescription) => {

          const startDate =
            prescription.appointment?.schedule
              ?.startDateTime
              ? new Date(
                  prescription.appointment.schedule
                    .startDateTime
                )
              : null;

          const endDate =
            prescription.appointment?.schedule
              ?.endDateTime
              ? new Date(
                  prescription.appointment.schedule
                    .endDateTime
                )
              : null;

          const followUpDate =
            prescription.followUpDate
              ? new Date(prescription.followUpDate)
              : null;

          const createdAt = new Date(
            prescription.createdAt
          );

          return (
            <div
              key={prescription.id}
              className="border rounded-xl bg-background overflow-hidden"
            >

              {/* Top Section */}
              <div className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                  {/* Doctor Info */}
                  <div className="flex items-center gap-4">

                    {prescription.doctor?.profilePhoto ? (
                      <img
                        src={
                          prescription.doctor.profilePhoto
                        }
                        alt={
                          prescription.doctor.name
                        }
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                        <Stethoscope className="h-6 w-6" />
                      </div>
                    )}

                    <div>
                      <h2 className="font-semibold text-lg">
                        Dr.{" "}
                        {prescription.doctor?.name ||
                          "Unknown Doctor"}
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        {prescription.doctor
                          ?.designation || "Doctor"}
                      </p>

                      {prescription.doctor
                        ?.currentWorkingPlace && (
                        <p className="text-sm text-muted-foreground">
                          {
                            prescription.doctor
                              .currentWorkingPlace
                          }
                        </p>
                      )}

                      {prescription.doctor
                        ?.qualification && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {
                            prescription.doctor
                              .qualification
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Appointment Info */}
                  <div className="space-y-2">

                    {startDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />

                        <span>
                          {format(
                            startDate,
                            "EEEE, MMMM d, yyyy"
                          )}
                        </span>
                      </div>
                    )}

                    {startDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />

                        <span>
                          {format(
                            startDate,
                            "h:mm a"
                          )}

                          {endDate &&
                            ` - ${format(
                              endDate,
                              "h:mm a"
                            )}`}
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Prescribed{" "}
                      {format(
                        createdAt,
                        "MMM d, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Prescription Instructions */}
              <div className="border-t p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5" />

                  <h3 className="font-semibold">
                    Prescription Instructions
                  </h3>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm leading-7 whitespace-pre-line">
                    {prescription.instructions}
                  </p>
                </div>
              </div>

              {/* Follow Up */}
              {followUpDate && (
                <div className="border-t px-5 py-4 bg-muted/20">

                  <div className="flex items-center gap-2">

                    <CalendarCheck className="h-4 w-4 text-muted-foreground" />

                    <span className="text-sm font-medium">
                      Follow-up:
                    </span>

                    <span className="text-sm">
                      {format(
                        followUpDate,
                        "EEEE, MMMM d, yyyy"
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="border-t px-5 py-3">

                <p className="text-xs text-muted-foreground">
                  Prescription ID: {prescription.id}
                </p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPrescriptionsPage;