"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Field,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ISpecialty } from "@/types/specialities.interface";

import {
  Plus,
  X,
} from "lucide-react";

interface SpecialtyMultiSelectProps {
  selectedSpecialtyIds: string[];
  removedSpecialtyIds: string[];
  currentSpecialtyId: string;
  availableSpecialties: ISpecialty[];
  isEdit: boolean;

  onCurrentSpecialtyChange:
    (id: string) => void;

  onAddSpecialty:
    () => void;

  onRemoveSpecialty:
    (id: string) => void;

  getSpecialtyTitle:
    (id: string) => string;

  getNewSpecialties:
    () => string[];
}

const SpecialtyMultiSelect = ({
  selectedSpecialtyIds,
  removedSpecialtyIds,
  currentSpecialtyId,
  availableSpecialties,
  isEdit,
  onCurrentSpecialtyChange,
  onAddSpecialty,
  onRemoveSpecialty,
  getSpecialtyTitle,
  getNewSpecialties,
}: SpecialtyMultiSelectProps) => {
  const newSpecialties =
    getNewSpecialties();

  return (
    <Field>
      <FieldLabel
        htmlFor="specialties"
        className="text-sm font-semibold"
      >
        Specialties
      </FieldLabel>

      <Input
        type="hidden"
        name="specialties"
        value={JSON.stringify(
          isEdit
            ? newSpecialties
            : selectedSpecialtyIds
        )}
      />

      {isEdit && (
        <Input
          type="hidden"
          name="removeSpecialties"
          value={JSON.stringify(
            removedSpecialtyIds
          )}
        />
      )}

      {selectedSpecialtyIds.length >
        0 && (
        <div className="mt-2 flex flex-wrap gap-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-950/60">

          {selectedSpecialtyIds.map(
            (id) => (
              <Badge
                key={id}
                variant="secondary"
                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs"
              >
                {getSpecialtyTitle(
                  id
                )}

                <button
                  type="button"
                  onClick={() =>
                    onRemoveSpecialty(
                      id
                    )
                  }
                  className="ml-1 rounded-full p-0.5 transition hover:bg-red-100 hover:text-red-600"
                  aria-label={`Remove ${getSpecialtyTitle(
                    id
                  )}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          )}
        </div>
      )}

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">

        <Select
          value={
            currentSpecialtyId
          }
          onValueChange={
            onCurrentSpecialtyChange
          }
        >
          <SelectTrigger className="h-11 flex-1 rounded-xl">
            <SelectValue placeholder="Select a specialty" />
          </SelectTrigger>

          <SelectContent>
            {availableSpecialties.length >
            0 ? (
              availableSpecialties.map(
                (specialty) => (
                  <SelectItem
                    key={
                      specialty.id
                    }
                    value={
                      specialty.id
                    }
                  >
                    {
                      specialty.title
                    }
                  </SelectItem>
                )
              )
            ) : (
              <SelectItem
                value="none"
                disabled
              >
                {selectedSpecialtyIds.length >
                0
                  ? "All specialties selected"
                  : "No specialties available"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          onClick={
            onAddSpecialty
          }
          disabled={
            !currentSpecialtyId
          }
          className="h-11 rounded-xl"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      <p className="mt-2 text-xs text-slate-400">
        {isEdit
          ? "Add new specialties or remove existing associations."
          : "Select at least one specialty for the doctor."}
      </p>

      {isEdit && (
        <div className="mt-2 space-y-1">

          {newSpecialties.length >
            0 && (
            <p className="text-xs font-medium text-emerald-600">
              Will add:{" "}
              {newSpecialties
                .map(
                  getSpecialtyTitle
                )
                .join(", ")}
            </p>
          )}

          {removedSpecialtyIds.length >
            0 && (
            <p className="text-xs font-medium text-red-600">
              Will remove:{" "}
              {removedSpecialtyIds
                .map(
                  getSpecialtyTitle
                )
                .join(", ")}
            </p>
          )}
        </div>
      )}
    </Field>
  );
};

export default SpecialtyMultiSelect;