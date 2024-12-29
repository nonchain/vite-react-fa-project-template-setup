import DateRangePickerComponent, { CalendarProps, DatePickerProps } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";
import { cn } from "@/lib/utils";

type CustomDateRangePickerProps = { error?: boolean } & CalendarProps & DatePickerProps;

function DateRangePicker({ className = "", error = false, inputClass, ...props }: CustomDateRangePickerProps) {
  const [disabled, setIsDisabled] = useState(false);
  return (
    <div className={cn("flex h-9 w-full items-center overflow-hidden rounded-md border px-2", className)}>
      <DateRangePickerComponent
        disabled={disabled}
        range
        dateSeparator=" تا "
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        onClose={() => setIsDisabled(false)}
        onOpen={() => setIsDisabled(true)}
        inputClass={cn("w-full h-full cursor-pointer", inputClass)}
        {...props}
      />
    </div>
  );
}

export default DateRangePicker;
