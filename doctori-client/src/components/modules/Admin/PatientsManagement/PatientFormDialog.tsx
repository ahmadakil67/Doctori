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

import {
  Field,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { updatePatient } from "@/services/admin/patientsManagement";

import { IPatient } from "@/types/patient.interface";

import {
  Loader2,
  UserRound,
} from "lucide-react";

import {
  useActionState,
  useEffect,
  useRef,
} from "react";

import { toast } from "sonner";

interface IPatientFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  patient?: IPatient;
}

const PatientFormDialog = ({
  open,
  onClose,
  onSuccess,
  patient,
}: IPatientFormDialogProps) => {
  const formRef =
    useRef<HTMLFormElement>(
      null
    );

  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    updatePatient.bind(
      null,
      patient?.id as string
    ),
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(
        state.message ||
          "Patient updated successfully."
      );

      formRef.current?.reset();

      onSuccess();
      onClose();

      return;
    }

    if (
      state?.message &&
      !state.success
    ) {
      toast.error(
        state.message
      );
    }
  }, [
    state,
    onSuccess,
    onClose,
  ]);

  const handleClose = () => {
    if (isPending) return;

    formRef.current?.reset();

    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(
        nextOpen
      ) => {
        if (!nextOpen) {
          handleClose();
        }
      }}
    >
      <DialogContent className="max-w-lg overflow-hidden rounded-3xl p-0">

        <DialogHeader className="border-b border-slate-100 px-6 py-5 text-left dark:border-slate-800">

          <div className="flex items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
              <UserRound className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold">
                Edit Patient
              </DialogTitle>

              <DialogDescription className="mt-1 leading-6">
                Update the patient&apos;s
                supported account and
                contact information.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
        >
          <div className="space-y-5 px-6 py-5">

            <Field>
              <FieldLabel
                htmlFor="name"
                className="text-sm font-semibold"
              >
                Full Name
              </FieldLabel>

              <Input
                id="name"
                name="name"
                placeholder="Patient name"
                disabled={
                  isPending
                }
                defaultValue={
                  state?.formData
                    ?.name ||
                  patient?.name ||
                  ""
                }
                className="mt-2 h-11 rounded-xl"
              />

              <InputFieldError
                field="name"
                state={state}
              />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-sm font-semibold"
              >
                Email Address
              </FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="patient@example.com"
                disabled={
                  isPending
                }
                defaultValue={
                  state?.formData
                    ?.email ||
                  patient?.email ||
                  ""
                }
                className="mt-2 h-11 rounded-xl"
              />

              <InputFieldError
                field="email"
                state={state}
              />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="contactNumber"
                className="text-sm font-semibold"
              >
                Contact Number
              </FieldLabel>

              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="+880..."
                disabled={
                  isPending
                }
                defaultValue={
                  state?.formData
                    ?.contactNumber ||
                  patient
                    ?.contactNumber ||
                  ""
                }
                className="mt-2 h-11 rounded-xl"
              />

              <InputFieldError
                field="contactNumber"
                state={state}
              />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="address"
                className="text-sm font-semibold"
              >
                Address
              </FieldLabel>

              <Input
                id="address"
                name="address"
                placeholder="Patient address"
                disabled={
                  isPending
                }
                defaultValue={
                  state?.formData
                    ?.address ||
                  patient?.address ||
                  ""
                }
                className="mt-2 h-11 rounded-xl"
              />

              <InputFieldError
                field="address"
                state={state}
              />
            </Field>
          </div>

          <DialogFooter className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/40">

            <Button
              type="button"
              variant="outline"
              onClick={
                handleClose
              }
              disabled={
                isPending
              }
              className="h-10 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isPending
              }
              className="h-10 min-w-[140px] rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientFormDialog;