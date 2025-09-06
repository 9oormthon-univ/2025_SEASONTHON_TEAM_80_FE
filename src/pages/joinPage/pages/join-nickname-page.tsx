import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "@/apis/board";
import { NavigationButton } from "@/components/ui/navigation-button";
import { NicknameInput } from "@/components/ui/nickname-input";
import { PageLayout } from "@/components/ui/page-layout";
import { ROUTES } from "@/constants/routes";

export default function JoinNicknamePage() {
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isNicknameValid =
    nickname.trim().length > 0 && nickname.trim().length <= 6;

  const handleCreateBoard = async () => {
    if (!isNicknameValid || isLoading) return;

    try {
      setIsLoading(true);
      const response = await createBoard({ nickname: nickname.trim() });
      console.log("보드 생성 성공:", response);
      navigate(
        ROUTES.JOIN.GUIDE_WITH_SHARE.replace(":shareUri", response.shareUri)
      );
    } catch (error) {
      console.error("보드 생성 API 에러:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout
      title={
        <>
          새해를 맞이하는
          <br />
          나만의 플레이 리스트를
          <br />
          만들어 볼까요?
        </>
      }
      bottomContent={
        <NavigationButton
          className="w-full"
          active={isNicknameValid && !isLoading}
          disabled={!isNicknameValid || isLoading}
          aria-disabled={!isNicknameValid || isLoading}
          onClick={handleCreateBoard}
        >
          {isLoading ? "보드 생성 중..." : "다음으로"}
        </NavigationButton>
      }
    >
      <p className="mt-8 text-lg text-red-200">
        다른 사람에게 보이는 별명이에요!
      </p>

      <NicknameInput
        className="mt-8"
        value={nickname}
        onChange={setNickname}
        maxLength={6}
      />
      <p className="mt-2 text-red-200 text-xs">
        영어 대/소문자, 특수 문자, 띄어쓰기 사용으로 최대 6자
      </p>
    </PageLayout>
  );
}
