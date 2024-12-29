import { BasicTableCellProps } from "../../index.type";

function SimpleBodyCell<TData>({ row, accessorKey, className = "" }: BasicTableCellProps<TData>) {
  const value = row.getValue(accessorKey) as string;

  return <p className={className}>{value || "-"}</p>;
}

export default SimpleBodyCell;
