import { cn } from "@/lib/utils";
import { formatCurrency, separateNumberDigits, summarizeTheNumber } from "@/lib/utils/transform.utils";
import { BasicTableCellProps } from "../../index.type";

type NumericType = "normal" | "currency" | "summarize" | "separate_decimal" | "separate";
type NumericBodyCellProps<TData> = { type?: NumericType; isPercentage?: boolean } & BasicTableCellProps<TData>;

function NumericBodyCell<TData>({
  row,
  accessorKey,
  className = "",
  type = "normal",
  isPercentage = false,
}: NumericBodyCellProps<TData>) {
  const value = row.getValue(accessorKey) as string;
  const formatTypes: Record<NumericType, (value: string) => any> = {
    normal: (value) => value,
    currency: (value) => formatCurrency(value),
    summarize: (value) => summarizeTheNumber(parseInt(value)),
    separate: (value) => separateNumberDigits(parseInt(value)),
    separate_decimal: (value) => separateNumberDigits(parseFloat(value), true),
  };

  return (
    <p dir="ltr" className={cn("text-[15px]", className)}>
      {formatTypes[type](value)}
      {isPercentage ? " %" : ""}
    </p>
  );
}

export default NumericBodyCell;
