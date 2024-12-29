import { formateDateObjectToString } from "@/lib/utils/date.utils";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { BasicTableCellProps } from "../../index.type";

type DateBodyCellProps<TData> = { type?: "date" | "time" } & BasicTableCellProps<TData>;

function DateBodyCell<T>({ row, accessorKey, type = "date", className = "" }: DateBodyCellProps<T>) {
  const timestamp = row.getValue(accessorKey) as string | number;

  //@ts-ignore
  const value = formateDateObjectToString({
    date: new Date(typeof timestamp === "string" ? parseInt(timestamp) : timestamp),
    type,
    options: { calendar: persian, locale: persian_fa, format: "YYYY/MM/DD" },
  });

  return <p className={className}>{value}</p>;
}

export default DateBodyCell;
