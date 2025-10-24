"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { faCalendarDays } from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useState } from "react";

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

const DatePicker = ({ id, name, defaultValue }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate === undefined) {
      setIsOpen(true);
      return;
    }
    setDate(selectedDate);
    setIsOpen(false);
  };
  const formatedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger id={id} className="w-full" asChild>
        <Button variant="outline" className="justify-start text-left font-normal">
          <FontAwesomeIcon icon={faCalendarDays} />
          {formatedStringDate}
          <input type="hidden" name={name} value={formatedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );

}
export { DatePicker };
