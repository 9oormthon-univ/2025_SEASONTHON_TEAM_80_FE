import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoardList, getBoardShare, getSharedBoard, getBoardInfo } from "@/apis/board";
import BgLetter from "@/assets/bg_letterpaper.webp";
import ShelfBg from "@/assets/bg_shelf.webp";
import BoardNoteIcon from "@/assets/ic_board_note.svg?react";
import FrameImg from "@/assets/ic_frame.webp";
import HamburgerIcon from "@/assets/ic_hamburger.svg?react";
import HatIcon from "@/assets/ic_hat.svg?react";
import HeaderIcon from "@/assets/ic_header_logo.svg?react";
import LinkIcon from "@/assets/ic_link.svg?react";
import LuckyPocketIcon from "@/assets/ic_lucky_pocket.svg?react";
import PlayIcon from "@/assets/ic_play.svg?react";
import StampWebp from "@/assets/ic_stamp.webp";
import ObjLp from "@/assets/obj_lp.webp";
import DefaultProfile from "@/assets/obj_default_profile.svg";
import { LinkShareButton } from "@/components/ui/link-share-button";
import { Pagination } from "@/components/ui/pagination";
import { Sidebar } from "@/components/ui/sidebar";
import { useAudio } from "@/hooks/useAudio";
import type { BoardListItem, SharedBoardMessage } from "@/types/board";

