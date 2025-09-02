import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import LensIcon from "@/assets/ic_lens.svg?react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div 
        className={cn(
          "relative flex items-center w-[360px] h-12",
          className
        )}
      >
        <LensIcon 
          className="absolute left-4 w-[18px] h-[18px] text-gray-700 pointer-events-none" 
        />
        <input
          ref={ref}
          type="text"
          placeholder="곡, 앨범, 아티스트 명으로 검색"
          className={cn(
            "w-full h-full pl-12 pr-4",
            "bg-gray-200 rounded-md",
            "text-gray-700 font-semibold text-base",
            "placeholder:text-gray-400 placeholder:font-semibold placeholder:text-base",
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
