import { Row } from "@tanstack/react-table";

export interface BasicTableCellProps<TData> {
  row: Row<TData>;
  accessorKey: string;
  className?: string;
}
