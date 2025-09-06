import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getBoardShare } from "@/apis/board";
import { ROUTES } from "@/constants/routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireBoard?: boolean;
}

export default function ProtectedRoute({
  children,
  redirectTo = ROUTES.BOARD,
  requireBoard = false,
}: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasBoard, setHasBoard] = useState<boolean | null>(null);

  useEffect(() => {
    const checkBoardStatus = async () => {
      try {
        const boardShareData = await getBoardShare();
        const boardExists = boardShareData.data.boardId !== null;
        setHasBoard(boardExists);
      } catch (error) {
        console.error("보드 상태 확인 실패:", error);
        setHasBoard(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkBoardStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="font-medium text-gray-600 text-lg">확인 중...</p>
        </div>
      </div>
    );
  }

  if (requireBoard && !hasBoard) {
    return <Navigate to={ROUTES.JOIN.NICKNAME} replace />;
  }

  if (!requireBoard && hasBoard) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
