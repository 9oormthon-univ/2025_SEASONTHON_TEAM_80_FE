import type * as React from "react";
import { cn } from "@/lib/utils";

interface LinkShareButtonProps extends React.ComponentProps<"button"> {
  className?: string;
  label?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
}
function LinkShareButton({
  className,
  label,
  Icon,
  children,
  ...props
}: LinkShareButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "h-[53px] w-full max-w-[450px]",
        "bg-[#8E2D2D]",
        "text-[#FFFFFF]",
        "font-bold text-[20px]",
        "hover:bg-[#7A2525]",
        "focus:outline-none focus:ring-2 focus:ring-[#8E2D2D]/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {label && <span>{label}</span>}
          {Icon && <Icon className="h-[24px] w-[24px]" />}
        </>
      )}
    </button>
  );
}

export { LinkShareButton };
