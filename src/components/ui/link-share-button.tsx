import type * as React from "react";
import { cn } from "@/lib/utils";

interface LinkShareButtonProps extends React.ComponentProps<"button"> {
  className?: string;
  children?: React.ReactNode;
}

// 링크 아이콘 컴포넌트
const LinkIcon = ({ className }: { className?: string }) => (
  <img
    src="/linkIcon.svg"
    alt="링크 아이콘"
    className={className}
    width="24"
    height="24"
  />
);

function LinkShareButton({
  className,
  children,
  ...props
}: LinkShareButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "h-[53px] w-full",
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
      <span>링크 공유</span>
      <LinkIcon className="h-[24px] w-[24px]" />
    </button>
  );
}

export { LinkShareButton };
