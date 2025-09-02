import type * as React from "react";
import KakaoSvg from "@/assets/ic_kakao.svg?react";
import { cn } from "@/lib/utils";

interface KakaoLoginButtonProps extends React.ComponentProps<"button"> {
  className?: string;
  children?: React.ReactNode;
}

// 카카오 로고 SVG 컴포넌트
const KakaoIcon = ({ className }: { className?: string }) => (
  <KakaoSvg className={className} width={27} height={27} />
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
        "bg-kakao-100",
        "text-[#3B1E1E]",
        "text-[16px]",
        "rounded-[8px]",
        "font-bold",
        "hover:bg-kakao-100/90",
        "focus:outline-none focus:ring-2 focus:ring-kakao-100/50",
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
