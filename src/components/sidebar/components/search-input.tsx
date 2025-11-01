"use client";
import { faDeleteLeft } from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialValue = searchParams.get("q") || "";
  const [value, setValue] = useState(initialValue);


  // when the debounced value changes, update the search params
const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`, {
      scroll: false
    });
  }, 300);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.value as string;
  setValue(newValue);
  handleSearch(newValue);
};

const handleClear = () => {
  setValue("");
  handleSearch("");
  const params = new URLSearchParams(searchParams);
  params.delete("q");
  replace(`${pathname}?${params.toString()}`, {
    scroll: false
  });
};

  return (
    <div className="flex flex-col items-ceneter justify-start gap-y-2">
      <Label htmlFor="search" className="block font-medium">Search tickets by title</Label>
      <div className="flex items-center justify-start w-[380px]">
        <Input name="search" placeholder={placeholder} onChange={handleChange} value={value} className="bg-input dark:bg-input"/>
         <Button variant="ghost" size="icon" onClick={handleClear} aria-label="Clear search"
         className={cn("bg-secondary/30 dark:bg-secondary/30 text-secondary-foreground dark:text-secondary-foreground/80",
          !value && "hidden"
          )}>
          <FontAwesomeIcon icon={faDeleteLeft} />
        </Button>
      </div>
    </div>
  );
};

export { SearchInput };
