import LogoIcon from "@/assets/ic_logo.svg?react";
import NotesIcon from "@/assets/ic_notes.svg?react";
import { DDayCounter } from "@/pages/loginPage/components/dday-counter";
import { KakaoLoginButton } from "@/pages/loginPage/components/kakao-login-button";

function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 로고 */}
      <div className="flex flex-1 items-start justify-center pt-16">
        <LogoIcon
          style={{
            width: "210px",
            height: "auto",
            minWidth: "210px",
            maxWidth: "210px",
            flexShrink: 0,
          }}
        />
      </div>

      {/* 하단 요소들 - 하단에서부터 위로 배치 */}
      <div className="flex flex-col-reverse items-center pb-10">
        {/* 카카오 로그인 버튼 */}
        <div>
          <KakaoLoginButton
            onClick={() => console.log("카카오 로그인 클릭!")}
          />
        </div>

        {/* 디데이 표기 창 */}
        <div className="mb-4">
          <DDayCounter />
        </div>

        {/* 랜딩 노트 */}
        <NotesIcon
          style={{
            width: "358px",
            height: "auto",
            minWidth: "358px",
            maxWidth: "358px",
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
}

export default LoginPage;
