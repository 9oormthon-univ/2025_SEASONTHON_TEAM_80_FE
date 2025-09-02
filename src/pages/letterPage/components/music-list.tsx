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

export function MusicList({ songs, selectedSongs, onToggleSelection }: MusicListProps) {
  return (
    <div className="space-y-0">
      {songs.map((song) => (
        <div 
          key={song.id} 
          className={`relative w-[calc(100vw)] max-w-[393px] h-[70px] flex items-center px-4 ${
            selectedSongs.includes(song.id) ? 'bg-opacity-r100-3' : ''
          }`}
        >
          {/* 앨범 사진 */}
          <div className="w-[42px] h-[42px] bg-gray-300 rounded-md overflow-hidden">
            <img 
              src={song.album_cover} 
              alt={`${song.song_title} 앨범 커버`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          {/* 음악 정보 */}
          <div className="flex-1 ml-4">
            <div className="mt-[15px]">
              <h3 className="text-[16px] font-semibold text-gray-700">{song.song_title}</h3>
              <p className="text-[12px] font-normal text-gray-500 mt-[1px]">{song.artist}</p>
            </div>
          </div>
          
          {/* 체크박스 */}
          <div className="flex justify-end">
            <button
              onClick={() => onToggleSelection(song.id)}
              className="w-[24px] h-[24px] flex items-center justify-center"
            >
              {selectedSongs.includes(song.id) ? (
                <CheckSquareIcon className="w-[24px] h-[24px]" />
              ) : (
                <SquareIcon className="w-[24px] h-[24px]" />
              )}
            </button>
          </div>
          
          {/* 하단 구분선 */}
          <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#E6E6E6]"></div>
        </div>
      ))}
    </div>
  );
}
