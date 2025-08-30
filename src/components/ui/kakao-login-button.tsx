import * as React from "react"
import { cn } from "@/lib/utils"

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
        "w-[360px] h-[53px]",
        "bg-[#F4E237]",
        "text-[#3B1E1E]",
        "text-[20px]",
        "rounded-[8px]",
        "font-bold",
        "hover:bg-[#F4E237]/90",
        "focus:outline-none focus:ring-2 focus:ring-[#F4E237]/50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transition-colors",
        className
      )}
      {...props}
    >
      <KakaoIcon className="w-[27px] h-[27px]" />
      {children || "카카오로 계속하기"}
    </button>
  );
}

export { KakaoLoginButton };
