/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { IDoctor } from "@/types/doctor.interface";

import {
  Briefcase,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  User,
  Wallet,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  doctor: IDoctor | null;
}

const DoctorViewDetailDialog = ({
  open,
  onClose,
  doctor,
}: Props) => {
  if (!doctor) {
    return null;
  }

  const specialties =
    (
      (doctor as any)
        .doctorSpecialties ||
      []
    )
      .map(
        (item: any) =>
          item?.specialities
            ?.title ||
          item?.specialties
            ?.title
      )
      .filter(Boolean);

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
            Doctor Profile
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">

          {/* HERO */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-7 text-white">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <Avatar className="h-24 w-24 border-4 border-white/30 shadow-lg">

                <AvatarImage
                  src={
                    doctor.profilePhoto
                  }
                  className="object-cover"
                />

                <AvatarFallback className="bg-white text-xl font-bold text-blue-700">
                  {getInitials(
                    doctor.name
                  )}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">

                <h2 className="text-2xl font-bold sm:text-3xl">
                  {doctor.name}
                </h2>

                <p className="mt-1 text-sm text-blue-100">
                  {doctor.designation ||
                    "Doctor"}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  <Badge className="bg-white/15 text-white hover:bg-white/15">
                    {doctor.isDeleted
                      ? "Inactive"
                      : "Active"}
                  </Badge>

                  {typeof doctor.averageRating ===
                    "number" && (
                    <Badge className="bg-white/15 text-white hover:bg-white/15">

                      <Star className="mr-1 h-3 w-3 fill-amber-300 text-amber-300" />

                      {doctor.averageRating.toFixed(
                        1
                      )}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-7 p-6">

            {/* PROFESSIONAL */}
            <Section
              icon={Stethoscope}
              title="Professional Information"
            >
              <InfoGrid>
                <InfoItem
                  icon={Briefcase}
                  label="Designation"
                  value={
                    doctor.designation
                  }
                />

                <InfoItem
                  icon={
                    GraduationCap
                  }
                  label="Qualification"
                  value={
                    doctor.qualification
                  }
                />

                <InfoItem
                  icon={User}
                  label="Registration Number"
                  value={
                    doctor.registrationNumber
                  }
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Experience"
                  value={
                    doctor.experience !==
                    undefined
                      ? `${doctor.experience} years`
                      : undefined
                  }
                />

                <InfoItem
                  icon={Briefcase}
                  label="Current Working Place"
                  value={
                    doctor.currentWorkingPlace
                  }
                />

                <InfoItem
                  icon={Wallet}
                  label="Appointment Fee"
                  value={`BDT ${(
                    doctor.appointmentFee ??
                    0
                  ).toLocaleString()}`}
                />
              </InfoGrid>
            </Section>

            {/* SPECIALTIES */}
            <Section
              icon={Stethoscope}
              title="Specialties"
            >
              {specialties.length >
              0 ? (
                <div className="flex flex-wrap gap-2">

                  {specialties.map(
                    (
                      title: string,
                      index: number
                    ) => (
                      <Badge
                        key={`${title}-${index}`}
                        variant="outline"
                        className="rounded-full border-blue-100 bg-blue-50 px-3 py-1.5 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400"
                      >
                        {title}
                      </Badge>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  No specialties assigned.
                </p>
              )}
            </Section>

            {/* CONTACT */}
            <Section
              icon={Phone}
              title="Contact Information"
            >
              <InfoGrid>
                <InfoItem
                  icon={Phone}
                  label="Contact Number"
                  value={
                    doctor.contactNumber
                  }
                />

                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={
                    doctor.email
                  }
                />

                <InfoItem
                  icon={MapPin}
                  label="Address"
                  value={
                    doctor.address
                  }
                />
              </InfoGrid>
            </Section>

            {/* ACCOUNT */}
            <Section
              icon={User}
              title="Account Information"
            >
              <InfoGrid>
                <InfoItem
                  icon={User}
                  label="Gender"
                  value={
                    doctor.gender
                      ? doctor.gender
                          .charAt(0) +
                        doctor.gender
                          .slice(1)
                          .toLowerCase()
                      : undefined
                  }
                />

                <InfoItem
                  icon={
                    CalendarDays
                  }
                  label="Joined"
                  value={
                    doctor.createdAt
                      ? formatDateTime(
                          doctor.createdAt
                        )
                      : undefined
                  }
                />

                <InfoItem
                  icon={
                    CalendarDays
                  }
                  label="Last Updated"
                  value={
                    doctor.updatedAt
                      ? formatDateTime(
                          doctor.updatedAt
                        )
                      : undefined
                  }
                />

                <InfoItem
                  icon={Star}
                  label="Average Rating"
                  value={
                    typeof doctor.averageRating ===
                    "number"
                      ? `${doctor.averageRating.toFixed(
                          1
                        )} / 5.0`
                      : "No ratings yet"
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

export default DoctorViewDetailDialog;

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
  value?: string | number | null;
}) {
  return (
    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/50">

      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-slate-200">
          {value ||
            "Not provided"}
        </p>
      </div>
    </div>
  );
}