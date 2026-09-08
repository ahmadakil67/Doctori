"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { softDeletePatient } from "@/services/admin/patientsManagement";

import { IPatient } from "@/types/patient.interface";

import {
  UsersRound,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  useState,
  useTransition,
} from "react";

import { toast } from "sonner";

import PatientFormDialog from "./PatientFormDialog";
import PatientViewDetailDialog from "./PatientsViewDetailDialog";
import { patientsColumns } from "./patientsColumns";

interface PatientsTableProps {
  patients: IPatient[];
}

const PatientsTable = ({
  patients = [],
}: PatientsTableProps) => {
  const router = useRouter();

  const [
    isRefreshing,
    startTransition,
  ] = useTransition();

  const [
    deletingPatient,
    setDeletingPatient,
  ] =
    useState<IPatient | null>(
      null
    );

  const [
    viewingPatient,
    setViewingPatient,
  ] =
    useState<IPatient | null>(
      null
    );

  const [
    editingPatient,
    setEditingPatient,
  ] =
    useState<IPatient | null>(
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
        !deletingPatient?.id ||
        isDeleting
      ) {
        return;
      }

      try {
        setIsDeleting(true);

        const result =
          await softDeletePatient(
            deletingPatient.id
          );

        if (result.success) {
          toast.success(
            result.message ||
              "Patient deactivated successfully."
          );

          setDeletingPatient(
            null
          );

          handleRefresh();
        } else {
          toast.error(
            result.message ||
              "Failed to deactivate patient."
          );
        }
      } catch (error) {
        console.error(
          "Patient status update error:",
          error
        );

        toast.error(
          "Unable to update patient status."
        );
      } finally {
        setIsDeleting(false);
      }
    };

  const activePatients =
    patients.filter(
      (patient) =>
        !patient.isDeleted
    ).length;

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
              <UsersRound className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-950 dark:text-white">
                Patient Directory
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Registered patient
                accounts across Doctori.
              </p>
            </div>
          </div>

          <div className="flex gap-2">

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {patients.length} Total
            </span>

            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              {activePatients} Active
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
            data={patients}
            columns={
              patientsColumns
            }
            onView={
              setViewingPatient
            }
            onEdit={
              setEditingPatient
            }
            onDelete={
              setDeletingPatient
            }
            getRowKey={(
              patient
            ) => patient.id!}
            emptyMessage="No patients found. Try adjusting the current filters."
          />
        </div>
      </section>

      {editingPatient && (
        <PatientFormDialog
          key={
            editingPatient.id
          }
          open
          patient={
            editingPatient
          }
          onClose={() =>
            setEditingPatient(
              null
            )
          }
          onSuccess={() => {
            setEditingPatient(
              null
            );

            handleRefresh();
          }}
        />
      )}

      {viewingPatient && (
        <PatientViewDetailDialog
          open
          patient={
            viewingPatient
          }
          onClose={() =>
            setViewingPatient(
              null
            )
          }
        />
      )}

      <DeleteConfirmationDialog
        open={
          !!deletingPatient
        }
        onOpenChange={(
          open
        ) => {
          if (
            !open &&
            !isDeleting
          ) {
            setDeletingPatient(
              null
            );
          }
        }}
        onConfirm={
          confirmDelete
        }
        title="Deactivate Patient"
        description={`Are you sure you want to deactivate ${
          deletingPatient?.name ||
          "this patient"
        }? Their account access may be restricted.`}
        isDeleting={
          isDeleting
        }
      />
    </>
  );
};

export default PatientsTable;