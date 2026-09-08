"use client";

import { Plus, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ISpecialty } from "@/types/specialities.interface";

import { useRouter } from "next/navigation";

import {
  useState,
  useTransition,
} from "react";

import DoctorFormDialog from "./DoctorFormDialog";

interface DoctorsManagementHeaderProps {
  specialities?: ISpecialty[];
}

const DoctorsManagementHeader = ({
  specialities = [],
}: DoctorsManagementHeaderProps) => {
  const router = useRouter();

  const [
    isRefreshing,
    startTransition,
  ] = useTransition();

  const [
    isDialogOpen,
    setIsDialogOpen,
  ] = useState(false);

  const [
    dialogKey,
    setDialogKey,
  ] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey(
      (current) => current + 1
    );

    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <DoctorFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={() =>
          setIsDialogOpen(false)
        }
        onSuccess={handleSuccess}
        specialities={specialities}
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            Medical Workforce
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Doctors Management
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Manage doctor accounts,
            professional information,
            specialties and availability
            across Doctori.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleOpenDialog}
          disabled={isRefreshing}
          className="h-11 w-fit rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </div>

      {specialities.length === 0 && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              No specialties available
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700/80">
              Create at least one specialty
              before adding doctors.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorsManagementHeader;