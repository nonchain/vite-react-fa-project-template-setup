import { Checkbox } from "@/components/ui/checkbox";
import { Table } from "@tanstack/react-table";

function CheckboxHeaderCell<T>({ table, className = "" }: { table: Table<T>; className?: string }) {
  return (
    <Checkbox
      className={className}
      checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
}

export default CheckboxHeaderCell;
