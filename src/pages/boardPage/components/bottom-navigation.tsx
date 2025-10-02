import LinkIcon from "@/assets/ic_link.svg?react";
import { LinkShareButton } from "@/components/ui/link-share-button";
import { Pagination } from "@/components/ui/pagination";

interface BottomNavigationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  ownerNickname: string;
  isSharedBoard: boolean;
  shareUri?: string;
  bottomGroupRef: React.RefObject<HTMLDivElement | null>;
}

export function BottomNavigation({
  totalPages,
  currentPage,
  onPageChange,
  ownerNickname,
  isSharedBoard,
  shareUri,
  bottomGroupRef,
}: BottomNavigationProps) {
  return (
    <div
      ref={bottomGroupRef}
      className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 flex justify-center"
      style={{ padding: 12 }}
    >
      <div className="pointer-events-auto flex w-full max-w-[450px] flex-col items-center gap-4">
        <div style={{ width: "100%" }}>
          <Pagination
            totalPages={totalPages}
            initialPage={currentPage + 1}
            onPageChange={(page) => onPageChange(page - 1)}
          />
        </div>

        <div style={{ width: "100%" }}>
          <LinkShareButton
            label={
              isSharedBoard
                ? `${ownerNickname}님에게 마음 전달하기`
                : "링크 공유"
            }
            Icon={LinkIcon}
            className="w-full"
            isSharedBoard={isSharedBoard}
            shareUri={shareUri}
          />
        </div>
      </div>
    </div>
  );
}