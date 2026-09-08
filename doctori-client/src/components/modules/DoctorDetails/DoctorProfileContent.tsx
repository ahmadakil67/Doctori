"use client";

import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";

import {
  ArrowLeft,
  Award,
  BriefcaseMedical,
  CalendarDays,
  Clock3,
  GraduationCap,
  MapPin,
  ReceiptText,
  ShieldCheck,
  Star,
  Stethoscope,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { IDoctor } from "@/types/doctor.interface";

import BookAppointmentDialog from "@/components/modules/Consultation/BookAppointmentDialog";

interface DoctorProfileContentProps {
  doctor?: IDoctor;
}

export default function DoctorProfileContent({
  doctor,
}: DoctorProfileContentProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <Stethoscope className="h-8 w-8" />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
          Doctor Profile Not Found
        </h2>

        <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          The requested doctor profile could not be loaded or may no longer exist.
        </p>

        <Link
          href="/consultation"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Doctors
        </Link>
      </div>
    );
  }

  const initials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const profilePhoto =
    typeof doctor.profilePhoto === "string"
      ? doctor.profilePhoto
      : undefined;

  const specialties =
    doctor.doctorSpecialties
      ?.map((item) => item.specialities?.title)
      .filter((title): title is string => Boolean(title)) || [];

  const availableSchedules =
    doctor.doctorSchedules
      ?.filter(
        (schedule) =>
          !schedule.isBooked && schedule.schedule?.startDateTime
      )
      .sort((a, b) => {
        const dateA = new Date(
          a.schedule!.startDateTime
        ).getTime();

        const dateB = new Date(
          b.schedule!.startDateTime
        ).getTime();

        return dateA - dateB;
      }) || [];

  const reviewRatings =
    doctor.reviews
      ?.map((review) => review.rating)
      .filter((rating) => typeof rating === "number") || [];

  const calculatedRating =
    reviewRatings.length > 0
      ? reviewRatings.reduce((sum, rating) => sum + rating, 0) /
        reviewRatings.length
      : null;

  const rating = doctor.averageRating ?? calculatedRating;

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">

        {/* Navigation Breadcrumb */}
        <Link
          href="/consultation"
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-xs transition group-hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          </div>

          <span>Back to Doctors</span>
        </Link>

        {/* =========================================
            HEADER PROFILE CARD (CLEAN & NO BIG BANNER)
        ========================================== */}
        <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Avatar + Primary Information */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* Doctor Avatar */}
              <div className="relative shrink-0">
                <Avatar className="h-28 w-28 rounded-2xl border border-slate-200/80 shadow-sm sm:h-32 sm:w-32 dark:border-slate-800">
                  <AvatarImage
                    src={profilePhoto}
                    alt={`Dr. ${doctor.name}`}
                    className="object-cover"
                  />

                  <AvatarFallback className="bg-blue-600 text-3xl font-extrabold text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {availableSchedules.length > 0 && (
                  <span
                    className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"
                    title="Available for booking"
                  />
                )}
              </div>

              {/* Text Info */}
              <div className="space-y-2">

                {/* Specialties Badges */}
                {specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        className="rounded-md border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 shadow-none dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300"
                      >
                        <Stethoscope className="mr-1 h-3 w-3 text-blue-600 dark:text-blue-400" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Doctor Name */}
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                    Dr. {doctor.name}
                  </h1>

                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                </div>

                {/* Designation */}
                {doctor.designation && (
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {doctor.designation}
                  </p>
                )}

                {/* Rating & Availability Status */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">

                  {rating !== null && (
                    <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2.5 py-1 font-medium text-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{rating.toFixed(1)}</span>

                      {reviewRatings.length > 0 && (
                        <span className="text-slate-500 dark:text-slate-400">
                          ({reviewRatings.length})
                        </span>
                      )}
                    </div>
                  )}

                  {availableSchedules.length > 0 ? (
                    <div className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>Available Today</span>
                    </div>
                  ) : (
                    <div className="rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      Fully Booked
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0 pt-2 lg:pt-0">
              <Button
                type="button"
                onClick={() => setShowBookingModal(true)}
                disabled={availableSchedules.length === 0}
                className="h-11 w-full rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-xs transition hover:bg-blue-700 sm:w-auto"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {availableSchedules.length > 0
                  ? "Book Appointment"
                  : "No Available Slots"}
              </Button>
            </div>
          </div>
        </section>

        {/* =========================================
            GRID CONTENT AREA
        ========================================== */}
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* MAIN BODY LEFT */}
          <div className="space-y-6">

            {/* Credentials / Details Box */}
            <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">

              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Verified Information
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  Professional Details
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ModernInfoCard
                  icon={BriefcaseMedical}
                  label="Experience"
                  value={
                    doctor.experience
                      ? `${doctor.experience} Years Practice`
                      : "Not specified"
                  }
                />

                <ModernInfoCard
                  icon={GraduationCap}
                  label="Qualification"
                  value={doctor.qualification || "Not specified"}
                />

                <ModernInfoCard
                  icon={MapPin}
                  label="Working Place"
                  value={doctor.currentWorkingPlace || "Not specified"}
                />

                <ModernInfoCard
                  icon={ReceiptText}
                  label="Registration Number"
                  value={doctor.registrationNumber || "Not specified"}
                />
              </div>
            </section>

            {/* Clinical Focus / Specialties */}
            <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <Stethoscope className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Specialties
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Areas of expertise and specialized care
                  </p>
                </div>
              </div>

              {specialties.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty) => (
                    <div
                      key={specialty}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                      {specialty}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No specialties specified.
                </p>
              )}
            </section>

            {/* Verification Disclaimer Banner */}
            <section className="flex gap-3.5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 dark:border-blue-950/60 dark:bg-blue-950/20">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Verified Medical Practitioner
                </h3>

                <p className="mt-0.5 text-xs text-slate-600 leading-relaxed dark:text-slate-400">
                  Credentials and qualifications have been verified according to Doctori standard verification protocols.
                </p>
              </div>
            </section>
          </div>

          {/* ASIDE RIGHT */}
          <aside className="space-y-6">

            {/* Fee Card */}
            <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">

              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Consultation Fee
              </p>

              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  BDT {doctor.appointmentFee}
                </span>

                <span className="text-xs text-slate-500 dark:text-slate-400">
                  / session
                </span>
              </div>

              <Button
                onClick={() => setShowBookingModal(true)}
                disabled={availableSchedules.length === 0}
                className="mt-5 h-11 w-full rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </section>

            {/* Schedule Showcase */}
            <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">

              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white">
                    Available Slots
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Next open slots for booking
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <Clock3 className="h-4 w-4" />
                </div>
              </div>

              {availableSchedules.length > 0 ? (
                <>
                  <div className="mt-4 space-y-2">
                    {availableSchedules.slice(0, 4).map((doctorSchedule) => {
                      const start = doctorSchedule.schedule?.startDateTime;

                      if (!start) return null;

                      return (
                        <div
                          key={doctorSchedule.scheduleId}
                          className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2.5 dark:border-slate-800/80 dark:bg-slate-950/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400">
                              <CalendarDays className="h-3.5 w-3.5" />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {format(new Date(start), "EEE, MMM d")}
                              </p>

                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                {format(new Date(start), "h:mm a")}
                              </p>
                            </div>
                          </div>

                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </div>
                      );
                    })}
                  </div>

                  {availableSchedules.length > 4 && (
                    <p className="mt-3 text-center text-xs font-medium text-blue-600 dark:text-blue-400">
                      +{availableSchedules.length - 4} more slots available
                    </p>
                  )}
                </>
              ) : (
                <div className="mt-4 rounded-xl bg-slate-50 p-5 text-center dark:bg-slate-950/50">
                  <CalendarDays className="mx-auto h-5 w-5 text-slate-400" />

                  <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    No Open Slots
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                    Please check back later for updated timing.
                  </p>
                </div>
              )}
            </section>

            {/* Experience Box */}
            {doctor.experience && (
              <section className="rounded-2xl bg-slate-900 p-5 text-white shadow-xs dark:bg-slate-950">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                    <Award className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-2xl font-bold tracking-tight">
                      {doctor.experience}+ Years
                    </p>

                    <p className="text-xs text-slate-400">
                      Medical Practice Experience
                    </p>
                  </div>
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>

      {/* Appointment Booking Modal Dialog */}
      <BookAppointmentDialog
        doctor={doctor}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </>
  );
}

/* =========================================================
    INFO CARD SUB-COMPONENT
========================================================= */

function ModernInfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 text-xs font-semibold leading-relaxed text-slate-900 dark:text-slate-100">
          {value}
        </p>
      </div>
    </div>
  );
}