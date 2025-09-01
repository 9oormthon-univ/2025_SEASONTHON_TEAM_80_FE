import { cn } from "@/lib/utils";
import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

function Pagination({
  totalPages,
  initialPage = 1,
  onPageChange,
  className,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const maxPages = 5;
    const pages = [];

    if (totalPages <= maxPages) {
      // 총 페이지가 5개 이하면 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지를 중심으로 5개 페이지 계산
      let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
      const endPage = Math.min(totalPages, startPage + maxPages - 1);

      // 끝 페이지가 총 페이지보다 작으면 시작 페이지 조정
      if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (totalPages <= 0) return null;

  return (
    <div className={cn("flex w-96 items-center justify-between", className)}>
      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className={cn(
          "font-primary text-base leading-snug transition-colors",
          currentPage <= 1
            ? "cursor-not-allowed text-yellow-50/50"
            : "text-yellow-50 hover:text-yellow-100"
        )}
      >
        &lt;
      </button>

      {/* 페이지 번호들 */}
      <div className="flex items-center justify-center gap-2">
        {getPageNumbers().map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={cn(
              "relative flex h-4 w-4 items-center justify-center rounded-full transition-colors",
              currentPage === pageNumber
                ? "bg-yellow-50 text-zinc-800"
                : "text-yellow-50 hover:text-yellow-100"
            )}
          >
            <span className="font-primary text-sm leading-tight tracking-tight">
              {pageNumber}
            </span>
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={cn(
          "font-primary text-base leading-snug transition-colors",
          currentPage >= totalPages
            ? "cursor-not-allowed text-yellow-50/50"
            : "text-yellow-50 hover:text-yellow-100"
        )}
      >
        &gt;
      </button>
    </div>
  );
}

export { Pagination };
