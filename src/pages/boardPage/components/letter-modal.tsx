import BgLetter from "@/assets/bg_letterpaper.webp";
import PlayIcon from "@/assets/ic_play.svg?react";
import StampWebp from "@/assets/ic_stamp.webp";
import ObjLp from "@/assets/obj_lp.webp";
import type { BoardMessageData } from "@/types/board";

interface LetterModalProps {
  isOpen: boolean;
  letterOpenId: number | null;
  messageDetail: BoardMessageData | null;
  ownerNickname: string;
  isPlaying: boolean;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onToggleAudio: () => void;
}

export function LetterModal({
  isOpen,
  letterOpenId,
  messageDetail,
  ownerNickname,
  isPlaying,
  overlayRef,
  onClose,
  onToggleAudio,
}: LetterModalProps) {
  if (!isOpen || letterOpenId === null) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "rgba(0,0,0,0.4)",
        zIndex: 1000,
      }}
    >
      {/* ObjLp wrapper placed behind the letter modal, moved up and lowered z-index */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "calc(50% - 300px)",
          transform: "translateX(-50%)",
          width: 200,
          height: 200,
          zIndex: 800,
          pointerEvents: "none",
        }}
      >
        <img
          src={ObjLp}
          alt="obj-lp"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            borderRadius: 8,
          }}
        />
      </div>

      <div
        role="document"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 1001,
          width: 336,
          height: 336,
          backgroundImage: `url(${BgLetter})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* To. label at top-left: 23px from top and left */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 23,
            left: 23,
            fontSize: 14,
            color: "#000",
          }}
          className="font-letter"
        >
          To. {ownerNickname}
        </div>
        
        {/* read-only display box below the To. label: 294x225, font-letter 17px */}
        <div
          className="font-letter"
          style={{
            position: "absolute",
            top: 46,
            left: 23,
            width: 294,
            height: 225,
            fontSize: 17,
            background: "transparent",
            color: "#000",
            lineHeight: "1.2",
            overflow: "auto",
            whiteSpace: "pre-wrap",
            WebkitLineBreak: "anywhere",
            paddingRight: 8,
          }}
        >
          {messageDetail ? (
            <div style={{ marginBottom: 8 }}>
              {messageDetail.content}
            </div>
          ) : (
            <div>로딩 중...</div>
          )}
        </div>

        {/* From. label placed below the scrollable area */}
        <div
          aria-hidden
          className="font-letter"
          style={{
            position: "absolute",
            top: 277,
            left: 23,
            fontSize: 14,
            color: "#000",
          }}
        >
          From. {messageDetail?.senderName}
        </div>
        
        {messageDetail?.coverImageUrl ? (
          <img
            src={messageDetail.coverImageUrl}
            alt={`album-${letterOpenId ?? ""}`}
            aria-hidden
            style={{
              position: "absolute",
              top: 23,
              right: 23,
              width: 30,
              height: 30,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ) : (
          <img
            src={ObjLp}
            alt={`album-${letterOpenId ?? ""}`}
            aria-hidden
            style={{
              position: "absolute",
              top: 23,
              right: 23,
              width: 30,
              height: 30,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        )}

        <img
          src={StampWebp}
          alt="stamp"
          aria-hidden
          style={{
            position: "absolute",
            top: 9,
            right: 36,
            width: 95,
            height: 37,
            objectFit: "cover",
          }}
        />
      </div>
      
      <div className="mx-auto flex w-60 flex-col gap-4">
        <div className="flex flex-row gap-2">
          <div className="flex flex-1 flex-row items-center gap-1 rounded-md bg-white/10 px-4 py-3 backdrop-blur-md">
            <p className="text-base text-white">
              {messageDetail?.songName ?? "곡 제목"}
            </p>
            <p className="text-gray-500 text-xs">
              {messageDetail?.artist ?? "가수"}
            </p>
          </div>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
            onClick={(e) => {
              // prevent overlay click from closing modal when Play button is clicked
              e.stopPropagation();
              onToggleAudio();
            }}
            onKeyDown={(e) => {
              // ensure keyboard interaction also does not close the modal
              e.stopPropagation();
            }}
            aria-label={isPlaying ? "pause" : "play"}
          >
            <PlayIcon />
          </button>
        </div>
      </div>
    </div>
  );
}