import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiArrowDownSLine, RiArrowUpSLine, RiExpandUpDownLine } from "@remixicon/react";
import { Column } from "@tanstack/react-table";

type SortableHeaderCellProps<T> = { column: Column<T>; label: string; className?: string };

function SortableHeaderCell<T>({ column, label, className = "" }: SortableHeaderCellProps<T>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting()}
      className={cn("gap-1 hover:bg-transparent p-0 h-8", column.getIsSorted() ? "text-primary" : "text-zinc-600", className)}
    >
      {label}
      {column.getIsSorted() === "asc" ? <RiArrowUpSLine size={16} /> : column.getIsSorted() === "desc" ? <RiArrowDownSLine size={16} /> : <RiExpandUpDownLine size={16} />}
    </Button>
  );
}

export default SortableHeaderCell;
