"use client";

import {
  Plus,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

import {
  useState,
  useTransition,
} from "react";

import SpecialitiesFormDialog from "./SpecialitiesFormDialog";

const SpecialitiesManagementHeader =
  () => {
    const router =
      useRouter();

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

    const handleOpen = () => {
      setDialogKey(
        (current) =>
          current + 1
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
        <SpecialitiesFormDialog
          key={dialogKey}
          open={isDialogOpen}
          onClose={() =>
            setIsDialogOpen(false)
          }
          onSuccess={
            handleSuccess
          }
        />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
              Healthcare Catalog
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Specialties Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Manage medical
              specialties used for
              doctor profiles and
              patient discovery.
            </p>
          </div>

          <Button
            type="button"
            onClick={
              handleOpen
            }
            disabled={
              isRefreshing
            }
            className="h-11 w-fit rounded-xl bg-blue-600 px-5 font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Specialty
          </Button>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">

          <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Specialty visibility
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Specialty names and
              images may be shown
              across doctor discovery
              and healthcare category
              pages, so use clear names
              and suitable images.
            </p>
          </div>
        </div>
      </>
    );
  };

export default SpecialitiesManagementHeader;