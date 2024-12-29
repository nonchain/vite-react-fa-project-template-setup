import DebounceInput from "@/components/ui/debounce-input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type DataTableRangeBoxProps= {
  label?: string;
  wrapperClassName?: string;
} & React.ComponentProps<"input">;

function DataTableRangeBox({ label = "", wrapperClassName = "", ...inputProps }: DataTableRangeBoxProps) {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <Label className="absolute -top-5 text-xs font-medium">{label}</Label>
      <DebounceInput {...inputProps} />
    </div>
  );
}

export default DataTableRangeBox;
