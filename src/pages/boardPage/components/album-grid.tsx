import ShelfBg from "@/assets/bg_shelf.webp";
import HatIcon from "@/assets/ic_hat.svg?react";
import LuckyPocketIcon from "@/assets/ic_lucky_pocket.svg?react";
import type { BoardListItem, SharedBoardMessage } from "@/types/board";

interface AlbumGridProps {
  boardList: BoardListItem[];
  sharedBoardData?: { content?: SharedBoardMessage[] };
  isSharedBoard: boolean;
  shelfRef: React.RefObject<HTMLImageElement | null>;
  shelfWrapperRef: React.RefObject<HTMLDivElement | null>;
  shiftPx: { x: number; y: number };
  contentLeft: number;
  getAdjustedPositions: () => Array<{ id: number; x: number; y: number }>;
  onComputeShift: () => void;
  onAlbumClick: (id: number) => void;
}

export function AlbumGrid({
  boardList,
  sharedBoardData,
  isSharedBoard,
  shelfRef,
  shelfWrapperRef,
  shiftPx,
  contentLeft,
  getAdjustedPositions,
  onComputeShift,
  onAlbumClick,
}: AlbumGridProps) {
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
  const GLOBAL_DOWN_PX = 0; // removed top margin
  const GLOBAL_LEFT_PX = -16; // shift everything 8px left
  const coverOffsetPx = 6;

  return (
    <div ref={shelfWrapperRef} className="relative mb-8 inline-block">
      <img
        ref={shelfRef}
        src={ShelfBg}
        onLoad={onComputeShift}
        className="block h-auto max-w-full"
        alt="shelf"
      />

      {getAdjustedPositions().map((orig) => {
        const id = orig.id;
        
        // pocket
        if (
          ORIGINAL_POS.find((p) => p.id === id)?.x === POCKET_COORD.x &&
          ORIGINAL_POS.find((p) => p.id === id)?.y === POCKET_COORD.y
        ) {
          return (
            <div
              key={`lucky-${id}`}
              style={{
                position: "absolute",
                left:
                  contentLeft +
                  orig.x +
                  shiftPx.x +
                  POCKET_OFFSET.x -
                  3 +
                  GLOBAL_LEFT_PX,
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
        if (
          ORIGINAL_POS.find((p) => p.id === id)?.x === HAT_COORD.x &&
          ORIGINAL_POS.find((p) => p.id === id)?.y === HAT_COORD.y
        ) {
          return (
            <div
              key={`hat-${id}`}
              style={{
                position: "absolute",
                left: contentLeft + orig.x + shiftPx.x + GLOBAL_LEFT_PX,
                top: orig.y + shiftPx.y + GLOBAL_DOWN_PX,
                width: 68,
                height: 100,
              }}
            >
              <HatIcon style={{ width: "100%", height: "100%" }} />
            </div>
          );
        }

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
                if (!isSharedBoard) onAlbumClick(id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (!isSharedBoard) onAlbumClick(id);
                }
              }}
              alt=""
              src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              style={{
                position: "absolute",
                left: contentLeft + orig.x + shiftPx.x + GLOBAL_LEFT_PX,
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
                if (!isSharedBoard) onAlbumClick(id);
              }}
              style={{
                position: "absolute",
                left:
                  contentLeft +
                  orig.x +
                  shiftPx.x +
                  coverOffsetPx +
                  2 +
                  GLOBAL_LEFT_PX,
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
    </div>
  );
}