import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@/assets/ic_arrow_left.svg?react";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

export function BackButton({ onClick, className }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className} aria-label="뒤로가기">
      <ArrowLeftIcon />
    </button>
  );
}
