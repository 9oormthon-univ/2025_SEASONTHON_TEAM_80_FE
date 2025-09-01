import type * as React from "react";
import { cn } from "@/lib/utils";

interface KakaoLoginButtonProps extends React.ComponentProps<"button"> {
  className?: string;
  children?: React.ReactNode;
}

// 카카오 로고 SVG 컴포넌트
const KakaoIcon = ({ className }: { className?: string }) => (
  <img
    src="/kakaoIcon.svg"
    alt="카카오 로고"
    className={className}
    width="27"
    height="27"
  />
);

function KakaoLoginButton({
  className,
  children,
  ...props
}: KakaoLoginButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "h-[46px] w-[calc(100vw-32px)] max-w-[360px]",
        "bg-[#F4E237]",
        "text-[#3B1E1E]",
        "text-[16px]",
        "rounded-[8px]",
        "font-bold",
        "hover:bg-[#F4E237]/90",
        "focus:outline-none focus:ring-2 focus:ring-[#F4E237]/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors",
        className
      )}
      {...props}
    >
      <KakaoIcon className="h-[27px] w-[27px]" />
      {children || "카카오로 로그인"}
    </button>
  );
}

export { KakaoLoginButton };
