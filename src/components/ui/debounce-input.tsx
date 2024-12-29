import { useDebounce } from "@/lib/hooks/useDebounce";
import { ChangeEvent, ComponentProps, forwardRef, useEffect, useState } from "react";
import { Input } from "./input";

export type DebounceInputProps = {
  onDebounceValueChange?: (debounceValue: string) => void;
} & ComponentProps<"input">;

const DebounceInput = forwardRef<HTMLInputElement, DebounceInputProps>(({ onDebounceValueChange, ...props }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedValue !== undefined || debouncedValue !== null) {
      onDebounceValueChange?.(debouncedValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return <Input ref={ref} type="text" value={inputValue} onChange={handleChange} {...props} />;
});

export default DebounceInput
