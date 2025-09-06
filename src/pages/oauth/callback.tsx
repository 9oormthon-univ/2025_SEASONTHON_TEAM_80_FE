import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getBoardShare } from "@/apis/board";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const error = searchParams.get("error");

      if (error) {
        console.error("OAuth 에러:", error);
        alert("로그인 중 오류가 발생했습니다.");
        navigate("/");
        return;
      }
      console.log("카카오 로그인 성공!!!!!!");

      try {
        const boardShareData = await getBoardShare();

        if (boardShareData.data.boardId === null) {
          navigate("/join/nickname");
        } else {
          navigate("/board");
        }
      } catch (error) {
        console.error("보드 공유 정보 조회 실패:", error);
        navigate("/join/nickname");
      }
    };

    const timer = setTimeout(handleCallback, 100);

    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="font-medium text-gray-600 text-lg">로그인 처리 중...</p>
        <p className="mt-2 text-gray-400 text-sm">곧 완료됩니다</p>
      </div>
    </div>
  );
}
