"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowUpRight,
  Banknote,
  CalendarDays,
  Clock3,
  MapPin,
  Star,
  Stethoscope,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getInitials } from "@/lib/formatters";
import { IDoctor } from "@/types/doctor.interface";

import BookAppointmentDialog from "./BookAppointmentDialog";

interface DoctorCardProps {
  doctor: IDoctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const profilePhoto =
    typeof doctor.profilePhoto === "string"
      ? doctor.profilePhoto
      : "";

  // Backend relation name is "specialities"
  const specialtyTitles =
    doctor.doctorSpecialties
      ?.map((item) => item.specialities?.title)
      .filter((title): title is string => Boolean(title)) || [];

  const primarySpecialty = specialtyTitles[0];

  // Doctor list API includes review ratings.
  // Use averageRating if available, otherwise calculate from reviews.
  const reviewRatings =
    doctor.reviews
      ?.map((review) => review.rating)
      .filter((rating) => typeof rating === "number") || [];

  const calculatedRating =
    reviewRatings.length > 0
      ? reviewRatings.reduce((sum, rating) => sum + rating, 0) /
        reviewRatings.length
      : null;

  const rating =
    doctor.averageRating ?? calculatedRating;

  const availableSlots =
    doctor.doctorSchedules?.length || 0;

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900">

        {/* ============================
            DOCTOR HEADER
        ============================ */}
        <div className="p-6 pb-5">
          <div className="flex items-start gap-4">

            <Avatar className="h-20 w-20 shrink-0 border-2 border-white shadow-md ring-1 ring-slate-100 dark:border-slate-900 dark:ring-slate-800">
              <AvatarImage
                src={profilePhoto}
                alt={`Dr. ${doctor.name}`}
                className="object-cover"
              />

              <AvatarFallback className="bg-blue-50 text-lg font-bold text-blue-600 dark:bg-blue-950/50">
                {getInitials(doctor.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              {primarySpecialty && (
                <Badge className="mb-2 border-0 bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300">
                  <Stethoscope className="mr-1 h-3 w-3" />
                  {primarySpecialty}
                </Badge>
              )}

              <h3 className="line-clamp-1 text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                Dr. {doctor.name}
              </h3>

              <p className="mt-1 line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                {doctor.designation}
              </p>

              {/* Rating */}
              <div className="mt-2.5 flex items-center gap-2">
                {rating !== null ? (
                  <>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {rating.toFixed(1)}
                      </span>
                    </div>

                    {reviewRatings.length > 0 && (
                      <span className="text-xs text-slate-400">
                        ({reviewRatings.length}{" "}
                        {reviewRatings.length === 1
                          ? "review"
                          : "reviews"})
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-slate-400">
                    No reviews yet
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ============================
              IMPORTANT INFORMATION
          ============================ */}
          <div className="mt-6 grid grid-cols-2 gap-3">

            <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-950/60">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock3 className="h-4 w-4" />

                <span className="text-xs font-medium">
                  Experience
                </span>
              </div>

              <p className="mt-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {doctor.experience
                  ? `${doctor.experience} years`
                  : "Not specified"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-950/60">
              <div className="flex items-center gap-2 text-slate-400">
                <Banknote className="h-4 w-4" />

                <span className="text-xs font-medium">
                  Consultation
                </span>
              </div>

              <p className="mt-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                ${doctor.appointmentFee}
              </p>
            </div>
          </div>

          {/* Availability */}
          <div
            className={`mt-3 flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm ${
              availableSlots > 0
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                : "bg-slate-50 text-slate-500 dark:bg-slate-950/60 dark:text-slate-400"
            }`}
          >
            <CalendarDays className="h-4 w-4 shrink-0" />

            {availableSlots > 0 ? (
              <span className="font-medium">
                {availableSlots} available{" "}
                {availableSlots === 1 ? "slot" : "slots"}
              </span>
            ) : (
              <span>No available slots right now</span>
            )}
          </div>

          {/* Workplace */}
          {doctor.currentWorkingPlace && (
            <div className="mt-4 flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

              <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {doctor.currentWorkingPlace}
              </p>
            </div>
          )}

          {/* Qualification */}
          {doctor.qualification && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Qualification
              </p>

              <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {doctor.qualification}
              </p>
            </div>
          )}

          {/* More Specialties */}
          {specialtyTitles.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {specialtyTitles.slice(1, 3).map((specialty) => (
                <Badge
                  key={specialty}
                  variant="outline"
                  className="rounded-lg text-xs font-medium"
                >
                  {specialty}
                </Badge>
              ))}

              {specialtyTitles.length > 3 && (
                <Badge
                  variant="outline"
                  className="rounded-lg text-xs font-medium text-slate-500"
                >
                  +{specialtyTitles.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* ============================
            ACTIONS
        ============================ */}
        <div className="mt-auto border-t border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/30">
          <div className="grid grid-cols-2 gap-2.5">

            <Button
              variant="outline"
              className="h-11 rounded-xl bg-white font-semibold dark:bg-slate-900"
              asChild
            >
              <Link href={`/consultation/doctor/${doctor.id}`}>
                View Profile
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>

            <Button
              onClick={() => setShowScheduleModal(true)}
              disabled={availableSlots === 0}
              className="h-11 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
            >
              <CalendarDays className="mr-1.5 h-4 w-4" />

              Book
            </Button>
          </div>
        </div>
      </article>

      <BookAppointmentDialog
        doctor={doctor}
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </>
  );
}