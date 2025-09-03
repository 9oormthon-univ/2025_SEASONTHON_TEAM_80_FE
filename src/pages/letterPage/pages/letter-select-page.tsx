import { useNavigate } from "react-router-dom";
import { NavigationButton } from "@/components/ui/navigation-button";
import { PageLayout } from "@/components/ui/page-layout";
import LetterStep from "../components/letter-step";

interface LetterSelectPageProps {
  nickname: string;
}

export default function LetterSelectPage({
  nickname = "닉네임",
}: LetterSelectPageProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/letter/write");
  };

  return (
    <PageLayout
      title={
        <>
          {nickname} 님께 <br />이 노래를 들려드릴까요?
        </>
      }
      bottomContent={
        <NavigationButton
          active={true}
          onClick={handleClick}
          className="w-full"
        >
          다음
        </NavigationButton>
      }
    >
      <LetterStep
        step={1}
        className="absolute top-0 right-0 pt-26 sm:pt-36 md:pt-40"
      />
    </PageLayout>
  );
}
