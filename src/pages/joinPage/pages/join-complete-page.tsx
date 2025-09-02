import CDPlayerImage from "@/assets/obj_cdplayer.webp";
import { NavigationButton } from "@/components/ui/navigation-button";
import { PageLayout } from "@/components/ui/page-layout";

export default function JoinCompletePage() {
  return (
    <PageLayout
      title={
        <>
          나만의 LP 보드가
          <br />
          만들어졌어요! <br />
          지금 확인하러 갈까요?
        </>
      }
      bottomContent={
        <NavigationButton className="w-full">다음으로</NavigationButton>
      }
    >
      <img src={CDPlayerImage} alt="CD Player" className="mx-auto" />
    </PageLayout>
  );
}
