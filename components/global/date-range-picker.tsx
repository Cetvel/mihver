"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { tr } from "date-fns/locale";
import { CalendarRange } from "lucide-react";

type DatePickerWithRangeProps = {
  value?: {
    from: Date;
    to: Date;
  };
  onDateChange: (date: DateRange | undefined) => void;
  className?: React.HtmlHTMLAttributes<HTMLDivElement>;
};

export function DatePickerWithRange({
  onDateChange,
  value,
  className,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-secondary-content"
            )}
          >
            <CalendarRange className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: tr })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: tr })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: tr })
              )
            ) : (
              <span>Tarih seçin</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}