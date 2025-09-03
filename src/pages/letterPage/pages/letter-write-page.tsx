import { useNavigate } from "react-router-dom";
import { NavigationButton } from "@/components/ui/navigation-button";
import { PageLayout } from "@/components/ui/page-layout";
import LetterStep from "../components/letter-step";

export default function LetterWritePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/letter/complete");
  };

  return (
    <PageLayout
      title={
        <>
          노래랑 함께 보낼 <br />
          마음을 작성해봐요.
        </>
      }
      bottomContent={
        <NavigationButton
          active={true}
          className="w-full"
          onClick={handleClick}
        >
          전송
        </NavigationButton>
      }
    >
      <LetterStep
        step={2}
        className="absolute top-0 right-0 pt-26 sm:pt-36 md:pt-40"
      />
    </PageLayout>
  );
}
