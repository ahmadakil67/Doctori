"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { deleteSpeciality } from "@/services/admin/specialitiesManagement";

import { ISpecialty } from "@/types/specialities.interface";

import {
  Stethoscope,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  useState,
  useTransition,
} from "react";

import { toast } from "sonner";

import { specialitiesColumns } from "./specialitiesColumns";

interface SpecialityTableProps {
  specialities: ISpecialty[];
}

const SpecialitiesTable = ({
  specialities = [],
}: SpecialityTableProps) => {
  const router =
    useRouter();

  const [
    isRefreshing,
    startTransition,
  ] = useTransition();

  const [
    deletingSpeciality,
    setDeletingSpeciality,
  ] =
    useState<ISpecialty | null>(
      null
    );

  const [
    isDeleting,
    setIsDeleting,
  ] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmDelete =
    async () => {
      if (
        !deletingSpeciality ||
        isDeleting
      ) {
        return;
      }

      try {
        setIsDeleting(true);

        const result =
          await deleteSpeciality(
            deletingSpeciality.id
          );

        if (result.success) {
          toast.success(
            result.message ||
              "Specialty deleted successfully."
          );

          setDeletingSpeciality(
            null
          );

          handleRefresh();
        } else {
          toast.error(
            result.message ||
              "Failed to delete specialty."
          );
        }
      } catch (error) {
        console.error(
          "Specialty delete error:",
          error
        );

        toast.error(
          "Unable to delete specialty."
        );
      } finally {
        setIsDeleting(false);
      }
    };

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 dark:border-slate-800">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
              <Stethoscope className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-950 dark:text-white">
                Specialty Directory
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Medical categories
                available across Doctori.
              </p>
            </div>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
            {specialities.length}{" "}
            {specialities.length ===
            1
              ? "Specialty"
              : "Specialties"}
          </span>
        </div>

        <div
          className={
            isRefreshing
              ? "pointer-events-none opacity-70"
              : ""
          }
        >
          <ManagementTable
            data={
              specialities
            }
            columns={
              specialitiesColumns
            }
            onDelete={(
              speciality
            ) =>
              setDeletingSpeciality(
                speciality
              )
            }
            getRowKey={(
              speciality
            ) =>
              speciality.id
            }
            emptyMessage="No specialties found. Add your first medical specialty."
          />
        </div>
      </section>

      <DeleteConfirmationDialog
        open={
          !!deletingSpeciality
        }
        onOpenChange={(
          open
        ) => {
          if (
            !open &&
            !isDeleting
          ) {
            setDeletingSpeciality(
              null
            );
          }
        }}
        onConfirm={
          confirmDelete
        }
        title="Delete Specialty"
        description={`Are you sure you want to delete ${
          deletingSpeciality
            ?.title ||
          "this specialty"
        }? If it is already associated with doctors, the server may prevent deletion.`}
        isDeleting={
          isDeleting
        }
      />
    </>
  );
};

export default SpecialitiesTable;