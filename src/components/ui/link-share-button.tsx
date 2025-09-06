import type * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useShare } from "@/hooks/useShare";
import { cn } from "@/lib/utils";

interface LinkShareButtonProps extends React.ComponentProps<"button"> {
  className?: string;
  label?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
  onShareSuccess?: (method: "native" | "clipboard", url?: string) => void;
  onShareError?: (error: unknown) => void;
  isSharedBoard?: boolean;
  shareUri?: string;
}

function LinkShareButton({
  className,
  label = "링크 공유하기",
  Icon,
  children,
  onShareSuccess,
  onShareError,
  isSharedBoard = false,
  ...props
}: LinkShareButtonProps) {
  const { shareBoard, isSharing } = useShare();
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (isSharedBoard) {
      navigate(ROUTES.LETTER.GUIDE);
      return;
    }

    try {
      const result = await shareBoard();

      if (result.success) {
        if (result.method === "clipboard") {
          onShareSuccess?.(result.method, result.url);
          setShowCopyFeedback(true);
          setTimeout(() => setShowCopyFeedback(false), 3000);
        } else {
          onShareSuccess?.(result.method);
        }
      } else {
        onShareError?.(result.error);
        console.error("Share failed with error:", result.error);
      }
    } catch (error) {
      console.error("LinkShareButton: Error in handleClick:", error);
      onShareError?.(error);
    }
  };

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
      onClick={handleClick}
      disabled={!isSharedBoard && isSharing}
      {...props}
    >
      {children ?? (
        <>
          <span>
            {isSharedBoard
              ? label
              : isSharing
                ? "공유 중..."
                : showCopyFeedback
                  ? "링크가 복사되었습니다!"
                  : label}
          </span>
          {Icon && <Icon className="h-[24px] w-[24px]" />}
        </>
      )}
    </button>
  );
}

export { LinkShareButton };
