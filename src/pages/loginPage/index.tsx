import LogoIcon from "@/assets/ic_logo.svg?react";
import StarIcon from "@/assets/ic_star.svg?react";
import { DDayCounter } from "@/pages/loginPage/components/dday-counter";
import { KakaoLoginButton } from "@/pages/loginPage/components/kakao-login-button";

function LoginPage() {
  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ minHeight: "100dvh" }}
    >
      {/* 좌측 상단 별들 */}
      <div className="absolute top-2 left-4 z-10">
        <div className="flex flex-col gap-2">
          <StarIcon className="star-twinkle-1 ml-20 h-10 w-8 text-white" />
          <StarIcon className="star-twinkle-2 h-10 w-8 text-white" />
          <StarIcon className="star-twinkle-3 mt-10 ml-2 h-10 w-8 text-white" />
        </div>
      </div>

      {/* 우측 상단 별들 */}
      <div className="absolute right-1 z-10">
        <div className="flex flex-col items-end gap-2">
          <StarIcon className="star-twinkle-4 mr-2 h-8 w-8 text-white" />
          <StarIcon className="star-twinkle-5 mr-16 h-8 w-8 text-white" />
          <StarIcon className="star-twinkle-6 h-8 w-8 text-white" />
          <StarIcon className="star-twinkle-7 mt-6 mr-10 h-8 w-8 text-white" />
        </div>
      </div>

      {/* 로고 */}
      <div className="dynamic-padding-top flex flex-1 items-start justify-center">
        <div className="flex flex-col items-center">
          <LogoIcon
            style={{
              width: "210px",
              height: "auto",
              minWidth: "210px",
              maxWidth: "210px",
              flexShrink: 0,
            }}
          />
          <p
            className="mt-[10px] text-center text-white text-xs"
            style={{ fontSize: "12px" }}
          >
            새해 첫 곡을 친구에게 선물하고
            <br /> LP판에 쪽지를 새기는 특별한 롤링페이퍼 서비스
          </p>
        </div>
      </div>

      {/* 하단 요소들 - 하단에서부터 위로 배치 */}
      <div className="flex flex-col-reverse items-center pb-10">
        {/* 카카오 로그인 버튼 */}
        <div className="w-full max-w-sm">
          <KakaoLoginButton
            onClick={() => console.log("카카오 로그인 클릭!")}
          />
        </div>

        {/* 디데이 표기 창 */}
        <div className="mb-6">
          <DDayCounter />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
