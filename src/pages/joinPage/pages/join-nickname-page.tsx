import { BackButton } from "@/components/ui/back-button";
import { NavigationButton } from "@/components/ui/navigation-button";
import { NicknameInput } from "@/components/ui/nickname-input";

export default function JoinNicknamePage() {
  return (
    <div className="relative flex h-full w-full flex-col pt-26 sm:pt-36 md:pt-40">
      <BackButton />
      <p className="mt-3 font-primary text-[32px] text-red-200 leading-12">
        새해를 맞이하는
        <br />
        나만의 플레이 리스트를
        <br />
        만들어 볼까요?
      </p>
      <p className="mt-8 text-lg text-red-200">
        다른 사람에게 보이는 별명이에요!
      </p>

      <NicknameInput className="mt-3" />
      <p className="mt-2 text-red-200 text-xs">
        영어 대/소문자, 특수 문자, 띄어쓰기 사용으로 최대 6자
      </p>

      <div className="mt-auto pb-4">
        <NavigationButton className="w-full">다음으로</NavigationButton>
      </div>
    </div>
  );
}
