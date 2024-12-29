import { cn } from "@/lib/utils";

type SimpleHeaderCellProps = { label: string; className?: string };

function SimpleHeaderCell({ label, className = "" }: SimpleHeaderCellProps) {
  return <p className={cn("w-full", className)}>{label}</p>;
}

export default SimpleHeaderCell;
