import CheckSquareIcon from "@/assets/ic_check_square.svg?react";
import SquareIcon from "@/assets/ic_square.svg?react";

interface Song {
  id: string;
  song_title: string;
  artist: string;
  album_cover: string;
  streaming_url: string;
}

interface MusicListProps {
  songs: Song[];
  selectedSongs: string[];
  onToggleSelection: (songId: string) => void;
}

export function MusicList({
  songs,
  selectedSongs,
  onToggleSelection,
}: MusicListProps) {
  return (
    <div className="space-y-0">
      {songs.map((song) => (
        <div
          key={song.id}
          className={`relative flex h-[70px] w-[calc(100vw)] max-w-[393px] items-center px-4 ${
            selectedSongs.includes(song.id) ? "bg-opacity-r100-3" : ""
          }`}
        >
          {/* 앨범 사진 */}
          <div className="h-[42px] w-[42px] overflow-hidden rounded-md bg-gray-300">
            <img
              src={song.album_cover}
              alt={`${song.song_title} 앨범 커버`}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* 음악 정보 */}
          <div className="ml-4 flex-1">
            <div className="mt-[15px]">
              <h3 className="font-semibold text-[16px] text-gray-700">
                {song.song_title}
              </h3>
              <p className="mt-[1px] font-normal text-[12px] text-gray-500">
                {song.artist}
              </p>
            </div>
          </div>

          {/* 체크박스 */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onToggleSelection(song.id)}
              className="flex h-[24px] w-[24px] items-center justify-center"
            >
              {selectedSongs.includes(song.id) ? (
                <CheckSquareIcon className="h-[24px] w-[24px]" />
              ) : (
                <SquareIcon className="h-[24px] w-[24px]" />
              )}
            </button>
          </div>

          {/* 하단 구분선 */}
          <div className="absolute right-4 bottom-0 left-4 h-[1px] bg-[#E6E6E6]"></div>
        </div>
      ))}
    </div>
  );
}
