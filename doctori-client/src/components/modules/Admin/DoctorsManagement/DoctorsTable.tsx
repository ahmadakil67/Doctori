"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import {
  Stethoscope,
} from "lucide-react";

import { softDeleteDoctor } from "@/services/admin/doctorManagement";

import { IDoctor } from "@/types/doctor.interface";
import { ISpecialty } from "@/types/specialities.interface";

import { useRouter } from "next/navigation";

import {
  useState,
  useTransition,
} from "react";

import { toast } from "sonner";

import DoctorFormDialog from "./DoctorFormDialog";
import DoctorViewDetailDialog from "./DoctorViewDetailDialog";
import { doctorsColumns } from "./doctorsColumns";

interface DoctorsTableProps {
  doctors: IDoctor[];
  specialities: ISpecialty[];
}

const DoctorsTable = ({
  doctors = [],
  specialities = [],
}: DoctorsTableProps) => {
  const router = useRouter();

  const [
    isRefreshing,
    startTransition,
  ] = useTransition();

  const [
    deletingDoctor,
    setDeletingDoctor,
  ] =
    useState<IDoctor | null>(
      null
    );

  const [
    viewingDoctor,
    setViewingDoctor,
  ] =
    useState<IDoctor | null>(
      null
    );

  const [
    editingDoctor,
    setEditingDoctor,
  ] =
    useState<IDoctor | null>(
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
        !deletingDoctor?.id ||
        isDeleting
      ) {
        return;
      }

      try {
        setIsDeleting(true);

        const result =
          await softDeleteDoctor(
            deletingDoctor.id
          );

        if (result.success) {
          toast.success(
            result.message ||
              "Doctor deactivated successfully."
          );

          setDeletingDoctor(
            null
          );

          handleRefresh();
        } else {
          toast.error(
            result.message ||
              "Failed to deactivate doctor."
          );
        }
      } catch (error) {
        console.error(
          "Doctor delete error:",
          error
        );

        toast.error(
          "Unable to update doctor status."
        );
      } finally {
        setIsDeleting(false);
      }
    };

  const activeDoctors =
    doctors.filter(
      (doctor) =>
        !doctor.isDeleted
    ).length;

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
              <Stethoscope className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-950 dark:text-white">
                Doctor Directory
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Review and manage
                Doctori medical
                professionals.
              </p>
            </div>
          </div>

          <div className="flex gap-2">

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800">
              {doctors.length} Total
            </span>

            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              {activeDoctors} Active
            </span>
          </div>
        </div>

        <div
          className={
            isRefreshing
              ? "pointer-events-none opacity-70"
              : ""
          }
        >
          <ManagementTable
            data={doctors}
            columns={doctorsColumns}
            onView={
              setViewingDoctor
            }
            onEdit={
              setEditingDoctor
            }
            onDelete={
              setDeletingDoctor
            }
            getRowKey={(
              doctor
            ) => doctor.id!}
            emptyMessage="No doctors found. Add your first doctor or adjust the current filters."
          />
        </div>
      </section>

      {editingDoctor && (
        <DoctorFormDialog
          open
          doctor={editingDoctor}
          specialities={
            specialities
          }
          onClose={() =>
            setEditingDoctor(
              null
            )
          }
          onSuccess={() => {
            setEditingDoctor(
              null
            );

            handleRefresh();
          }}
        />
      )}

      {viewingDoctor && (
        <DoctorViewDetailDialog
          open
          doctor={viewingDoctor}
          onClose={() =>
            setViewingDoctor(
              null
            )
          }
        />
      )}

      <DeleteConfirmationDialog
        open={!!deletingDoctor}
        onOpenChange={(
          open
        ) => {
          if (
            !open &&
            !isDeleting
          ) {
            setDeletingDoctor(
              null
            );
          }
        }}
        onConfirm={
          confirmDelete
        }
        title="Deactivate Doctor"
        description={`Are you sure you want to deactivate ${
          deletingDoctor?.name ||
          "this doctor"
        }? They may no longer be available to patients.`}
        isDeleting={
          isDeleting
        }
      />
    </>
  );
};

export default DoctorsTable;