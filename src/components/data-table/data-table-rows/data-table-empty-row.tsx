import { TableCell, TableRow } from "@/components/ui/table";
import { Table } from "@tanstack/react-table";

function DataTableEmptyRow<TData>({ table, noDataMessage = "داده ای برای نمایش وجود ندارد" }: { table: Table<TData>, noDataMessage?: string }) {
  return (
    <TableRow>
      <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
        <p className="w-full text-center">{noDataMessage}</p>
      </TableCell>
    </TableRow>
  );
}

export default DataTableEmptyRow;
