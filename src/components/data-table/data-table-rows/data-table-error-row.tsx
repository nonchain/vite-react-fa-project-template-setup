import { TableCell, TableRow } from "@/components/ui/table";
import { Table } from "@tanstack/react-table";

function DataTableErrorRow<TData>({ table }: { table: Table<TData> }) {
  return (
    <TableRow>
      <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
        <p className="w-full text-center text-destructive">خطا در بارگیری داده</p>
      </TableCell>
    </TableRow>
  );
}

export default DataTableErrorRow;
