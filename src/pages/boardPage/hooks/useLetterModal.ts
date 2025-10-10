import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/hooks/useAudio";
import type {
  BoardListItem,
  SharedBoardMessage,
  SharedBoardResponse,
} from "@/types/board";

export function useLetterModal(
  isSharedBoard: boolean,
  boardList: BoardListItem[] | SharedBoardMessage[],
  sharedBoardData?: SharedBoardResponse
) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [letterOpenId, setLetterOpenId] = useState<number | null>(null);
  const [messageDetail, setMessageDetail] = useState<
    import("@/types/board").BoardMessageData | null
  >(null);

  const { isPlaying, playAudio, stopAudio, toggleAudio } = useAudio();

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
      const sharedContent = sharedBoardData?.data?.content ?? [];
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

        // Start playing music if musicUrl is available
        if (res.data?.musicUrl) {
          playAudio(res.data.musicUrl).catch((error) => {
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
      // Always stop audio when letter is closed
      stopAudio();
    };
  }, [
    letterOpenId,
    isSharedBoard,
    boardList,
    sharedBoardData,
    playAudio,
    stopAudio,
  ]);

  const closeModal = () => {
    setLetterOpenId(null);
    stopAudio();
  };

  return {
    overlayRef,
    letterOpenId,
    setLetterOpenId,
    messageDetail,
    isPlaying,
    toggleAudio,
    closeModal,
  };
}
