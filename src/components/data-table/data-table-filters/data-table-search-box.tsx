import DebounceInput from "@/components/ui/debounce-input";
import { cn } from "@/lib/utils";
import { RiCloseLine, RiSearch2Line } from "@remixicon/react";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

type DataTableSearchBoxProps<T> = {
  table: Table<T>;
  accessorKey: string;
  label?: string;
  wrapperClassName?: string;
} & React.ComponentProps<"input">;

function DataTableSearchBox<T>({
  table,
  accessorKey,
  label = "",
  wrapperClassName = "",
  className = "",
  ...inputProps
}: DataTableSearchBoxProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={cn(
        "h-8 relative flex items-center border border-zinc-300 rounded-md transition-all duration-300 overflow-hidden",
        wrapperClassName,
        isExpanded ? "w-40" : "w-8"
      )}
    >
      <div className="relative cursor-pointer w-8 h-full flex items-center justify-center" onClick={() => setIsExpanded((prev) => !prev)}>
        <RiCloseLine
          className={cn(
            "text-zinc-700 absolute transition-all duration-200",
            isExpanded ? "opacity-100 rotate-180" : "opacity-0 rotate-0 "
          )}
          size={20}
        />
        <RiSearch2Line
          className={cn(
            "text-zinc-700 absolute transition-all duration-200",
            isExpanded ? "opacity-0 rotate-180" : "opacity-100 rotate-0 "
          )}
          size={20}
        />
      </div>
      <DebounceInput
        {...inputProps}
        className={cn("w-[calc(100%_-_32px)] px-0 h-6 border-none absolute right-8", className)}
        //value={(table.getColumn(accessorKey)?.getFilterValue() as string) ?? ""}
        onDebounceValueChange={(event) => table.getColumn(accessorKey)?.setFilterValue(event)}
      />
    </div>
  );
}

export default DataTableSearchBox;
