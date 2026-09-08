/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputFieldError from "@/components/shared/InputFieldError";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Field, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSpecialtySelection } from "@/hooks/specialtyHooks/useSpecialtySelection";

import { createDoctor, updateDoctor } from "@/services/admin/doctorManagement";

import { IDoctor } from "@/types/doctor.interface";
import { ISpecialty } from "@/types/specialities.interface";

import {
  Briefcase,
  Camera,
  Loader2,
  Stethoscope,
  UserRound,
} from "lucide-react";

import {
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

import { toast } from "sonner";

import SpecialtyMultiSelect from "./SpecialtyMultiSelect";

interface IDoctorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  doctor?: IDoctor;
  specialities?: ISpecialty[];
}

const DoctorFormDialog = ({
  open,
  onClose,
  onSuccess,
  doctor,
  specialities = [],
}: IDoctorFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = Boolean(doctor);

  const [gender, setGender] = useState<"MALE" | "FEMALE">(
    doctor?.gender || "MALE",
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [fileError, setFileError] = useState<string | null>(null);

  const [state, formAction, pending] = useActionState(
    isEdit ? updateDoctor.bind(null, doctor!.id!) : createDoctor,
    null,
  );

  const specialtySelection = useSpecialtySelection({
    doctor,
    isEdit,
    open,
  });

  const getSpecialtyTitle = (id: string) =>
    specialities.find((speciality) => speciality.id === id)?.title || "Unknown";

  /* =========================================================
     FILE
  ========================================================= */

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileError(null);

    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setPreviewImage(null);

      return;
    }

    if (!file.type.startsWith("image/")) {
      event.target.value = "";

      setFileError("Please select a valid image file.");

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";

      setFileError("Profile photo must be smaller than 5 MB.");

      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  /* =========================================================
     ACTION RESULT
  ========================================================= */

  useEffect(() => {
    if (state?.success) {
      toast.success(
        state.message ||
          (isEdit
            ? "Doctor updated successfully."
            : "Doctor created successfully."),
      );

      formRef.current?.reset();

      setSelectedFile(null);
      setPreviewImage(null);

      onSuccess();
      onClose();

      return;
    }

    if (state && !state.success && state.message) {
      toast.error(state.message);

      /*
       * Restore selected file because
       * browser may clear file inputs
       * after a server action.
       */
      if (selectedFile && fileInputRef.current) {
        const transfer = new DataTransfer();

        transfer.items.add(selectedFile);

        fileInputRef.current.files = transfer.files;
      }
    }
  }, [state, onSuccess, onClose, selectedFile, isEdit]);

  const handleClose = () => {
    if (pending) return;

    formRef.current?.reset();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setSelectedFile(null);
    setPreviewImage(null);
    setFileError(null);

    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
        }
      }}
    >
      <DialogContent className="flex max-h-[92vh] max-w-3xl flex-col overflow-hidden rounded-3xl p-0">
        <DialogHeader className="border-b border-slate-100 px-6 py-5 text-left dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
              <Stethoscope className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold">
                {isEdit ? "Edit Doctor" : "Add Doctor"}
              </DialogTitle>

              <DialogDescription className="mt-1">
                {isEdit
                  ? "Update the doctor's professional and account information."
                  : "Create a doctor account and professional profile."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 space-y-7 overflow-y-auto px-6 py-5">
            {/* ACCOUNT */}
            <FormSection icon={UserRound} title="Account Information">
              <div className="grid gap-5 sm:grid-cols-2">
                <DoctorField label="Full Name" id="name">
                  <Input
                    id="name"
                    name="name"
                    required
                    disabled={pending}
                    placeholder="Dr. John Doe"
                    defaultValue={state?.formData?.name || doctor?.name || ""}
                    className="h-11 rounded-xl"
                  />

                  <InputFieldError state={state} field="name" />
                </DoctorField>

                <DoctorField label="Email Address" id="email">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required={!isEdit}
                    disabled={pending || isEdit}
                    placeholder="doctor@example.com"
                    defaultValue={state?.formData?.email || doctor?.email || ""}
                    className="h-11 rounded-xl"
                  />

                  <InputFieldError state={state} field="email" />
                </DoctorField>

                {!isEdit && (
                  <>
                    <DoctorField label="Password" id="password">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        disabled={pending}
                        placeholder="Enter password"
                        defaultValue={state?.formData?.password || ""}
                        className="h-11 rounded-xl"
                      />

                      <InputFieldError state={state} field="password" />
                    </DoctorField>

                    <DoctorField label="Confirm Password" id="confirmPassword">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        disabled={pending}
                        placeholder="Confirm password"
                        defaultValue={state?.formData?.confirmPassword || ""}
                        className="h-11 rounded-xl"
                      />

                      <InputFieldError state={state} field="confirmPassword" />
                    </DoctorField>
                  </>
                )}
              </div>
            </FormSection>

            {/* PROFESSIONAL */}
            <FormSection icon={Briefcase} title="Professional Information">
              <SpecialtyMultiSelect
                selectedSpecialtyIds={specialtySelection.selectedSpecialtyIds}
                removedSpecialtyIds={specialtySelection.removedSpecialtyIds}
                currentSpecialtyId={specialtySelection.currentSpecialtyId}
                availableSpecialties={specialtySelection.getAvailableSpecialties(
                  specialities,
                )}
                isEdit={isEdit}
                onCurrentSpecialtyChange={
                  specialtySelection.setCurrentSpecialtyId
                }
                onAddSpecialty={specialtySelection.handleAddSpecialty}
                onRemoveSpecialty={specialtySelection.handleRemoveSpecialty}
                getSpecialtyTitle={getSpecialtyTitle}
                getNewSpecialties={specialtySelection.getNewSpecialties}
              />

              <InputFieldError field="specialties" state={state} />

              <div className="grid gap-5 sm:grid-cols-2">
                {(
                  [
                    [
                      "contactNumber",
                      "Contact Number",
                      doctor?.contactNumber,
                      "+880...",
                    ],
                    ["address", "Address", doctor?.address, "Doctor's address"],
                    [
                      "registrationNumber",
                      "Registration Number",
                      doctor?.registrationNumber,
                      "Medical registration number",
                    ],
                    [
                      "qualification",
                      "Qualification",
                      doctor?.qualification,
                      "MBBS, MD",
                    ],
                    [
                      "currentWorkingPlace",
                      "Current Working Place",
                      doctor?.currentWorkingPlace,
                      "Hospital or clinic",
                    ],
                    [
                      "designation",
                      "Designation",
                      doctor?.designation,
                      "Senior Consultant",
                    ],
                  ] as Array<[string, string, string | undefined, string]>
                ).map(([id, label, currentValue, placeholder]) => (
                  <DoctorField key={id} label={label} id={id}>
                    <Input
                      id={id}
                      name={id}
                      required
                      disabled={pending}
                      placeholder={placeholder}
                      defaultValue={state?.formData?.[id] || currentValue || ""}
                      className="h-11 rounded-xl"
                    />

                    <InputFieldError state={state} field={id} />
                  </DoctorField>
                ))}

                <DoctorField label="Experience (Years)" id="experience">
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    required
                    disabled={pending}
                    defaultValue={
                      state?.formData?.experience ?? doctor?.experience ?? ""
                    }
                    className="h-11 rounded-xl"
                  />

                  <InputFieldError state={state} field="experience" />
                </DoctorField>

                <DoctorField label="Appointment Fee (BDT)" id="appointmentFee">
                  <Input
                    id="appointmentFee"
                    name="appointmentFee"
                    type="number"
                    min="0"
                    required
                    disabled={pending}
                    defaultValue={
                      state?.formData?.appointmentFee ??
                      doctor?.appointmentFee ??
                      ""
                    }
                    className="h-11 rounded-xl"
                  />

                  <InputFieldError state={state} field="appointmentFee" />
                </DoctorField>

                <Field>
                  <FieldLabel
                    htmlFor="gender"
                    className="text-sm font-semibold"
                  >
                    Gender
                  </FieldLabel>

                  <Input
                    type="hidden"
                    id="gender"
                    name="gender"
                    value={gender}
                  />

                  <Select
                    value={gender}
                    disabled={pending}
                    onValueChange={(value) =>
                      setGender(value as "MALE" | "FEMALE")
                    }
                  >
                    <SelectTrigger className="mt-2 h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>

                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>

                  <InputFieldError state={state} field="gender" />
                </Field>
              </div>
            </FormSection>

            {!isEdit && (
              <FormSection icon={Camera} title="Profile Photo">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Doctor profile preview"
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                )}

                <Input
                  ref={fileInputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  disabled={pending}
                  onChange={handleFileChange}
                  className="h-11 cursor-pointer rounded-xl"
                />

                <p className="text-xs text-slate-400">
                  Upload a suitable doctor profile image. Maximum size: 5 MB.
                </p>

                {fileError && (
                  <p className="text-sm text-red-600">{fileError}</p>
                )}

                <InputFieldError state={state} field="profilePhoto" />
              </FormSection>
            )}
          </div>

          <DialogFooter className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/40">
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={handleClose}
              className="h-10 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={pending || Boolean(fileError)}
              className="h-10 min-w-[150px] rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
            >
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Update Doctor"
              ) : (
                "Create Doctor"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorFormDialog;

function FormSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40">
          <Icon className="h-4 w-4" />
        </div>

        <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>

      {children}
    </section>
  );
}

function DoctorField({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id} className="text-sm font-semibold">
        {label}
      </FieldLabel>

      <div className="mt-2 space-y-1">{children}</div>
    </Field>
  );
}
