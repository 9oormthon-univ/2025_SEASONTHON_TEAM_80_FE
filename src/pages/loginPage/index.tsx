import { DDayCounter } from "@/pages/loginPage/components/dday-counter";
import { KakaoLoginButton } from "@/pages/loginPage/components/kakao-login-button";

function LoginPage() {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen overflow-hidden bg-center bg-no-repeat"
      style={{
        backgroundColor: "#412716",
        backgroundImage: "url('/landingBackground.svg')",
        backgroundSize: "390px auto",
        backgroundPosition: "center -20px",
      }}
    >
      {/* 디데이 표기 창 */}
      <div
        className="-translate-x-1/2 absolute left-1/2 transform"
        style={{ top: "545px" }}
      >
        <DDayCounter />
      </div>

      {/* 로고 */}
      <div
        className="-translate-x-1/2 absolute left-1/2 transform"
        style={{ top: "76px" }}
      >
        <img
          src="/landingLogo.svg"
          alt="Landing Logo"
          style={{
            width: "210px",
            height: "auto",
            minWidth: "210px",
            maxWidth: "210px",
            flexShrink: 0,
          }}
        />
      </div>

      <div
        className="-translate-x-1/2 absolute left-1/2 transform"
        style={{ top: "596px" }}
      >
        {/* 카카오 로그인 버튼 */}
        <KakaoLoginButton onClick={() => console.log("카카오 로그인 클릭!")} />
      </div>

      {/* 랜딩 노트 */}
      <div
        className="-translate-x-1/2 absolute left-1/2 transform"
        style={{ top: "444px" }}
      >
        <img
          src="/landingNote.svg"
          alt="Landing Note"
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
