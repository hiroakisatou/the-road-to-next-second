"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

type SortSelectProps = {
  defaultValue?:string;
  options: Option[];
};

const SortSelect = ({ defaultValue, options }: SortSelectProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  const initialValue = searchParams.get("s")?.toString() || defaultValue || options[0].value;
  const [value, setValue] = useState(initialValue);

  const handleSort = (newValue: string | undefined) => {
    setValue((prevValue) => actualValue || prevValue);
    // setValue is asynchronous, value is not updated immediately
    const actualValue = newValue || value;

    const params = new URLSearchParams(searchParams);

    if (actualValue === defaultValue || actualValue === options[0].value) {
      params.delete("s");
    } else if (actualValue) {
      params.set("s", actualValue);
    } else {
      params.delete("s");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col items-ceneter justify-start gap-y-2">
      <Label htmlFor="sort" className="block font-medium">Sort by</Label>
    <Select name="sort" value={value} onValueChange={handleSort}>
      <SelectTrigger className="w-[100px] bg-input dark:bg-input">
        <SelectValue placeholder="Select sort order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  );
};

export { SortSelect };
