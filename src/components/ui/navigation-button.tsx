import type * as React from "react";
import { cn } from "@/lib/utils";

interface NavigationButtonProps extends React.ComponentProps<"button"> {
  className?: string;
  children?: React.ReactNode;
  active?: boolean;
}

function NavigationButton({
  className,
  children,
  active = false,
  ...props
}: NavigationButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        "h-[46px] w-[360px]",
        "text-[16px]",
        "rounded-[8px]",
        "font-bold",
        "transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed",
        active
          ? [
              "bg-[#8E2D2D] text-[#FFFFFF]",
              "hover:bg-[#7A2525]",
              "focus:ring-[#8E2D2D]/50",
            ]
          : [
              "bg-[#B3B3B3] text-[#8C8C8C]",
              "hover:bg-[#A0A0A0]",
              "focus:ring-[#B3B3B3]/50",
            ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { NavigationButton };
