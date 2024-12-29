import Spinner from "@/components/ui/spinner";
import { TableCell, TableRow } from "@/components/ui/table";
import { Table } from "@tanstack/react-table";

function DataTableLoadingRow<TData>({ table }: { table: Table<TData> }) {
  return (
    <TableRow>
      <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default DataTableLoadingRow;
