"use client";

import InputFieldError from "@/components/shared/InputFieldError";

import {
  Button,
} from "@/components/ui/button";

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

import {
  Input,
} from "@/components/ui/input";

import { createSpeciality } from "@/services/admin/specialitiesManagement";

import {
  ImageIcon,
  Loader2,
  Stethoscope,
  Upload,
} from "lucide-react";

import {
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

import { toast } from "sonner";

interface ISpecialitiesFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SpecialitiesFormDialog = ({
  open,
  onClose,
  onSuccess,
}: ISpecialitiesFormDialogProps) => {
  const formRef =
    useRef<HTMLFormElement>(
      null
    );

  const [
    previewImage,
    setPreviewImage,
  ] = useState<
    string | null
  >(null);

  const [
    localError,
    setLocalError,
  ] = useState<
    string | null
  >(null);

  const [
    state,
    formAction,
    pending,
  ] = useActionState(
    createSpeciality,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(
        state.message ||
          "Specialty created successfully."
      );

      formRef.current?.reset();

      setPreviewImage(
        null
      );

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
    onClose,
    onSuccess,
  ]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setLocalError(null);

    const file =
      event.target.files?.[0];

    if (!file) {
      setPreviewImage(
        null
      );

      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setLocalError(
        "Please select a valid image file."
      );

      event.target.value =
        "";

      return;
    }

    const maxFileSize =
      5 * 1024 * 1024;

    if (
      file.size >
      maxFileSize
    ) {
      setLocalError(
        "Image must be smaller than 5 MB."
      );

      event.target.value =
        "";

      return;
    }

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setPreviewImage(
        reader.result as string
      );
    };

    reader.readAsDataURL(
      file
    );
  };

  const handleClose = () => {
    if (pending) return;

    formRef.current?.reset();

    setPreviewImage(null);
    setLocalError(null);

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
              <Stethoscope className="h-5 w-5" />
            </div>

            <div>
              <DialogTitle className="text-xl font-bold">
                Add Specialty
              </DialogTitle>

              <DialogDescription className="mt-1 leading-6">
                Create a healthcare
                specialty that doctors
                can be associated with.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
        >
          <div className="space-y-6 px-6 py-5">

            {/* Title */}
            <Field>
              <FieldLabel
                htmlFor="title"
                className="text-sm font-semibold"
              >
                Specialty Name
              </FieldLabel>

              <Input
                id="title"
                name="title"
                placeholder="e.g. Cardiology"
                required
                disabled={
                  pending
                }
                defaultValue={
                  state?.formData
                    ?.title || ""
                }
                className="mt-2 h-11 rounded-xl"
              />

              <InputFieldError
                field="title"
                state={state}
              />
            </Field>

            {/* Image */}
            <Field>
              <FieldLabel
                htmlFor="file"
                className="text-sm font-semibold"
              >
                Specialty Image
              </FieldLabel>

              <div className="mt-2 rounded-2xl border border-dashed border-slate-200 p-4 dark:border-slate-700">

                {previewImage ? (
                  <div className="flex items-center gap-4">

                    <img
                      src={
                        previewImage
                      }
                      alt="Specialty preview"
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Image selected
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Choose another
                        file below if you
                        want to replace it.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 dark:bg-slate-950">
                      <ImageIcon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Upload an image
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Image file up to
                        5 MB.
                      </p>
                    </div>
                  </div>
                )}

                <div className="relative mt-4">

                  <Upload className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    required
                    disabled={
                      pending
                    }
                    onChange={
                      handleFileChange
                    }
                    className="h-11 cursor-pointer rounded-xl pl-10"
                  />
                </div>
              </div>

              {localError && (
                <p className="text-sm text-red-600">
                  {localError}
                </p>
              )}

              <InputFieldError
                field="file"
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
                pending
              }
              className="h-10 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                pending ||
                !!localError
              }
              className="h-10 min-w-[150px] rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700"
            >
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Add Specialty
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialitiesFormDialog;