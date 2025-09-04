import { type ChangeEvent, useState } from "react";
import { BackButton } from "@/components/ui/back-button";
import { NavigationButton } from "@/components/ui/navigation-button";
import { SearchInput } from "@/components/ui/search-input";
import { MusicList } from "@/pages/letterPage/components/music-list";

function MusicSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // 샘플 음악 데이터 (API 응답 형식에 맞춤)
  const sampleSongs = [
    {
      id: "spotify_id_1",
      song_title: "Sample Song Title",
      artist: "Sample Artist",
      album_cover: "",
      streaming_url: "",
    },
    {
      id: "spotify_id_2",
      song_title: "Another Song",
      artist: "Another Artist",
      album_cover: "",
      streaming_url: "",
    },
    {
      id: "spotify_id_3",
      song_title: "Third Song",
      artist: "Third Artist",
      album_cover: "",
      streaming_url: "",
    },
    {
      id: "spotify_id_4",
      song_title: "Sample Song Title",
      artist: "Sample Artist",
      album_cover: "",
      streaming_url: "",
    },
    {
      id: "spotify_id_5",
      song_title: "Another Song",
      artist: "Another Artist",
      album_cover: "",
      streaming_url: "",
    },
    {
      id: "spotify_id_6",
      song_title: "Third Song",
      artist: "Third Artist",
      album_cover: "",
      streaming_url: "",
    },
    {
      id: "spotify_id_7",
      song_title: "Sample Song Title",
      artist: "Sample Artist",
      album_cover: "",
      streaming_url: "",
    },
    {
      id: "spotify_id_8",
      song_title: "Another Song",
      artist: "Another Artist",
      album_cover: "",
      streaming_url: "",
    },
  ];

  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

  const toggleSongSelection = (songId: string) => {
    setSelectedSongs((prev) => (prev.includes(songId) ? [] : [songId]));
  };

  // 선택된 곡 정보 가져오기
  const selectedSong =
    selectedSongs.length > 0
      ? sampleSongs.find((song) => song.id === selectedSongs[0])
      : null;

  return (
    <div className="relative flex h-full w-full flex-col bg-gray-100">
      <div className="relative flex items-center px-4 pt-[25px] pb-[25px]">
        <div className="absolute left-4">
          <BackButton />
        </div>
        <h1 className="flex-1 text-center font-bold text-base text-red-200">
          노래 검색
        </h1>
      </div>

      <div className="flex justify-center px-4 pb-6">
        <SearchInput
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="곡, 앨범, 아티스트 명으로 검색"
          maxLength={50}
        />
      </div>

      {/* 추천 음악 섹션 (임시) */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <h2 className="mb-4 px-4 font-semibold text-[16px] text-brown-200">
          추천
        </h2>

        {/* 음악 리스트 - 스크롤 가능 */}
        <div className="flex-1 overflow-y-auto">
          <MusicList
            songs={sampleSongs}
            selectedSongs={selectedSongs}
            onToggleSelection={toggleSongSelection}
          />
        </div>
      </div>

      {/* 하단 고정 영역 */}
      <div className="mt-auto">
        {/* 선택된 곡 정보 영역 */}
        <div
          className="flex h-[104px] items-start px-4 pt-4"
          style={{
            backgroundColor: selectedSong ? "rgba(142, 45, 45, 0.03)" : "white",
          }}
        >
          {selectedSong ? (
            <div className="flex w-full items-center">
              <div className="h-[42px] w-[42px] overflow-hidden rounded-md bg-gray-300">
                <img
                  src={selectedSong.album_cover}
                  alt={`${selectedSong.song_title} 앨범 커버`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-[16px] text-gray-700">
                  {selectedSong.song_title}
                </h3>
                <p className="font-normal text-[12px] text-gray-500">
                  {selectedSong.artist}
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full"></div>
          )}
        </div>

        {/* 선택 버튼 */}
        <div className="flex h-[46px] items-end bg-white px-4 pb-5">
          <NavigationButton active={selectedSongs.length > 0}>
            선택
          </NavigationButton>
        </div>
      </div>
    </div>
  );
}

export default MusicSearchPage;
