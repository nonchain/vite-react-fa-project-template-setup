import { cn } from "@/lib/utils";

function LoadingSpinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg" | "xl"; className?: string }) {
  const sizes = {
    sm: "h-10 w-10 border-[3px] md:h-12 md:w-12",
    md: "h-12 w-12 border-[4px] md:h-14 md:w-14",
    lg: "h-14 w-14 border-[4px] md:h-16 md:w-16",
    xl: "h-20 w-20 border-[4px] md:h-24 md:w-24",
  };
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative">
        <div
          className={cn(
            sizes[size],
            "animate-spin inline-block border-current border-t-transparent text-blue-600 rounded-full"
          )}
          role="status"
          aria-label="loading"
        ></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
