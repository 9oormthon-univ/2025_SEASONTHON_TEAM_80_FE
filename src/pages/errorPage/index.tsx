import { useNavigate } from "react-router-dom";
import WarnIcon from "@/assets/ic_warn.svg?react";
import { NavigationButton } from "@/components/ui/navigation-button";

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-white p-8"
      style={{ minHeight: "100dvh" }}
    >
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-4 flex h-20 w-20 items-center justify-center">
          <div className="absolute top-0 left-0 h-20 w-20 rounded-full bg-red-900/5 backdrop-blur-xl" />
          <WarnIcon className="relative h-10 w-10" />
        </div>
        <p className="font-semibold text-neutral-700 text-xl leading-8">
          일시적으로 오류가 발생했습니다.
          <br />
          접속이 원활하지 않으니
          <br />
          잠시 후 다시 방문해주세요.
        </p>
      </div>

      <div className="z-10 mt-auto w-full">
        <NavigationButton onClick={handleGoHome} active={true}>
          돌아가기
        </NavigationButton>
      </div>
    </div>
  );
}

export default ErrorPage;
