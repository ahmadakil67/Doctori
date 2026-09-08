"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  formatDateTime,
  getInitials,
} from "@/lib/formatters";

import { IPatient } from "@/types/patient.interface";

import {
  Activity,
  CalendarDays,
  Droplet,
  FileText,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  patient: IPatient | null;
}

const PatientViewDetailDialog = ({
  open,
  onClose,
  patient,
}: Props) => {
  if (!patient) {
    return null;
  }

  const healthData =
    patient.patientHealthData;

  const formatEnum = (
    value?: string | null
  ) => {
    if (!value) return null;

    return value
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  const formatDateOnly = (
    value?: string | Date | null
  ) => {
    if (!value) {
      return "Not provided";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "Not provided";
    }

    return date.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(
        nextOpen
      ) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="flex max-h-[92vh] max-w-4xl flex-col overflow-hidden rounded-3xl p-0">

        <DialogHeader className="border-b border-slate-100 px-6 py-5 dark:border-slate-800">
          <DialogTitle>
            Patient Profile
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">

          {/* =====================================
              HERO
          ===================================== */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-7 text-white">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <Avatar className="h-24 w-24 border-4 border-white/30 shadow-lg">

                <AvatarImage
                  src={
                    patient.profilePhoto ||
                    ""
                  }
                  alt={
                    patient.name
                  }
                  className="object-cover"
                />

                <AvatarFallback className="bg-white text-xl font-bold text-blue-700">
                  {getInitials(
                    patient.name
                  )}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">

                <h2 className="text-2xl font-bold sm:text-3xl">
                  {patient.name}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-sm text-blue-100">
                  <Mail className="h-4 w-4" />
                  {patient.email}
                </div>

                <div className="mt-3">
                  <Badge className="bg-white/15 text-white hover:bg-white/15">
                    {patient.isDeleted
                      ? "Inactive"
                      : "Active"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 p-6">

            {/* =====================================
                CONTACT
            ===================================== */}

            <Section
              icon={Phone}
              title="Contact Information"
            >
              <InfoGrid>
                <InfoItem
                  icon={Phone}
                  label="Contact Number"
                  value={
                    patient.contactNumber
                  }
                />

                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={
                    patient.email
                  }
                />

                <InfoItem
                  icon={MapPin}
                  label="Address"
                  value={
                    patient.address
                  }
                />
              </InfoGrid>
            </Section>

            {/* =====================================
                HEALTH
            ===================================== */}

            {healthData && (
              <Section
                icon={HeartPulse}
                title="Health Information"
              >
                <InfoGrid>
                  <InfoItem
                    icon={UserRound}
                    label="Gender"
                    value={
                      formatEnum(
                        healthData.gender
                      )
                    }
                  />

                  <InfoItem
                    icon={CalendarDays}
                    label="Date of Birth"
                    value={
                      formatDateOnly(
                        healthData.dateOfBirth
                      )
                    }
                  />

                  <InfoItem
                    icon={Droplet}
                    label="Blood Group"
                    value={
                      formatEnum(
                        healthData.bloodGroup
                      )
                    }
                  />

                  <InfoItem
                    icon={Activity}
                    label="Height"
                    value={
                      healthData.height
                    }
                  />

                  <InfoItem
                    icon={Activity}
                    label="Weight"
                    value={
                      healthData.weight
                    }
                  />

                  <InfoItem
                    icon={HeartPulse}
                    label="Marital Status"
                    value={
                      formatEnum(
                        healthData.maritalStatus
                      )
                    }
                  />

                  {healthData.smokingStatus && (
                    <InfoItem
                      icon={
                        HeartPulse
                      }
                      label="Smoking Status"
                      value={
                        typeof healthData.smokingStatus ===
                        "string"
                          ? formatEnum(
                              healthData.smokingStatus
                            )
                          : healthData.smokingStatus
                            ? "Reported"
                            : "Not reported"
                      }
                    />
                  )}
                </InfoGrid>

                {/* Health flags */}
                <div className="mt-4">

                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Reported Health Information
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {healthData.hasAllergies && (
                      <HealthBadge>
                        Allergies
                      </HealthBadge>
                    )}

                    {healthData.hasDiabetes && (
                      <HealthBadge>
                        Diabetes
                      </HealthBadge>
                    )}

                    {healthData.hasPastSurgeries && (
                      <HealthBadge>
                        Past Surgeries
                      </HealthBadge>
                    )}

                    {healthData.recentAnxiety && (
                      <HealthBadge>
                        Recent Anxiety
                      </HealthBadge>
                    )}

                    {healthData.recentDepression && (
                      <HealthBadge>
                        Recent Depression
                      </HealthBadge>
                    )}

                    {!healthData.hasAllergies &&
                      !healthData.hasDiabetes &&
                      !healthData.hasPastSurgeries &&
                      !healthData.recentAnxiety &&
                      !healthData.recentDepression && (
                        <p className="text-sm text-slate-400">
                          No additional health flags reported.
                        </p>
                      )}
                  </div>
                </div>
              </Section>
            )}

            {/* =====================================
                REPORTS
            ===================================== */}

            {patient.medicalReport &&
              patient.medicalReport
                .length > 0 && (
                <Section
                  icon={
                    FileText
                  }
                  title="Medical Reports"
                >
                  <div className="space-y-2">

                    {patient.medicalReport.map(
                      (report) => (
                        <div
                          key={
                            report.id
                          }
                          className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-950/50"
                        >
                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 dark:bg-slate-900">
                              <FileText className="h-4 w-4" />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                {
                                  report.reportName
                                }
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {formatDateTime(
                                  report.createdAt
                                )}
                              </p>
                            </div>
                          </div>

                          <a
                            href={
                              report.reportLink
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-blue-600 hover:underline"
                          >
                            View Report
                          </a>
                        </div>
                      )
                    )}
                  </div>
                </Section>
              )}

            {/* =====================================
                ACCOUNT
            ===================================== */}

            <Section
              icon={
                UserRound
              }
              title="Account Information"
            >
              <InfoGrid>
                <InfoItem
                  icon={
                    CalendarDays
                  }
                  label="Joined"
                  value={
                    patient.createdAt
                      ? formatDateTime(
                          patient.createdAt
                        )
                      : null
                  }
                />

                <InfoItem
                  icon={
                    CalendarDays
                  }
                  label="Last Updated"
                  value={
                    patient.updatedAt
                      ? formatDateTime(
                          patient.updatedAt
                        )
                      : null
                  }
                />
              </InfoGrid>
            </Section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientViewDetailDialog;

/* =========================================================
   HELPERS
========================================================= */

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40">
          <Icon className="h-4 w-4" />
        </div>

        <h3 className="font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

function InfoGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {children}
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?:
    | string
    | number
    | null;
}) {
  return (
    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/50">

      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-slate-200">
          {value === null ||
          value === undefined ||
          value === ""
            ? "Not provided"
            : value}
        </p>
      </div>
    </div>
  );
}

function HealthBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Badge
      variant="outline"
      className="rounded-full bg-slate-50 px-3 py-1.5 text-xs dark:bg-slate-950"
    >
      {children}
    </Badge>
  );
}