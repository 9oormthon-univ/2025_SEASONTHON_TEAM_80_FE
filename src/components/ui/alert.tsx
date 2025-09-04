import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import WarnIcon from "@/assets/ic_warn.svg?react";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leftButtonText: string;
  rightButtonText: string;
  content: ReactNode;
}

export function Alert({
  isOpen,
  onClose,
  onConfirm,
  leftButtonText,
  rightButtonText,
  content,
}: AlertProps) {
  const [mounted, setMounted] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const descId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen || !mounted || typeof document === "undefined") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    confirmRef.current?.focus();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, mounted, onClose]);

  if (!isOpen || !mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-end justify-center"
      style={{
        zIndex: 90,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label="확인 알림"
        aria-describedby={descId}
        className="relative bg-white shadow-lg"
        style={{
          width: "425px",
          minHeight: "200px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
      >
        <div
          className="-translate-x-1/2 absolute left-1/2 transform"
          style={{ top: "30px" }}
        >
          <div
            className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "rgb(142 45 45 / 0.03)", // --color-red-100 3%
            }}
          />
          <WarnIcon
            className="relative z-10"
            aria-hidden="true"
            focusable="false"
          />
        </div>

        <div
          className="flex flex-col px-6 pt-14 pb-5"
          style={{ paddingTop: "55px" }}
        >
          {/* 메시지 */}
          {content && (
            <div className="mb-6 text-center">
              <div
                id={descId}
                className="text-gray-900 leading-relaxed"
                style={{ fontSize: "20px", marginTop: "16px" }}
              >
                {content}
              </div>
            </div>
          )}

          {/* 버튼 영역 */}
          <div className="flex" style={{ gap: "16px", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 font-bold transition-colors"
              style={{
                backgroundColor: "rgba(75, 59, 51, 0.2)", // brown-200 with opacity-200
                color: "rgb(75, 59, 51)", // brown-200 text
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              {leftButtonText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 px-4 py-3 font-bold transition-colors"
              style={{
                backgroundColor: "#8E2D2D", // 8E2D2D background
                color: "#ffffff", // ffffff text
                borderRadius: "8px",
                fontSize: "16px",
              }}
              ref={confirmRef}
            >
              {rightButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
