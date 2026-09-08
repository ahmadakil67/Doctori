"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFilterProps {
  paramName: string;
  placeholder: string;
  options: SelectOption[];
}

const ALL_VALUE = "__ALL__";

const SelectFilter = ({
  paramName,
  placeholder,
  options,
}: SelectFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParam = searchParams.get(paramName);

  const normalizedOptions = options.map((option) => ({
    ...option,
    value: option.value === "" ? ALL_VALUE : option.value,
  }));

  const hasAllOption = options.some((option) => option.value === "");

  const selectedValue =
    currentParam ?? (hasAllOption ? ALL_VALUE : undefined);

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === ALL_VALUE) {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }

    params.delete("page");

    const query = params.toString();

    router.replace(
      query ? `${pathname}?${query}` : pathname,
      { scroll: false }
    );
  };

  return (
    <Select
      value={selectedValue}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-full bg-background">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {normalizedOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;