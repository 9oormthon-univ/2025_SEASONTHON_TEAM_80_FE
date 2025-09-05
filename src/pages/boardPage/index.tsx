import { useEffect, useRef, useState } from "react";
import ShelfBg from "@/assets/bg_shelf.webp";
import BoardNoteIcon from "@/assets/ic_board_note.svg?react";
import HamburgerIcon from "@/assets/ic_hamburger.svg?react";
import HatIcon from "@/assets/ic_hat.svg?react";
import HeaderIcon from "@/assets/ic_header_logo.svg?react";
import LinkIcon from "@/assets/ic_link.svg?react";
import LuckyPocketIcon from "@/assets/ic_lucky_pocket.svg?react";
import ObjLp from "@/assets/obj_lp.webp";
import { LinkShareButton } from "@/components/ui/link-share-button";
import { Pagination } from "@/components/ui/pagination";

function BoardPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shelfRef = useRef<HTMLImageElement | null>(null);
  const shelfWrapperRef = useRef<HTMLDivElement | null>(null);

  // original pixel positions provided by user
  const ORIGINAL_POS = [
    { id: 1, x: 60, y: 213 },
    { id: 2, x: 148, y: 213 },
    { id: 3, x: 239, y: 213 },
    { id: 4, x: 330, y: 213 },
    { id: 5, x: 60, y: 307 },
    { id: 6, x: 148, y: 307 },
    { id: 7, x: 239, y: 307 },
    { id: 8, x: 330, y: 307 },
    { id: 9, x: 60, y: 400 },
    { id: 10, x: 330, y: 400 },
    { id: 11, x: 60, y: 493 },
    { id: 12, x: 330, y: 493 },
  ];

  // percentages relative to the shelf wrapper
  const [percents, setPercents] = useState<
    { leftPct: number; topPct: number }[] | null
  >(null);

  const POCKET_COORD = { x: 239, y: 213 };
  const HAT_COORD = { x: 60, y: 307 };
  const POCKET_OFFSET = { x: -8, y: 0 };
  const [shiftPx, setShiftPx] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const GLOBAL_DOWN_PX = 12;
  const GLOBAL_LEFT_PX = -2; // move all positioned elements left by 2px
  const [timeRemaining, setTimeRemaining] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  const [moved, setMoved] = useState<Record<number, boolean>>({});

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

  useEffect(() => {
    function computePercents() {
      const img = shelfRef.current;
      const wrap = shelfWrapperRef.current;
      if (!img || !wrap) return;
      const rect = img.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const raw = ORIGINAL_POS.map((pos) => ({
        leftPct: (pos.x / rect.width) * 100,
        topPct: (pos.y / rect.height) * 100,
      }));

      const minLeft = Math.min(...raw.map((r) => r.leftPct));
      const minTop = Math.min(...raw.map((r) => r.topPct));
      const adjusted = raw.map((r) => ({
        leftPct: r.leftPct - minLeft,
        topPct: r.topPct - minTop,
      }));

      const shiftPct = 6; // percent of shelf dimension to shift by
      const shiftX = Math.round((rect.width * shiftPct) / 100);
      const shiftY = Math.round((rect.height * shiftPct) / 100);

      setPercents(adjusted);
      setShiftPx({ x: shiftX, y: shiftY });
    }

    computePercents();
    window.addEventListener("resize", computePercents);
    return () => window.removeEventListener("resize", computePercents);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col pb-[77px]">
      <div className="absolute top-[20px] left-[20px]">
        <HeaderIcon />
      </div>
      <HamburgerIcon className="absolute top-[20px] right-[20px]" />

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

          {percents
            ? percents.map((p, i) => {
                const orig = ORIGINAL_POS[i];
                const id = orig.id;
                // pocket
                if (orig.x === POCKET_COORD.x && orig.y === POCKET_COORD.y) {
                  return (
                    <div
                      key={`lucky-${id}`}
                      style={{
                        position: "absolute",
                        left: `calc(${p.leftPct}% + ${shiftPx.x + POCKET_OFFSET.x - 3}px)`,
                        top: `calc(${p.topPct}% + ${shiftPx.y + POCKET_OFFSET.y + GLOBAL_DOWN_PX}px)`,
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
                        left: `calc(${p.leftPct}% + ${shiftPx.x + GLOBAL_LEFT_PX}px)`,
                        top: `calc(${p.topPct}% + ${shiftPx.y + GLOBAL_DOWN_PX}px)`,
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
                      onClick={() => toggleMoved(id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleMoved(id);
                      }}
                      alt=""
                      src={undefined}
                      style={{
                        position: "absolute",
                        left: `calc(${p.leftPct}% + ${shiftPx.x + GLOBAL_LEFT_PX}px)`,
                        top: `calc(${p.topPct}% + ${shiftPx.y + GLOBAL_DOWN_PX}px)`,
                        width: 60,
                        height: 60,
                        zIndex: 20,
                        cursor: "pointer",
                        transition: "transform 120ms ease",
                        transform: moved[id] ? "translateX(-8px)" : "none",
                      }}
                    />
                    <img
                      key={`cover-${id}`}
                      src={ObjLp}
                      alt={`album-cover-${id}`}
                      style={{
                        position: "absolute",
                        left: `calc(${p.leftPct}% + ${shiftPx.x + coverOffsetPx + 2}px)`,
                        top: `calc(${p.topPct}% + ${shiftPx.y + GLOBAL_DOWN_PX + coverOffsetPx}px)`,
                        width: 48,
                        height: 48,
                        objectFit: "cover",
                        zIndex: 10,
                        transition: "transform 120ms ease",
                        transform: moved[id] ? "translateX(4px)" : "none",
                      }}
                    />
                  </>
                );
              })
            : ORIGINAL_POS.map((pos) => {
                const id = pos.id;
                if (pos.x === POCKET_COORD.x && pos.y === POCKET_COORD.y) {
                  return (
                    <div
                      key={`lucky-fallback-${id}`}
                      style={{
                        position: "absolute",
                        left:
                          pos.x + shiftPx.x + POCKET_OFFSET.x + GLOBAL_LEFT_PX,
                        top:
                          pos.y + shiftPx.y + POCKET_OFFSET.y + GLOBAL_DOWN_PX,
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

                if (pos.x === HAT_COORD.x && pos.y === HAT_COORD.y) {
                  return (
                    <div
                      key={`hat-fallback-${id}`}
                      style={{
                        position: "absolute",
                        left: pos.x + shiftPx.x + GLOBAL_LEFT_PX,
                        top: pos.y + shiftPx.y + GLOBAL_DOWN_PX,
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
                      key={`placeholder-fallback-${id}`}
                      aria-hidden
                      onClick={() => toggleMoved(id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleMoved(id);
                      }}
                      alt=""
                      src={undefined}
                      style={{
                        position: "absolute",
                        left: pos.x + shiftPx.x + GLOBAL_LEFT_PX,
                        top: pos.y + shiftPx.y + GLOBAL_DOWN_PX,
                        width: 60,
                        height: 60,
                        zIndex: 20,
                        cursor: "pointer",
                        transition: "transform 120ms ease",
                        transform: moved[id] ? "translateX(-4px)" : "none",
                      }}
                    />
                    <img
                      key={`cover-fallback-${id}`}
                      src={ObjLp}
                      alt={`album-cover-${id}`}
                      style={{
                        position: "absolute",
                        left:
                          pos.x + shiftPx.x + coverOffsetPx + GLOBAL_LEFT_PX,
                        top: pos.y + shiftPx.y + GLOBAL_DOWN_PX + coverOffsetPx,
                        width: 48,
                        height: 48,
                        objectFit: "cover",
                        zIndex: 10,
                        transition: "transform 120ms ease",
                        transform: moved[id] ? "translateX(4px)" : "none",
                      }}
                    />
                  </>
                );
              })}
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
