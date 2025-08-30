import * as React from "react";
import { cn } from "@/lib/utils";

interface NicknameInputProps
  extends Omit<React.ComponentProps<"input">, "onChange"> {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (hasError: boolean) => void;
}

function NicknameInput({
  className,
  value = "",
  onChange,
  onValidationChange,
  ...props
}: NicknameInputProps) {
  const [inputValue, setInputValue] = React.useState(value);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(inputValue.length > 12);
    onValidationChange?.(inputValue.length > 12);
  }, [inputValue, onValidationChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="최대 12자"
        className={cn(
          "h-[48px] w-[360px]",
          "px-4 py-3",
          "rounded-[8px]",
          "text-[16px]",
          "font-semibold",
          "transition-colors",
          "focus:outline-none",
          // 일반 상태
          !hasError && [
            "bg-[#FAFAFA]",
            "text-[#1A1A1A]",
            "placeholder:text-[#D9D9D9]",
            "border border-transparent",
            "focus:ring-2 focus:ring-[#E0E0E0]",
          ],
          // 에러 상태 (12자 초과)
          hasError && [
            "bg-[#FAFAFA]",
            "text-[#BA3D41]",
            "placeholder:text-[#D9D9D9]",
            "border border-[#BA3D41]",
            "focus:ring-2 focus:ring-[#BA3D41]/50",
          ],
          className
        )}
        {...props}
      />
      {/* 글자 수 표시 */}
      <div
        className={cn(
          "-translate-y-1/2 absolute top-1/2 right-3 transform",
          "text-sm",
          hasError ? "text-[#BA3D41]" : "text-[#D9D9D9]"
        )}
      >
        {inputValue.length}/12
      </div>
    </div>
  );
}

export { NicknameInput };
