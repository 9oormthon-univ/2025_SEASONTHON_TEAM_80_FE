import { BackButton } from "@/components/ui/back-button";
import CDPlayerImage from "@/assets/obj_cdplayer.webp";
import { NavigationButton } from "@/components/ui/navigation-button";

export default function JoinCompletePage() {
  return (
    <div className="relative flex h-full w-full flex-col pt-26 sm:pt-36 md:pt-40">
      <BackButton />
      <p className="mt-3 font-primary text-[32px] text-red-200 leading-12">
        나만의 LP 보드가
        <br />
        만들어졌어요! <br />
        지금 확인하러 갈까요?
      </p>

      <img src={CDPlayerImage} alt="CD Player" className="mx-auto" />

      <div className="mt-auto pb-4">
        <NavigationButton className="w-full">다음으로</NavigationButton>
      </div>
    </div>
  );
}
