import { PageLayout } from "@/components/ui/page-layout";
import LetterStep from "../components/letter-step";

interface LetterGuidePageProps {
  nickname: string;
}

export default function LetterGuidePage({
  nickname = "닉네임",
}: LetterGuidePageProps) {
  return (
    <PageLayout
      title={
        <>
          {nickname} 님께 <br />
          새해 기념 어떤 노래를
          <br />
          들려드릴까요?
        </>
      }
    >
      <LetterStep
        step={1}
        className="absolute top-0 right-0 pt-26 sm:pt-36 md:pt-40"
      />

      <p className="mt-8 text-lg text-red-200">
        앨범 커버가 대표적으로 보여요!
      </p>
      {/** 검색창 컴포넌트 */}
    </PageLayout>
  );
}
