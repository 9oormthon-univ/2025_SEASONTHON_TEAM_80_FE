import BoardNoteIcon from "@/assets/ic_board_note.svg?react";
import HamburgerIcon from "@/assets/ic_hamburger.svg?react";
import HeaderIcon from "@/assets/ic_header_logo.svg?react";
import DefaultProfile from "@/assets/obj_default_profile.svg";

interface TimeRemaining {
  d: number;
  h: number;
  m: number;
  s: number;
}

interface BoardHeaderProps {
  ownerNickname: string;
  messageCount?: number;
  timeRemaining: TimeRemaining;
  screenWidth: number;
  profileImage?: string;
  frameCenter: { x: number; y: number };
  onMenuClick: () => void;
}

export function BoardHeader({
  ownerNickname,
  messageCount,
  timeRemaining,
  screenWidth,
  profileImage,
  frameCenter,
  onMenuClick,
}: BoardHeaderProps) {
  return (
    <>
      {/* Header Logo */}
      <div
        className="fixed z-40"
        style={{ top: 20, left: screenWidth >= 450 ? 10 : 12 }}
      >
        <HeaderIcon />
      </div>

      {/* Hamburger Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="fixed z-40 cursor-pointer"
        style={{ top: 20, right: screenWidth >= 450 ? 10 : 20 }}
        aria-label="메뉴 열기"
      >
        <HamburgerIcon />
      </button>

      {/* Countdown Timer */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          top: 26,
          zIndex: 40,
        }}
      >
        <span className="text-[12px] text-brown-100">
          {`${timeRemaining.d} D ${timeRemaining.h} H ${timeRemaining.m} M ${timeRemaining.s} S`}
        </span>
      </div>

      {/* Profile Avatar */}
      <img
        src={profileImage ?? DefaultProfile}
        alt="profile"
        style={{
          position: "fixed",
          left: frameCenter.x ?? 0,
          top: frameCenter.y ?? 0,
          transform: "translate(-50%, -50%)",
          width: 36,
          height: 36,
          borderRadius: 18,
          objectFit: "cover",
          zIndex: 40,
          pointerEvents: "none",
        }}
      />

      {/* Board Title and Count */}
      <div
        className="fixed z-40"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(calc(-20%))",
          marginTop: 20,
        }}
      >
        <div className="flex items-center gap-3">
          <span className="font-primary text-[20px] text-brown-100">
            {ownerNickname} 님의 LP 보드
          </span>
        </div>
        <div
          className="mt-3 flex items-center"
          style={{ width: 98, height: 25 }}
        >
          <div
            className="flex items-center gap-1 px-2"
            style={{
              background: "rgba(230,218,202,0.10)",
              color: "#E6DACA",
              height: 25,
              fontSize: 12,
              borderRadius: 6,
              width: 98,
            }}
          >
            <BoardNoteIcon style={{ width: 12, height: 12 }} />
            <span className="ml-1 whitespace-nowrap font-bold">
              총 {messageCount ?? "00"} 개 음반
            </span>
          </div>
        </div>
      </div>
    </>
  );
}