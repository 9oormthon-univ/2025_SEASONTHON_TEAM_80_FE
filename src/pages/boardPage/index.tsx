import { useEffect, useRef, useState } from "react";
import BgLetter from "@/assets/bg_letterpaper.webp";
import ShelfBg from "@/assets/bg_shelf.webp";
import BoardNoteIcon from "@/assets/ic_board_note.svg?react";
import HamburgerIcon from "@/assets/ic_hamburger.svg?react";
import HatIcon from "@/assets/ic_hat.svg?react";
import HeaderIcon from "@/assets/ic_header_logo.svg?react";
import LinkIcon from "@/assets/ic_link.svg?react";
import LuckyPocketIcon from "@/assets/ic_lucky_pocket.svg?react";
import StampWebp from "@/assets/ic_stamp.webp";
import FrameImg from "@/assets/ic_frame.webp";
import ObjLp from "@/assets/obj_lp.webp";
import { LinkShareButton } from "@/components/ui/link-share-button";
import { Pagination } from "@/components/ui/pagination";

function BoardPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shelfRef = useRef<HTMLImageElement | null>(null);
  const shelfWrapperRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // original pixel positions adjusted towards top-left with reduced top margin
  const ORIGINAL_POS = [
  { id: 1, x: 0, y: 10 },
    { id: 2, x: 85, y: 10 },
    { id: 3, x: 175, y: 10 },
    { id: 4, x: 265, y: 10 },
  { id: 5, x: 0, y: 102 },
    { id: 6, x: 85, y: 102 },
    { id: 7, x: 175, y: 102 },
    { id: 8, x: 265, y: 102 },
  { id: 9, x: 0, y: 200 },
    { id: 10, x: 265, y: 200 },
  { id: 11, x: 0, y: 290 },
    { id: 12, x: 265, y: 290 },
  ];

  const POCKET_COORD = { x: 190, y: 120 }; // adjusted for reduced top margin
  const HAT_COORD = { x: 10, y: 200 }; // adjusted for reduced top margin
  const POCKET_OFFSET = { x: -8, y: 0 };
  const [shiftPx, setShiftPx] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [measured, setMeasured] = useState(false);
  const GLOBAL_DOWN_PX = 0; // removed top margin
  const GLOBAL_LEFT_PX = 0; // removed left margin
  const [timeRemaining, setTimeRemaining] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  const [moved, setMoved] = useState<Record<number, boolean>>({});
  const [letterOpenId, setLetterOpenId] = useState<number | null>(null);

  function toggleMoved(index: number) {
    setMoved((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  useEffect(() => {
    // use a fixed server time as requested
    const serverNow = new Date("2025-09-05T06:00:00Z");
    const startClient = Date.now();

    function update() {
      const elapsed = Date.now() - startClient;
      const currentServer = new Date(serverNow.getTime() + elapsed);

      const year = currentServer.getUTCFullYear();
      const target = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0));
      let diffMs = target.getTime() - currentServer.getTime();
      if (diffMs < 0) diffMs = 0;

      const totalSec = Math.floor(diffMs / 1000);
      const d = Math.floor(totalSec / 86400);
      const h = Math.floor((totalSec % 86400) / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;

      setTimeRemaining({ d, h, m, s });
    }

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  function computeShift() {
    const img = shelfRef.current;
    const wrap = shelfWrapperRef.current;
    if (!img || !wrap) return;
    const rect = img.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const shiftPct = 6;
    const shiftX = Math.round((rect.width * shiftPct) / 100);
    const shiftY = Math.round((rect.height * shiftPct) / 100);

    setShiftPx({ x: shiftX, y: shiftY });
    setMeasured(true);
  }

  useEffect(() => {
    computeShift();
    window.addEventListener("resize", computeShift);
    return () => window.removeEventListener("resize", computeShift);
  }, []);

  useEffect(() => {
    if (letterOpenId !== null) {
      // focus overlay so keyboard events (Escape) are captured
      overlayRef.current?.focus();
    }
  }, [letterOpenId]);

  return (
    <div className="relative flex min-h-screen flex-col pb-[77px]">
      <div className="absolute top-[20px] left-[20px]">
        <HeaderIcon />
      </div>
      <HamburgerIcon className="absolute top-[20px] right-[20px]" />

      {/* decorative frame image: top 99px, flush left */}
      <img
        src={FrameImg}
        alt=""
        aria-hidden
        style={{ position: "absolute", top: 99, left: 0 }}
      />

      {/* fixed-server countdown to next Jan 1 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 26,
        }}
      >
        <span className="text-[12px] text-brown-100">
          {`${timeRemaining.d} D ${timeRemaining.h} H ${timeRemaining.m} M ${timeRemaining.s} S`}
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative flex w-full flex-1 flex-col items-center justify-end"
      >
        <div className="absolute top-20 left-[155px] mt-[20px]">
          <span className="font-primary text-[20px] text-brown-100">
            닉네임 님의 LP 보드
          </span>
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
                총 00개 음반
              </span>
            </div>
          </div>
        </div>
        <div ref={shelfWrapperRef} className="relative mb-8 inline-block">
          <img
            ref={shelfRef}
            src={ShelfBg}
            className="block h-auto max-w-full"
            alt="shelf"
          />

          {measured && ORIGINAL_POS.map((orig) => {
            const id = orig.id;
            // pocket
            if (orig.x === POCKET_COORD.x && orig.y === POCKET_COORD.y) {
              return (
                <div
                  key={`lucky-${id}`}
                  style={{
                    position: "absolute",
                    left: orig.x + shiftPx.x + POCKET_OFFSET.x - 3 + GLOBAL_LEFT_PX,
                    top: orig.y + shiftPx.y + POCKET_OFFSET.y + GLOBAL_DOWN_PX,
                    width: 78,
                    height: 78,
                  }}
                >
                  <LuckyPocketIcon
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              );
            }

            // hat
            if (orig.x === HAT_COORD.x && orig.y === HAT_COORD.y) {
              return (
                <div
                  key={`hat-${id}`}
                  style={{
                    position: "absolute",
                    left: orig.x + shiftPx.x + GLOBAL_LEFT_PX,
                    top: orig.y + shiftPx.y + GLOBAL_DOWN_PX,
                    width: 68,
                    height: 100,
                  }}
                >
                  <HatIcon style={{ width: "100%", height: "100%" }} />
                </div>
              );
            }

            const coverOffsetPx = 6;
            return (
              <>
                <img
                  key={`placeholder-${id}`}
                  aria-hidden
                  onClick={() => {
                    toggleMoved(id);
                    window.setTimeout(() => setLetterOpenId(id), 120);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleMoved(id);
                      window.setTimeout(() => setLetterOpenId(id), 120);
                    }
                  }}
                  alt=""
                  src="undefined"
                  style={{
                    position: "absolute",
                    left: orig.x + shiftPx.x + GLOBAL_LEFT_PX,
                    top: orig.y + shiftPx.y + GLOBAL_DOWN_PX,
                    width: 60,
                    height: 60,
                    zIndex: 20,
                    cursor: "pointer",
                    pointerEvents: moved[id] ? "none" : "auto",
                    transition: "transform 120ms ease",
                    transform: moved[id] ? "translateX(-8px)" : "none",
                  }}
                />

                <button
                  key={`cover-${id}`}
                  type="button"
                  aria-label={`album-cover-${id}`}
                  onClick={() => setLetterOpenId(id)}
                  style={{
                    position: "absolute",
                    left: orig.x + shiftPx.x + coverOffsetPx + 2 + GLOBAL_LEFT_PX,
                    top: orig.y + shiftPx.y + GLOBAL_DOWN_PX + coverOffsetPx,
                    width: 48,
                    height: 48,
                    padding: 0,
                    border: "none",
                    background: "transparent",
                    zIndex: 10,
                    transition: "transform 120ms ease",
                    transform: moved[id] ? "translateX(4px)" : "none",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={ObjLp}
                    alt={`album-cover-${id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </button>
              </>
            );
          })}

          {letterOpenId !== null && (
            <div
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              onClick={() => setLetterOpenId(null)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setLetterOpenId(null);
              }}
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.4)",
                zIndex: 1000,
              }}
            >
              <div
                role="document"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                style={{
                  position: "relative",
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
                  To. 최대여섯글자
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
                  {`안녕하세요.
새해 복 많이 받으세요.
올 한 해도 건강하시고 행복하세요.
이 편지는 테스트용으로 여러 줄을 채워서 스크롤이 필요한지 확인합니다.
더 많은 텍스트를 넣어 스크롤을 확인해 주세요.
감사합니다.
테스트 라인 1
테스트 라인 2
테스트 라인 3
테스트 라인 4`}
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
                  From. 여섯글자
                </div>
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
            </div>
          )}
        </div>
        <div className="mb-24">
          <Pagination totalPages={10} />
        </div>
      </div>

      <div className="fixed right-0 bottom-0 left-0 flex justify-center">
        <LinkShareButton
          label="링크 공유"
          Icon={LinkIcon}
          className="w-full max-w-[450px]"
        />
      </div>
    </div>
  );
}

export default BoardPage;
