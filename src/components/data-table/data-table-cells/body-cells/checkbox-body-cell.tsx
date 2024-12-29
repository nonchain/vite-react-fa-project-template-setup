import { Checkbox } from "@/components/ui/checkbox";
import { Row } from "@tanstack/react-table";

function CheckboxBodyCell<T>({ row, className = "" }: { row: Row<T>; className?: string }) {
  return (
    <Checkbox
      className={className}
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
}

export default CheckboxBodyCell;
