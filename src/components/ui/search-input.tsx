import { forwardRef } from "react";
import LensIcon from "@/assets/ic_lens.svg?react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("relative flex h-12 w-[360px] items-center", className)}
      >
        <LensIcon className="pointer-events-none absolute left-4 h-[18px] w-[18px] text-gray-700" />
        <input
          ref={ref}
          type="text"
          placeholder="곡, 앨범, 아티스트 명으로 검색"
          className={cn(
            "h-full w-full pr-4 pl-12",
            "rounded-md bg-gray-200",
            "font-semibold text-base text-gray-700",
            "placeholder:font-semibold placeholder:text-base placeholder:text-gray-400",
            "border-none outline-none",
            "focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
