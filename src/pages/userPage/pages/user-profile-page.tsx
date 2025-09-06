import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getBoardInfo, getBoardShare } from "@/apis/board";
import CameraIcon from "@/assets/ic_camera.svg?react";
import DefaultProfileImage from "@/assets/obj_default_profile.svg?react";
import { BackButton } from "@/components/ui/back-button";
import { NavigationButton } from "@/components/ui/navigation-button";
import { NicknameInput } from "@/components/ui/nickname-input";

export default function UserProfilePage() {
  const navigate = useNavigate();

  const { data: shareData } = useQuery({
    queryKey: ["boardShare"],
    queryFn: getBoardShare,
  });

  const { data: boardInfo } = useQuery({
    queryKey: ["boardInfo", shareData?.data.shareUri],
    queryFn: () => getBoardInfo(shareData!.data.shareUri),
    enabled: !!shareData?.data.shareUri,
  });

  const handleComplete = () => {
    navigate("/board");
  };

  return (
    <div
      className="relative flex min-h-screen flex-col justify-center bg-white p-8"
      style={{ minHeight: "100dvh" }}
    >
      <div className="relative mb-10 flex items-center justify-center">
        <BackButton className="absolute left-0" />
        <p className="font-bold text-base text-red-200">마이 프로필</p>
      </div>

      <div className="relative mx-auto mb-9 h-28 w-28 self-center">
        <div className="absolute top-0 left-0 h-28 w-28">
          {boardInfo?.data.profileImage ? (
            <img
              src={boardInfo.data.profileImage}
              alt="프로필 이미지"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <DefaultProfileImage className="h-full w-full" />
          )}
        </div>
        <div className="absolute top-[77px] left-[73px] h-10 w-10">
          <div className="absolute top-0 left-0 h-10 w-10 rounded-full bg-neutral-400 backdrop-blur-[9.75px]" />
          <div className="absolute top-[10px] left-[10px] h-5 w-5 overflow-hidden">
            <CameraIcon />
          </div>
        </div>
      </div>

      <p className="mb-2 font-semibold text-base text-red-200">별명</p>
      <NicknameInput />
      <p className="mt-2 font-normal text-red-200 text-xs">
        영어 대/소문자, 특수 문자, 띄어쓰기 사용으로 최대 6자
      </p>

      <div className="z-10 mt-auto w-full">
        <NavigationButton onClick={handleComplete} active={false}>
          완료
        </NavigationButton>
      </div>
    </div>
  );
}
