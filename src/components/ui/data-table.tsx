import { flexRender, Row, Table as TTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import DataTableEmptyRow from "@/components/data-table/data-table-rows/data-table-empty-row";
import DataTableLoadingRow from "@/components/data-table/data-table-rows/data-table-loading-row";
import DataTableErrorRow from "@/components/data-table/data-table-rows/data-table-error-row";
import { Button } from "./button";
import { acceptOnlyNumberOnKeyPress, separateNumberDigits, toEnglishDigits } from "@/lib/utils/transform.utils";
import { RiArrowLeftCircleFill, RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

type RowPerPage = "5" | "10" | "20" | "50" | "100";
interface DataTableProps<TData> {
  table: TTable<TData>;
  className?: string;
  controlClassName?: string;
  isLoading?: boolean;
  isError?: boolean;
  showPagination?: boolean;
  showRowController?: boolean;
  showTotalNumberOfRows?: boolean;
  noDataMessage?: string;
  rowProps?: (row: Row<TData>) => React.ComponentPropsWithoutRef<typeof TableRow>;
  defaultRowPerPage?: RowPerPage;
  onRowPerPageChange?: (rowPerPage: string) => void;
}

export function DataTable<TData>({
  table,
  rowProps,
  className = "",
  controlClassName = "",
  isLoading = false,
  isError = false,
  showPagination = false,
  showRowController = false,
  showTotalNumberOfRows = false,
  noDataMessage = "داده ای وجود ندارد",
}: DataTableProps<TData>) {
  return (
    <div className={cn("relative flex w-full flex-col overflow-auto border", className)}>
      <Table className="border-collapse">
        <TableHeader className="sticky top-0 z-10 shadow-sm bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="px-0" key={header.id} style={{ width: header.column.getSize() }}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <DataTableLoadingRow table={table} />
          ) : isError ? (
            <DataTableErrorRow table={table} />
          ) : table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} {...rowProps?.(row)}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell width={cell.column.getSize() + "px"} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <DataTableEmptyRow table={table} noDataMessage={noDataMessage} />
          )}
        </TableBody>
      </Table>
      <div className={cn("w-full flex items-center h-12 pl-2 pr-3 border-t", controlClassName)}>
        {showTotalNumberOfRows && <DataTableNumberOfRow table={table} />}
        <div className={cn("flex items-center", showTotalNumberOfRows ? "mr-auto gap-4" : "w-full justify-between")}>
          {showRowController && <DataTableRowController table={table} />}
          {showPagination && (
            <DataTablePagination table={table} isLoading={isLoading} className={showRowController ? "" : "mx-auto"} />
          )}
        </div>
      </div>
    </div>
  );
}

