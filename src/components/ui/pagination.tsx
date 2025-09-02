import { useState } from "react";
import ChevronLeftIcon from "@/assets/ic_chevron_left.svg?react";
import ChevronRightIcon from "@/assets/ic_chevron_right.svg?react";
import EllipsisIcon from "@/assets/ic_ellipsis.svg?react";
import { cn } from "@/lib/utils";

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
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, 5);
      if (totalPages > 5) {
        pages.push("...", totalPages);
      }
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      if (totalPages > 5) {
        pages.push("...");
      }
      for (let i = totalPages - 4; i <= totalPages; i++) {
        if (i > 1) pages.push(i);
      }
    } else {
      if (currentPage === 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage === totalPages - 3) {
        pages.push(1, "...");
        for (let i = totalPages - 5; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1, "...");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("...", totalPages);
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
            ? "cursor-not-allowed text-brown-100/40"
            : "text-brown-100 hover:text-brown-100/80"
        )}
      >
        <ChevronLeftIcon />
      </button>

      {/* 페이지 번호들 */}
      <div className="flex items-center justify-center gap-2">
        {getPageNumbers().map((item, index) => {
          if (item === "...") {
            return (
              <EllipsisIcon
                key={`ellipsis-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: explanation
                  index
                }`}
              />
            );
          }

          const pageNumber = item as number;
          return (
            <button
              type="button"
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={cn(
                "relative flex h-6 w-6 items-center justify-center rounded-full transition-colors",
                currentPage === pageNumber
                  ? "bg-brown-100 text-brown-300"
                  : "text-brown-100 hover:text-brown-100/80"
              )}
            >
              <span className="font-primary text-sm leading-tight tracking-tight">
                {pageNumber}
              </span>
            </button>
          );
        })}
      </div>

      {/* 다음 버튼 */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={cn(
          "font-primary text-base leading-snug transition-colors",
          currentPage >= totalPages
            ? "cursor-not-allowed text-brown-100"
            : "text-brown-100 hover:text-brown-100/80"
        )}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

export { Pagination };