function BoardPage() {
  const { shareUri } = useParams();
  const isSharedBoard = Boolean(shareUri);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const shelfRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef<HTMLImageElement | null>(null);
  const shelfWrapperRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [ownerNickname, setOwnerNickname] = useState<string>("닉네임");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [boardList, setBoardList] = useState<BoardListItem[]>([]);
  const [boardTotalElements, setBoardTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { data: sharedBoardData } = useQuery({
    queryKey: ["sharedBoard", shareUri, currentPage],
    queryFn: () => getSharedBoard(shareUri ?? "", currentPage, 10),
    enabled: isSharedBoard && Boolean(shareUri),
  });

  const { data: currentUserBoard } = useQuery({
    queryKey: ["currentUserBoard"],
    queryFn: () => getBoardShare(),
    enabled: !isSharedBoard,
  });

  // prefer route shareUri when present, otherwise use current user's shareUri

  // derive shareUri from possible shapes returned by getBoardShare()
  const maybe = currentUserBoard as unknown as Record<string, unknown> | undefined;
  const maybeData = maybe?.data as Record<string, unknown> | undefined;

  const shareUriFromCurrentUser =
    // standard typed shape
    (currentUserBoard as unknown as { data?: { shareUri?: string } })?.data
      ?.shareUri ??
    // top-level or alternative keys
    (maybe && (maybe.shareUri as string | undefined)) ??
    (maybeData && (maybeData.share_uri as string | undefined)) ??
    (maybe && (maybe.share_url as string | undefined));

  const computedShareUri = shareUri ?? shareUriFromCurrentUser;

  // boardInfo query: fetch automatically when a shareUri (route or current user) exists
  const boardInfoQuery = useQuery({
    queryKey: ["boardInfo", computedShareUri],
    queryFn: ({ queryKey }) => {
      const uri = queryKey[1] as string;
      return getBoardInfo(uri);
    },
    enabled: Boolean(computedShareUri),
  });

  // ensure the boardInfo request is made when computedShareUri becomes available
  useEffect(() => {
    if (!computedShareUri) return;
    if (boardInfoQuery.isFetching) return;
    if (boardInfoQuery.data) return;
    // trigger fetch
    void boardInfoQuery.refetch();
  }, [computedShareUri, boardInfoQuery.isFetching, boardInfoQuery.data, boardInfoQuery.refetch]);

  // fetch current user's board list (paginated) when not viewing a shared board
  useEffect(() => {
    let mounted = true;
    if (!isSharedBoard) {
      (async () => {
        try {
          const res = await getBoardList(currentPage, 10, "desc");
          if (!mounted) return;
          // API returns wrapper { success, code, message, data }
          const data = res.data;
          setBoardList(data.content ?? []);
          setBoardTotalElements(
            data.totalElements ?? data.content?.length ?? 0
          );
          setTotalPages(data.totalPages ?? 1);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Failed to load board list", err);
          setBoardList([]);
          setBoardTotalElements(0);
          setTotalPages(1);
        }
      })();
    }

    return () => {
      mounted = false;
    };
  }, [isSharedBoard, currentPage]);

  useEffect(() => {
    // prefer boardInfo name when available (applies to shared and own board)
    const nameFromInfo = boardInfoQuery.data?.data?.name;
    if (nameFromInfo) {
      setOwnerNickname(nameFromInfo);
    } else if (isSharedBoard && sharedBoardData?.nickname) {
      setOwnerNickname(sharedBoardData.nickname);
    }

    // prefer server-provided message count when available
    const msgCount = boardInfoQuery.data?.data?.messageCount;
    if (typeof msgCount === "number") {
      setBoardTotalElements(msgCount);
    }

    // if shared board provides pagination/total info, reflect it
    if (isSharedBoard && sharedBoardData) {
      const mapped = (sharedBoardData.content ?? []).map((s) => ({
        messageId: s.messageId,
        senderName: s.sender,
        content: "",
        songId: "",
        songName: "",
        artist: "",
        coverImageUrl: s.coverImageUrl,
        songUrl: "",
        read: s.read ?? false,
      }));
      setBoardList(mapped);
      setTotalPages(sharedBoardData.totalPages ?? 1);
      setBoardTotalElements(sharedBoardData.totalElements ?? 0);
    }
  }, [isSharedBoard, sharedBoardData, boardInfoQuery.data]);

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

  // align pocket/hat coords to existing ORIGINAL_POS entries so they render
  const POCKET_COORD = { x: 175, y: 102 };
  const HAT_COORD = { x: 0, y: 200 };
  const POCKET_OFFSET = { x: -8, y: 0 };
  const [shiftPx, setShiftPx] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const GLOBAL_DOWN_PX = 0; // removed top margin
  const GLOBAL_LEFT_PX = 0; // removed left margin
  const [timeRemaining, setTimeRemaining] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  const [frameCenter, setFrameCenter] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [letterOpenId, setLetterOpenId] = useState<number | null>(null);
  const [messageDetail, setMessageDetail] = useState<
    import("@/types/board").BoardMessageData | null
  >(null);

  const { isPlaying, playAudio, stopAudio, toggleAudio } = useAudio();

  useEffect(() => {
    // use a fixed server time as requested
  const serverTimeStr = boardInfoQuery?.data?.data?.serverTime ?? new Date().toISOString();
    const serverNow = new Date(serverTimeStr);
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
  }, [boardInfoQuery?.data?.data?.serverTime]);

  const computeShift = useCallback(() => {
    const img = shelfRef.current;
    const wrap = shelfWrapperRef.current;
    if (!img || !wrap) return;
    const rect = img.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const shiftPct = 6;
    const shiftX = Math.round((rect.width * shiftPct) / 100);
    const shiftY = Math.round((rect.height * shiftPct) / 100);

    setShiftPx({ x: shiftX, y: shiftY });
  }, []);

  const computeFrameCenter = useCallback(() => {
    const img = frameRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setFrameCenter({ x: centerX, y: centerY });
  }, []);

  useEffect(() => {
    computeShift();
    computeFrameCenter();
    window.addEventListener("resize", computeShift);
    window.addEventListener("resize", computeFrameCenter);
    return () => {
      window.removeEventListener("resize", computeShift);
      window.removeEventListener("resize", computeFrameCenter);
    };
  }, [computeShift, computeFrameCenter]);

  useEffect(() => {
    // recompute frame center when needed
    computeFrameCenter();
  }, [computeFrameCenter]);

  useEffect(() => {
    if (letterOpenId !== null) {
      // focus overlay so keyboard events (Escape) are captured
      overlayRef.current?.focus();
    }
  }, [letterOpenId]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (letterOpenId === null) {
        setMessageDetail(null);
        stopAudio();
        return;
      }

      // determine messageId from current data (shared or boardList)
      const posIndex = letterOpenId - 1;
      const sharedContent = sharedBoardData?.content ?? [];
      const possible = isSharedBoard
        ? sharedContent[posIndex]
        : boardList[posIndex];
      const messageId = possible?.messageId;
      if (!messageId) return;

      try {
        const res = await (await import("@/apis/board")).getBoardDetail(
          messageId
        );
        if (!mounted) return;
        setMessageDetail(res.data ?? null);

        // Start playing music if songUrl is available
        if (res.data?.songUrl) {
          playAudio(res.data.songUrl).catch((error) => {
            console.error("Failed to start audio playback:", error);
          });
        }
      } catch (err) {
        console.error("Failed to load message detail", err);
        setMessageDetail(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [
    letterOpenId,
    isSharedBoard,
    boardList,
    sharedBoardData,
    playAudio,
    stopAudio,
  ]);

  return (
    <div className="relative flex min-h-screen flex-col pb-[77px]">
      <div className="absolute top-[20px] left-[20px]">
        <HeaderIcon />
      </div>
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-[20px] right-[20px] z-10 cursor-pointer"
      >
        <HamburgerIcon />
      </button>

      {/* decorative frame image: top 99px, flush left */}
      <img
        ref={frameRef}
        src={FrameImg}
        alt=""
        aria-hidden
        onLoad={() => {
          // compute center when the frame image has loaded
          setTimeout(() => {
            const ev = new Event("resize");
            window.dispatchEvent(ev);
          }, 0);
        }}
        style={{ position: "absolute", top: 99, left: 0 }}
      />

      {/* avatar centered on the frame */}
      <img
        src={boardInfoQuery?.data?.data?.profileImage ?? DefaultProfile}
        alt="profile"
        style={{
          position: "fixed",
          left: frameCenter.x || 0,
          top: frameCenter.y || 0,
          transform: "translate(-50%, -50%)",
          width: 36,
          height: 36,
          borderRadius: 18,
          objectFit: "cover",
          zIndex: 30,
          pointerEvents: "none",
        }}
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
                총 {boardInfoQuery?.data?.data?.messageCount ?? (isSharedBoard ? sharedBoardData?.totalElements : boardTotalElements) ?? "00"} 개 음반
              </span>
            </div>
          </div>
        </div>
        <div ref={shelfWrapperRef} className="relative mb-8 inline-block">
          <img
            ref={shelfRef}
            src={ShelfBg}
            onLoad={computeShift}
            className="block h-auto max-w-full"
            alt="shelf"
          />

          {ORIGINAL_POS.map((orig) => {
            const id = orig.id;
            // pocket
            if (orig.x === POCKET_COORD.x && orig.y === POCKET_COORD.y) {
              return (
                <div
                  key={`lucky-${id}`}
                  style={{
                    position: "absolute",
                    left:
                      orig.x + shiftPx.x + POCKET_OFFSET.x - 3 + GLOBAL_LEFT_PX,
                    top: orig.y + shiftPx.y + POCKET_OFFSET.y + GLOBAL_DOWN_PX,
                    width: 78,
                    height: 78,
                  }}
                >
                  <LuckyPocketIcon style={{ width: "100%", height: "100%" }} />
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

            // choose item for this slot depending on board type
            const sharedContent = sharedBoardData?.content ?? [];
            const item = isSharedBoard
              ? sharedContent[id - 1]
              : boardList[id - 1];

            // if there is no item for this slot, render nothing
            if (!item) return null;

            return (
              <div
                key={`slot-${id}`}
                style={{ position: "absolute", left: 0, top: 0 }}
              >
                <img
                  key={`placeholder-${id}`}
                  aria-hidden
                  onClick={() => {
                    if (!isSharedBoard) setLetterOpenId(id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (!isSharedBoard) setLetterOpenId(id);
                    }
                  }}
                  alt=""
                  src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  style={{
                    position: "absolute",
                    left: orig.x + shiftPx.x + GLOBAL_LEFT_PX,
                    top: orig.y + shiftPx.y + GLOBAL_DOWN_PX,
                    width: 60,
                    height: 60,
                    zIndex: 10,
                    cursor: "pointer",
                    transition: "transform 120ms ease",
                    transform: "none",
                  }}
                />

                <button
                  key={`cover-${id}`}
                  type="button"
                  aria-label={`album-cover-${id}`}
                  onClick={() => {
                    if (!isSharedBoard) setLetterOpenId(id);
                  }}
                  style={{
                    position: "absolute",
                    left:
                      orig.x + shiftPx.x + coverOffsetPx + 2 + GLOBAL_LEFT_PX,
                    top: orig.y + shiftPx.y + GLOBAL_DOWN_PX + coverOffsetPx,
                    width: 48,
                    height: 48,
                    padding: 0,
                    border: "none",
                    background: "transparent",
                    zIndex: 20,
                    transition: "transform 120ms ease",
                    transform: "none",
                    cursor: "pointer",
                  }}
                >
                  {isSharedBoard
                    ? (() => {
                        const sharedItem = item as SharedBoardMessage;
                        return (
                          <img
                            src={sharedItem.coverImageUrl}
                            alt={`album-cover-${sharedItem.messageId}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        );
                      })()
                    : (() => {
                        const boardItem = item as BoardListItem;
                        return (
                          <img
                            src={boardItem.coverImageUrl}
                            alt={`album-cover-${boardItem.messageId}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        );
                      })()}
                </button>
              </div>
            );
          })}

          {letterOpenId !== null && (
            <div
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              onClick={() => {
                setLetterOpenId(null);
                stopAudio();
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setLetterOpenId(null);
                  stopAudio();
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
                  From. 여섯글자
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
                      toggleAudio();
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
          )}
        </div>
        <div className="mb-24">
          <Pagination
            totalPages={
              isSharedBoard && sharedBoardData
                ? sharedBoardData.totalPages
                : totalPages
            }
            initialPage={currentPage + 1}
            onPageChange={(page) => setCurrentPage(page - 1)}
          />
        </div>
      </div>

      <div className="fixed right-0 bottom-0 left-0 flex justify-center">
        <LinkShareButton
          label={
            isSharedBoard ? `${ownerNickname}님에게 마음 전달하기` : "링크 공유"
          }
          Icon={LinkIcon}
          className="w-full max-w-[450px]"
          isSharedBoard={isSharedBoard}
          shareUri={shareUri}
        />
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsSidebarOpen(false);
              }
            }}
            aria-label="사이드바 닫기"
          />
          <Sidebar
            nickname={ownerNickname}
            onClose={() => setIsSidebarOpen(false)}
            shareUri={
              isSharedBoard ? shareUri : currentUserBoard?.data?.shareUri
            }
          />
        </div>
      )}
    </div>
  );
}

export default BoardPage;
