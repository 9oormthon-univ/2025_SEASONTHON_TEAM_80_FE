import type * as React from "react";
import { cn } from "@/lib/utils";

interface DDayCounterProps extends React.ComponentProps<"div"> {
  days?: number;
  className?: string;
}

const DDayCounter = ({ days, className, ...props }: DDayCounterProps) => {
  const calculateDDay = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextNewYear = new Date(currentYear + 1, 0, 1); // 다음 해 1월 1일

    const timeDiff = nextNewYear.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
  };

  const daysLeft = days ?? calculateDDay();
  const daysStr = daysLeft.toString();

  // 자릿수에 따른 너비 계산
  const getWidth = (days: number) => {
    if (days < 10) return 100;
    if (days < 100) return 110;
    return 120;
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "h-[32px]",
        "bg-white/10",
        "rounded",
        "font-bold text-[14px] text-white",
        className
      )}
      style={{
        width: `${getWidth(daysLeft)}px`,
      }}
      {...props}
    >
      새해까지 D-{daysStr}
    </div>
  );
};

export { DDayCounter };
