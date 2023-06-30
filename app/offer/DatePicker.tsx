"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
  dates,
  setDates,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>;
  dates: DateRange | undefined;
  setDates: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="dates"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dates && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dates?.from ? (
              dates.to ? (
                <>
                  {format(dates.from, "LLL dd, y")} -{" "}
                  {format(dates.to, "LLL dd, y")}
                </>
              ) : (
                format(dates.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dates?.from}
            selected={dates}
            onSelect={setDates}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
