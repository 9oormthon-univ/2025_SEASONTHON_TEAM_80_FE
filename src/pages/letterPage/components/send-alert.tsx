import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";
import WarnIcon from "@/assets/ic_warn.svg?react";

interface SendAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function SendAlert({ isOpen, onClose, onConfirm }: SendAlertProps) {
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
        role="dialog"
        aria-modal="true"
        aria-label="보내기 확인"
        aria-describedby={descId}
        className="relative bg-white shadow-lg"
        style={{
          width: "425px",
          height: "264px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
      >
        {/* 경고 아이콘 - 상단 중앙에서 23px 여백 */}
        <div
          className="-translate-x-1/2 absolute left-1/2 transform"
          style={{ top: "30px" }}
        >
          {/* 원형 배경 */}
          <div
            className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "rgb(142 45 45 / 0.03)", // --color-red-100 3%
            }}
          />
          <WarnIcon className="relative z-10" aria-hidden="true" focusable="false" />
        </div>

        <div
          className="flex h-full flex-col justify-between px-6 pt-14 pb-5"
          style={{ paddingTop: "55px" }}
        >
          {/* 메시지 */}
          <div className="text-center">
            <p
              id={descId}
              className="text-gray-900 leading-relaxed"
              style={{ fontSize: "20px", marginTop: "16px" }}
            >
              새해 첫 곡과 메시지는{" "}
              <strong>
                한 번 보내면
                <br />
                다시 고칠 수 없는 특별한 기록
              </strong>
              이 됩니다.
              <br />
              보내기 전에 마지막으로 확인해 주세요.
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className="flex" style={{ gap: "16px", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 font-bold text-white transition-colors"
              style={{
                backgroundColor: "rgb(75 59 51)", // --color-brown-200
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              취소
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 px-4 py-3 font-bold text-white transition-colors"
              style={{
                backgroundColor: "rgb(142 45 45)", // --color-red-100
                borderRadius: "8px",
                fontSize: "16px",
              }}
              ref={confirmRef}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