function DataTablePagination<TData>({
  table,
  isLoading = false,
  className = "",
}: Pick<DataTableProps<TData>, "table" | "isLoading" | "className">) {
  const RANGE = 5;

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  console.log("🚀 ~ currentPage:", currentPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i);

  const onPaginate = (page: number) => table.setPageIndex(page);
  const paginationSliceStartIndex =
    currentPage - RANGE <= 1 ? 1 : currentPage <= pageCount - RANGE ? currentPage : currentPage - RANGE;
  const paginationSliceEndIndex = currentPage + RANGE >= pageCount ? pageCount - 1 : currentPage + RANGE;

  function PaginationPopover() {
    return (
      <Popover>
        <PopoverTrigger>
          <PaginationEllipsis className="rounded-full size-8 hover:bg-accent" />
        </PopoverTrigger>
        <PopoverContent className="w-fit h-10 p-0 px-2">
          <DataTablePaginateInput onPaginate={onPaginate} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Pagination className={cn("bg-transparent w-fit mx-0", className)}>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full size-8 hover:bg-accent"
            onClick={() => table.previousPage()}
            disabled={isLoading || !table.getCanPreviousPage()}
          >
            <RiArrowRightSLine size={20} />
          </Button>
        </PaginationItem>

        {/* Page Numbers */}
        <div className="flex gap-2 items-center">
          {pageCount > 11 ? (
            <>
              <PaginationItem
                className={cn(
                  "size-8 flex items-center justify-center rounded-full cursor-pointer text-sm",
                  currentPage === 0 ? "bg-primary text-white font-medium hover:bg-primary/80" : "hover:bg-accent"
                )}
                onClick={() => onPaginate(0)}
              >
                1
              </PaginationItem>
              {currentPage > RANGE + 1 && (
                <PaginationItem>
                  <PaginationPopover />
                </PaginationItem>
              )}
              {pages.slice(paginationSliceStartIndex, paginationSliceEndIndex).map((page) => (
                <PaginationItem
                  className={cn(
                    "size-8 flex items-center justify-center rounded-full cursor-pointer text-sm",
                    currentPage === page ? "bg-primary text-white font-medium hover:bg-primary/80" : "hover:bg-accent"
                  )}
                  key={page}
                  onClick={() => onPaginate(page)}
                >
                  {page + 1}
                </PaginationItem>
              ))}
              {pageCount > 1 && currentPage < pageCount - RANGE - 1 && (
                <PaginationItem>
                  <PaginationPopover />
                </PaginationItem>
              )}
              <PaginationItem
                className={cn(
                  "size-8 flex items-center justify-center rounded-full cursor-pointer text-sm",
                  currentPage === pageCount - 1 ? "bg-primary text-white font-medium hover:bg-primary/80" : "hover:bg-accent"
                )}
                onClick={() => onPaginate(pageCount)}
              >
                {pageCount}
              </PaginationItem>
            </>
          ) : (
            pages.map((i) => (
              <PaginationItem
                className={cn(
                  "size-8 flex items-center justify-center rounded-full cursor-pointer text-sm",
                  currentPage === i ? "bg-primary text-white font-medium hover:bg-primary/80" : "hover:bg-accent"
                )}
                key={i}
                onClick={() => onPaginate(i)}
              >
                {i + 1}
              </PaginationItem>
            ))
          )}
        </div>

        {/* Next Button */}
        <PaginationItem>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full size-8 hover:bg-accent"
            onClick={() => table.nextPage()}
            disabled={isLoading || !table.getCanNextPage()}
          >
            <RiArrowLeftSLine size={20} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function DataTablePaginateInput({ onPaginate, className = "" }: { onPaginate: (page: number) => void; className?: string }) {
  const [pageNumber, setPageNumber] = useState("");

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event?.target?.value || "";
    setPageNumber(value);
  }

  function handleEnterKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (pageNumber && pageNumber.length > 0 && event.key === "Enter") {
      onPaginate(parseInt(pageNumber) - 1);
    }
  }

  return (
    <div className={cn("w-fit h-full flex items-center gap-2", className)}>
      <p className="text-xs font-medium">شماره صفحه:</p>
      <Input
        className="px-0 h-7 text-center"
        style={{ width: `${32 + pageNumber.length * 8}px` }}
        value={pageNumber ? toEnglishDigits(pageNumber) : ""}
        onChange={handleOnChange}
        onKeyPress={acceptOnlyNumberOnKeyPress}
        onKeyDown={handleEnterKeyDown}
      />
      <RiArrowLeftCircleFill className="cursor-pointer" onClick={() => onPaginate(parseInt(pageNumber) - 1)} />
    </div>
  );
}

function DataTableRowController<TData>({
  table,
  onRowPerPageChange,
  defaultRowPerPage = "10",
}: Pick<DataTableProps<TData>, "table" | "onRowPerPageChange" | "defaultRowPerPage">) {
  const [value, setValue] = useState(defaultRowPerPage);

  function handleChangeRowPerPage(value: RowPerPage) {
    if (value) {
      setValue(value);
      table.setPageSize(parseInt(value));
      table.setPageIndex(0);
      onRowPerPageChange?.(value);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <p className="text-sm">تعداد سطر ها در صفحه:</p>
      <Select dir="rtl" onValueChange={handleChangeRowPerPage} value={value}>
        <SelectTrigger className="w-16 h-8">
          <SelectValue placeholder="انتخاب" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function DataTableNumberOfRow<TData>({ table }: Pick<DataTableProps<TData>, "table">) {
  return (
    <div className="flex items-center gap-1 ml-auto">
      <p className="mr-2 text-sm">تعداد کل سهام: </p>
      <p className="text-sm font-semibold">{separateNumberDigits(table.getRowCount())}</p>
    </div>
  );
}
