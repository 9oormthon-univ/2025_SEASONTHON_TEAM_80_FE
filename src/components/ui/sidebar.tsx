import { useQuery } from "@tanstack/react-query";
import { logout } from "@/apis/auth";
import { getBoardInfo } from "@/apis/board";
import BellIcon from "@/assets/ic_bell.svg?react";
import HeadsetIcon from "@/assets/ic_headset.svg?react";
import MegaphoneIcon from "@/assets/ic_megaphone.svg?react";
import MusicNoteIcon from "@/assets/ic_music_note.svg?react";
import PersonIcon from "@/assets/ic_person.svg?react";
import SignOutIcon from "@/assets/ic_sign_out.svg?react";
import VideoIcon from "@/assets/ic_video.svg?react";
import XIcon from "@/assets/ic_x.svg?react";

interface SidebarProps {
  nickname?: string;
  onClose?: () => void;
  shareUri?: string;
}

export function Sidebar({
  nickname = "닉네임",
  onClose,
  shareUri,
}: SidebarProps) {
  const { data: boardInfo } = useQuery({
    queryKey: ["boardInfo", shareUri],
    queryFn: () => getBoardInfo(shareUri!),
    enabled: Boolean(shareUri),
  });

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };
  return (
    <div className="relative h-screen w-72 flex-shrink-0 overflow-hidden rounded-tl-[10px] rounded-bl-[10px] bg-neutral-100">
      <div className="mx-[14px] my-[14px] flex h-[638px] w-52 flex-col">
        <div className="flex flex-col gap-6">
          <button
            type="button"
            onClick={onClose}
            className="relative h-6 w-6 cursor-pointer overflow-hidden transition-opacity hover:opacity-70"
          >
            <div className="absolute top-[4.12px] left-[4.12px] flex h-6 w-6 items-center justify-center rounded-sm">
              <XIcon className="text-white" />
            </div>
          </button>

          <div className="flex flex-row items-center gap-3">
            <div className="relative h-16 w-16">
              {boardInfo?.data?.profileImage ? (
                <img
                  src={boardInfo.data.profileImage}
                  alt="프로필 이미지"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-gray-300" />
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-bold text-neutral-800 text-xl leading-7 tracking-wide">
                {boardInfo?.data?.name || nickname} 님
              </div>
              <div className="inline-flex w-fit items-center gap-1 rounded bg-stone-300/30 px-2 py-2 backdrop-blur-[3.02px]">
                <div className="relative h-3 w-3 overflow-hidden">
                  <MusicNoteIcon />
                </div>
                <div className="text-center font-bold text-xs text-zinc-800 leading-none">
                  총 {boardInfo?.data?.messageCount ?? 0}개 음반
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="h-0 w-60 outline outline-[#E6E6E6] outline-offset-[-0.50px]" />
            <div className="flex flex-col">
              <div className="flex h-12 items-center gap-3 overflow-hidden py-2">
                <div className="relative h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-red-900/5 backdrop-blur-[9.75px]" />
                  <PersonIcon className="absolute top-[10px] left-[10px] h-5 w-5" />
                </div>
                <div className="font-semibold text-base text-neutral-800 leading-snug tracking-wide">
                  마이 프로필
                </div>
              </div>
              <div className="flex h-12 items-center gap-3 overflow-hidden py-2">
                <div className="relative h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-red-900/5 backdrop-blur-[9.75px]" />
                  <BellIcon className="absolute top-[10px] left-[10px] h-5 w-5" />
                </div>
                <div className="font-semibold text-base text-black leading-snug tracking-wide">
                  알림 설정
                </div>
              </div>
            </div>
            <div className="h-0 w-60 outline outline-[#E6E6E6] outline-offset-[-0.50px]" />
            <div className="flex h-12 items-center gap-3 overflow-hidden py-2">
              <div className="relative h-10 w-10">
                <div className="h-10 w-10 rounded-full bg-red-900/5 backdrop-blur-[9.75px]" />
                <VideoIcon className="absolute top-[10px] left-[10px] h-5 w-5" />
              </div>
              <div className="font-semibold text-base text-black leading-snug tracking-wide">
                올해의 첫 소리 사용 방법
              </div>
            </div>
            <div className="h-0 w-60 outline outline-[#E6E6E6] outline-offset-[-0.50px]" />
            <div className="flex flex-col">
              <div className="flex h-12 items-center gap-3 overflow-hidden py-2">
                <div className="relative h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-red-900/5 backdrop-blur-[9.75px]" />
                  <HeadsetIcon className="absolute top-[10px] left-[10px] h-5 w-5" />
                </div>
                <div className="font-semibold text-base text-black leading-snug tracking-wide">
                  문의사항
                </div>
              </div>
              <div className="flex h-12 items-center gap-3 overflow-hidden py-2">
                <div className="relative h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-red-900/5 backdrop-blur-[9.75px]" />
                  <MegaphoneIcon className="absolute top-[10px] left-[10px] h-5 w-5" />
                </div>
                <div className="font-semibold text-base text-neutral-800 leading-snug tracking-wide">
                  공지사항
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[14px] left-[14px] flex w-52 flex-col gap-2">
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-12 w-full items-center gap-3 overflow-hidden py-2 text-left transition-colors hover:bg-neutral-200"
          >
            <div className="relative h-10 w-10">
              <div className="h-10 w-10 rounded-full bg-red-900/5 backdrop-blur-[9.75px]" />
              <SignOutIcon className="absolute top-[10px] left-[10px] h-5 w-5" />
            </div>
            <div className="font-semibold text-base text-black leading-snug tracking-wide">
              로그아웃
            </div>
          </button>
          <div className="h-0 w-60 outline outline-[#E6E6E6] outline-offset-[-0.50px]" />

          <div className="font-semibold text-[8px] text-neutral-500 leading-3 tracking-tight">
            Copyright ©santafive. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
