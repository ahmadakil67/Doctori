"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user.interface";

import {
  Camera,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface MyProfileProps {
  userInfo: UserInfo;
}

const MyProfile = ({
  userInfo,
}: MyProfileProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [previewImage, setPreviewImage] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  /* =========================================================
     ROLE BASED PROFILE DATA
  ========================================================= */

  const getProfileData = () => {
    switch (userInfo.role) {
      case "ADMIN":
        return userInfo.admin;

      case "DOCTOR":
        return userInfo.doctor;

      case "PATIENT":
        return userInfo.patient;

      default:
        return null;
    }
  };

  const profileData = getProfileData();

  const profilePhoto =
    profileData?.profilePhoto || null;

  const initialName =
    profileData?.name ||
    userInfo.name ||
    "User";

  /*
   * Controlled name state.
   *
   * This means when the user types "Koli Begum",
   * the profile card also shows "Koli Begum"
   * immediately instead of continuing to show "Koli".
   */
  const [name, setName] =
    useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const displayName =
    name.trim() || initialName;

  const roleLabel =
    userInfo.role
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );

  /*
   * contactNumber should NOT be submitted
   * for PATIENT from this form.
   *
   * Doctor/Admin may still use it.
   */
  const existingContactNumber =
    (
      profileData as
        | {
            contactNumber?: string | null;
          }
        | null
        | undefined
    )?.contactNumber || "";

  /* =========================================================
     IMAGE CHANGE
  ========================================================= */

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    setSuccess(null);

    const file =
      e.target.files?.[0];

    if (!file) return;

    /* Only image files */
    if (
      !file.type.startsWith("image/")
    ) {
      setError(
        "Please select a valid image file."
      );

      e.target.value = "";
      return;
    }

    /* Max 5 MB */
    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Profile picture must be smaller than 5 MB."
      );

      e.target.value = "";
      return;
    }

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setPreviewImage(
        reader.result as string
      );
    };

    reader.readAsDataURL(file);
  };

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting) return;

    setError(null);
    setSuccess(null);

    const formData =
      new FormData(
        e.currentTarget
      );

    /* -------------------------------
       Clean text values
    -------------------------------- */

    const textFields = [
      "name",
      "contactNumber",
      "address",
      "registrationNumber",
      "qualification",
      "currentWorkingPlace",
      "designation",
    ];

    textFields.forEach((field) => {
      const value =
        formData.get(field);

      if (
        typeof value === "string"
      ) {
        formData.set(
          field,
          value.trim()
        );
      }
    });

    /* -------------------------------
       Validate name
    -------------------------------- */

    const submittedName =
      formData.get("name");

    if (
      typeof submittedName !==
        "string" ||
      !submittedName.trim()
    ) {
      setError(
        "Full name is required."
      );
      return;
    }

    /*
     * IMPORTANT:
     * Patient profile should not send
     * contactNumber.
     */
    if (
      userInfo.role === "PATIENT"
    ) {
      formData.delete(
        "contactNumber"
      );
    }

    /*
     * If no profile image was selected,
     * don't send an empty file.
     */
    const selectedFile =
      formData.get("file");

    if (
      selectedFile instanceof File &&
      selectedFile.size === 0
    ) {
      formData.delete("file");
    }

    try {
      setIsSubmitting(true);

      const result =
        await updateMyProfile(
          formData
        );

      if (result?.success) {
        setSuccess(
          result.message ||
            "Profile updated successfully."
        );

        /*
         * Refresh server components so
         * sidebar/navbar/profile receive
         * the latest database information.
         */
        router.refresh();
      } else {
        setError(
          result?.message ||
            "Unable to update profile."
        );
      }
    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      setError(
        "Something went wrong while updating your profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your personal
          information and profile
          details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="grid gap-6 xl:grid-cols-[340px_1fr]">

          {/* ==================================================
              PROFILE SUMMARY
          ================================================== */}

          <aside className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

            {/* Decorative Header */}
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600" />

            <div className="-mt-14 px-6 pb-7 text-center">

              {/* Avatar */}
              <div className="relative mx-auto w-fit">

                <Avatar className="h-28 w-28 border-4 border-white shadow-lg dark:border-slate-900">

                  <AvatarImage
                    src={
                      previewImage ||
                      profilePhoto ||
                      undefined
                    }
                    alt={displayName}
                    className="object-cover"
                  />

                  <AvatarFallback className="bg-blue-50 text-2xl font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    {getInitials(
                      displayName
                    )}
                  </AvatarFallback>
                </Avatar>

                {/* Image Upload */}
                <label
                  htmlFor="file"
                  title="Change profile picture"
                  className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-slate-950 text-white shadow-md transition hover:bg-blue-600 dark:border-slate-900"
                >
                  <Camera className="h-4 w-4" />

                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={
                      handleImageChange
                    }
                    disabled={
                      isSubmitting
                    }
                  />
                </label>
              </div>

              {/* Name */}
              <h2 className="mt-5 break-words text-xl font-bold text-slate-950 dark:text-white">
                {displayName}
              </h2>

              {/* Email */}
              <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500">
                <Mail className="h-4 w-4 shrink-0" />

                <span className="break-all">
                  {userInfo.email}
                </span>
              </div>

              {/* Role */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">

                <ShieldCheck className="h-3.5 w-3.5" />

                {roleLabel}
              </div>

              {/* Info */}
              <div className="mt-6 border-t border-slate-100 pt-5 text-left dark:border-slate-800">

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 dark:bg-slate-950">

                    <UserRound className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Profile information
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Keep your details
                      accurate so Doctori
                      can provide a better
                      account experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ==================================================
              FORM
          ================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 dark:border-slate-800 dark:bg-slate-900">

            {/* Form Header */}
            <div className="border-b border-slate-100 pb-5 dark:border-slate-800">

              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your account
                details below.
              </p>
            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
              >
                {error}
              </div>
            )}

            {/* ==================================================
                SUCCESS
            ================================================== */}

            {success && (
              <div
                role="status"
                className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />

                {success}
              </div>
            )}

            {/* ==================================================
                COMMON FIELDS
            ================================================== */}

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* Full Name */}
              <FormField
                label="Full Name"
                htmlFor="name"
              >
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  required
                  disabled={
                    isSubmitting
                  }
                  className="h-11 rounded-xl"
                />
              </FormField>

              {/* Email */}
              <FormField
                label="Email Address"
                htmlFor="email"
              >
                <div className="relative">

                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="email"
                    type="email"
                    value={
                      userInfo.email
                    }
                    disabled
                    readOnly
                    className="h-11 rounded-xl bg-slate-50 pl-10 dark:bg-slate-950"
                  />
                </div>

                <p className="text-xs text-slate-400">
                  Email cannot be
                  changed here.
                </p>
              </FormField>

              {/* ==================================================
                  PATIENT FIELDS
              ================================================== */}

              {userInfo.role ===
                "PATIENT" &&
                userInfo.patient && (
                  <>
                    <FormField
                      label="Address"
                      htmlFor="address"
                      className="md:col-span-2"
                    >
                      <Input
                        id="address"
                        name="address"
                        defaultValue={
                          userInfo
                            .patient
                            .address ||
                          ""
                        }
                        disabled={
                          isSubmitting
                        }
                        className="h-11 rounded-xl"
                        placeholder="Enter your address"
                      />
                    </FormField>
                  </>
                )}

              {/* ==================================================
                  DOCTOR FIELDS
              ================================================== */}

              {userInfo.role ===
                "DOCTOR" &&
                userInfo.doctor && (
                  <>
                    {/* Contact */}
                    <FormField
                      label="Contact Number"
                      htmlFor="contactNumber"
                    >
                      <div className="relative">

                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <Input
                          id="contactNumber"
                          name="contactNumber"
                          defaultValue={
                            existingContactNumber
                          }
                          required
                          disabled={
                            isSubmitting
                          }
                          className="h-11 rounded-xl pl-10"
                          placeholder="Enter contact number"
                        />
                      </div>
                    </FormField>

                    {/* Address */}
                    <FormField
                      label="Address"
                      htmlFor="address"
                    >
                      <Input
                        id="address"
                        name="address"
                        defaultValue={
                          userInfo
                            .doctor
                            .address ||
                          ""
                        }
                        disabled={
                          isSubmitting
                        }
                        className="h-11 rounded-xl"
                        placeholder="Enter address"
                      />
                    </FormField>

                    {/* Registration Number */}
                    <FormField
                      label="Registration Number"
                      htmlFor="registrationNumber"
                    >
                      <Input
                        id="registrationNumber"
                        name="registrationNumber"
                        defaultValue={
                          userInfo
                            .doctor
                            .registrationNumber ||
                          ""
                        }
                        required
                        disabled={
                          isSubmitting
                        }
                        className="h-11 rounded-xl"
                      />
                    </FormField>

                    {/* Experience */}
                    <FormField
                      label="Experience (Years)"
                      htmlFor="experience"
                    >
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        min="0"
                        step="1"
                        defaultValue={
                          userInfo
                            .doctor
                            .experience ??
                          ""
                        }
                        disabled={
                          isSubmitting
                        }
                        className="h-11 rounded-xl"
                      />
                    </FormField>

                    {/* Appointment Fee */}
                    <FormField
                      label="Appointment Fee (BDT)"
                      htmlFor="appointmentFee"
                    >
                      <Input
                        id="appointmentFee"
                        name="appointmentFee"
                        type="number"
                        min="0"
                        step="1"
                        defaultValue={
                          userInfo
                            .doctor
                            .appointmentFee ??
                          ""
                        }
                        required
                        disabled={
                          isSubmitting
                        }
                        className="h-11 rounded-xl"
                      />
                    </FormField>

                    {/* Qualification */}
                    <FormField
                      label="Qualification"
                      htmlFor="qualification"
                    >
                      <Input
                        id="qualification"
                        name="qualification"
                        defaultValue={
                          userInfo
                            .doctor
                            .qualification ||
                          ""
                        }
                        required
                        disabled={
                          isSubmitting
                        }
                        className="h-11 rounded-xl"
                      />
                    </FormField>

                    {/* Working Place */}
                    <FormField
                      label="Current Working Place"
                      htmlFor="currentWorkingPlace"
                    >
                      <Input
                        id="currentWorkingPlace"
                        name="currentWorkingPlace"
                        defaultValue={
                          userInfo
                            .doctor
                            .currentWorkingPlace ||
                          ""
                        }
                        required
                        disabled={
                          isSubmitting
                        }
                        className="h-11 rounded-xl"
                      />
                    </FormField>

                    {/* Designation */}
                    <FormField
                      label="Designation"
                      htmlFor="designation"
                    >
                      <Input
                        id="designation"
                        name="designation"
                        defaultValue={
                          userInfo
                            .doctor
                            .designation ||
                          ""
                        }
                        required
                        disabled={
                          isSubmitting
                        }
                        className="h-11 rounded-xl"
                      />
                    </FormField>

                    {/* Gender */}
                    <FormField
                      label="Gender"
                      htmlFor="gender"
                    >
                      <select
                        id="gender"
                        name="gender"
                        defaultValue={
                          userInfo
                            .doctor
                            .gender ||
                          "MALE"
                        }
                        disabled={
                          isSubmitting
                        }
                        className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="MALE">
                          Male
                        </option>

                        <option value="FEMALE">
                          Female
                        </option>
                      </select>
                    </FormField>
                  </>
                )}

              {/* ==================================================
                  ADMIN FIELDS
              ================================================== */}

              {userInfo.role ===
                "ADMIN" &&
                userInfo.admin && (
                  <FormField
                    label="Contact Number"
                    htmlFor="contactNumber"
                  >
                    <div className="relative">

                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <Input
                        id="contactNumber"
                        name="contactNumber"
                        defaultValue={
                          existingContactNumber
                        }
                        disabled={
                          isSubmitting
                        }
                        className="h-11 rounded-xl pl-10"
                        placeholder="Enter contact number"
                      />
                    </div>
                  </FormField>
                )}
            </div>

            {/* ==================================================
                SAVE BUTTON
            ================================================== */}

            <div className="mt-8 flex justify-end border-t border-slate-100 pt-6 dark:border-slate-800">

              <Button
                type="submit"
                disabled={
                  isSubmitting
                }
                className="h-11 min-w-[170px] rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />

                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;

/* =========================================================
   REUSABLE FORM FIELD
========================================================= */

function FormField({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`space-y-2 ${className}`}
    >
      <Label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        {label}
      </Label>

      {children}
    </div>
  );
}