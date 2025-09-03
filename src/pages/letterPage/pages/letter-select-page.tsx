import { useNavigate } from "react-router-dom";
import PlayIcon from "@/assets/ic_play.svg?react";
import { NavigationButton } from "@/components/ui/navigation-button";
import { PageLayout } from "@/components/ui/page-layout";
import type { Song } from "@/types/song";
import LetterStep from "../components/letter-step";

interface LetterSelectPageProps {
  nickname?: string;
  song?: Song;
}

export default function LetterSelectPage({
  nickname = "닉네임",
  song,
}: LetterSelectPageProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/letter/write");
  };

  return (
    <PageLayout
      title={
        <>
          {nickname} 님께 <br />이 노래를 들려드릴까요?
        </>
      }
      bottomContent={
        <NavigationButton
          active={true}
          onClick={handleClick}
          className="w-full"
        >
          다음
        </NavigationButton>
      }
    >
      <LetterStep
        step={1}
        className="absolute top-0 right-0 pt-26 sm:pt-36 md:pt-40"
      />

      <div className="mx-auto flex w-60 flex-col gap-4">
        <div className="relative flex h-60 w-60 items-center justify-center self-center rounded bg-white/10 backdrop-blur-md">
          {song?.album_cover ? (
            <img
              aria-label="album-cover"
              className="h-52 w-52"
              src={song.album_cover}
            />
          ) : (
            <div className="h-52 w-52 rounded bg-gray-500" />
          )}
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex flex-1 flex-row items-center gap-1 rounded-md bg-white/10 px-4 py-3 backdrop-blur-md">
            <p className="text-base text-white">
              {song?.song_title || "곡 제목"}
            </p>
            <p className="text-gray-500 text-xs">{song?.artist || "가수"}</p>
          </div>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
          >
            <PlayIcon />
          </button>
        </div>
      </div>

      {song?.album_cover ? (
        <img
          aria-label="album-cover"
          className="-translate-x-1/2 -bottom-22 absolute left-1/2 z-0 h-44 w-44 transform"
          src={song.album_cover}
        />
      ) : (
        <div className="-translate-x-1/2 -bottom-20 absolute left-1/2 h-40 w-40 transform bg-gray-500" />
      )}
    </PageLayout>
  );
}
