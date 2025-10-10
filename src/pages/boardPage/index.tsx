import { useState } from "react";
import { useParams } from "react-router-dom";
import FrameImg from "@/assets/ic_frame.webp";
import { Sidebar } from "@/components/ui/sidebar";
import { AlbumGrid } from "./components/album-grid";
import { BoardHeader } from "./components/board-header";
import { BottomNavigation } from "./components/bottom-navigation";
import { LetterModal } from "./components/letter-modal";
import { useBoardData } from "./hooks/useBoardData";
import { useCountdown } from "./hooks/useCountdown";
import { useLayoutCalculation } from "./hooks/useLayoutCalculation";
import { useLetterModal } from "./hooks/useLetterModal";

function BoardPage() {
  const { shareUri } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Custom hooks
  const {
    currentPage,
    setCurrentPage,
    ownerNickname,
    boardList,
    boardTotalElements,
    totalPages,
    sharedBoardData,
    currentUserBoard,
    boardInfoQuery,
    isSharedBoard,
  } = useBoardData(shareUri);

  const {
    shelfRef,
    frameRef,
    shelfWrapperRef,
    bottomGroupRef,
    shiftPx,
    contentLeft,
    screenWidth,
    bottomGroupHeight,
    frameCenter,
    computeShift,
    getAdjustedPositions,
  } = useLayoutCalculation();

  const timeRemaining = useCountdown(boardInfoQuery?.data?.data?.serverTime);

  const {
    overlayRef,
    letterOpenId,
    setLetterOpenId,
    messageDetail,
    isPlaying,
    toggleAudio,
    closeModal,
  } = useLetterModal(isSharedBoard, boardList, sharedBoardData);

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ paddingTop: 140, paddingBottom: 96 + bottomGroupHeight }}
    >
      <BoardHeader
        ownerNickname={ownerNickname}
        messageCount={
          boardInfoQuery?.data?.data?.messageCount ??
          (isSharedBoard
            ? sharedBoardData?.data?.totalElements
            : boardTotalElements)
        }
        timeRemaining={timeRemaining}
        screenWidth={screenWidth}
        profileImage={boardInfoQuery?.data?.data?.profileImage}
        frameCenter={frameCenter}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      {/* decorative frame image: moved up to sit higher on the page */}
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
        style={{ position: "absolute", top: 60, left: 0 }}
      />

      <div className="relative flex w-full flex-1 flex-col items-center justify-end">
        <AlbumGrid
          boardList={boardList}
          isSharedBoard={isSharedBoard}
          shelfRef={shelfRef}
          shelfWrapperRef={shelfWrapperRef}
          shiftPx={shiftPx}
          contentLeft={contentLeft}
          getAdjustedPositions={getAdjustedPositions}
          onComputeShift={computeShift}
          onAlbumClick={setLetterOpenId}
        />

        <LetterModal
          isOpen={letterOpenId !== null}
          letterOpenId={letterOpenId}
          messageDetail={messageDetail}
          ownerNickname={ownerNickname}
          isPlaying={isPlaying}
          overlayRef={overlayRef}
          onClose={closeModal}
          onToggleAudio={toggleAudio}
        />
      </div>

      <BottomNavigation
        totalPages={
          isSharedBoard && sharedBoardData?.data
            ? sharedBoardData.data.totalPages
            : totalPages
        }
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        ownerNickname={ownerNickname}
        isSharedBoard={isSharedBoard}
        shareUri={shareUri}
        bottomGroupRef={bottomGroupRef}
      />

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
