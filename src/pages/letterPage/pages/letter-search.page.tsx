import { useState, type SetStateAction } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { BackButton } from "@/components/ui/back-button";
import { NavigationButton } from "@/components/ui/navigation-button";
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
      streaming_url: "" 
    },
    { 
      id: "spotify_id_2", 
      song_title: "Another Song", 
      artist: "Another Artist", 
      album_cover: "", 
      streaming_url: "" 
    },
    { 
      id: "spotify_id_3", 
      song_title: "Third Song", 
      artist: "Third Artist", 
      album_cover: "", 
      streaming_url: "" 
    },
  ];

  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

  const toggleSongSelection = (songId: string) => {
    setSelectedSongs(prev => 
      prev.includes(songId) 
        ? []
        : [songId]
    );
  };

  // 선택된 곡 정보 가져오기
  const selectedSong = selectedSongs.length > 0 
    ? sampleSongs.find(song => song.id === selectedSongs[0])
    : null;

  return (
    <div className="relative flex h-full w-full flex-col bg-gray-100">
      <div className="relative px-4 pt-[25px] pb-[25px] flex items-center">
        <div className="absolute left-4">
          <BackButton />
        </div>
        <h1 className="flex-1 text-center font-bold text-base text-red-200">노래 검색</h1>
      </div>

      <div className="px-4 pb-6 flex justify-center">
        <SearchInput
          value={searchQuery}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
          placeholder="곡, 앨범, 아티스트 명으로 검색"
        />
      </div>

      {/* 추천 음악 섹션 (임시) */}
      <div className="flex flex-col flex-1">
        <h2 className="mb-4 px-4 text-[16px] font-semibold text-brown-200">추천</h2>
        
        {/* 음악 리스트 */}
        <MusicList 
          songs={sampleSongs}
          selectedSongs={selectedSongs}
          onToggleSelection={toggleSongSelection}
        />
      </div>
      
      {/* 하단 고정 영역 */}
      <div className="mt-auto">
        {/* 선택된 곡 정보 영역 */}
        <div 
          className="px-4 h-[104px] flex items-start pt-4"
          style={{ 
            backgroundColor: selectedSong ? 'rgba(142, 45, 45, 0.03)' : 'white'
          }}
        >
          {selectedSong ? (
            <div className="flex items-center w-full">
              <div className="w-[42px] h-[42px] bg-gray-300 rounded-md overflow-hidden">
                <img 
                  src={selectedSong.album_cover} 
                  alt={`${selectedSong.song_title} 앨범 커버`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex-1 ml-4">
                <h3 className="text-[16px] font-semibold text-gray-700">{selectedSong.song_title}</h3>
                <p className="text-[12px] font-normal text-gray-500">{selectedSong.artist}</p>
              </div>
            </div>
          ) : (
            <div className="w-full"></div>
          )}
        </div>
        
        {/* 선택 버튼 */}
        <div className="px-4 pb-5 h-[46px] flex items-end bg-white">
          <NavigationButton active={selectedSongs.length > 0}>선택</NavigationButton>
        </div>
      </div>
    </div>
  );
}

export default MusicSearchPage;