import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPopularMusicCharts, getSearchedSongs } from "@/apis/music";
import { BackButton } from "@/components/ui/back-button";
import { NavigationButton } from "@/components/ui/navigation-button";
import { SearchInput } from "@/components/ui/search-input";
import { MusicList } from "@/pages/letterPage/components/music-list";
import type { MessageData } from "@/types/message";
import type { Song as ApiSong, MusicChart } from "@/types/song";

type ListSong = {
  id: string;
  song_title: string;
  artist: string;
  album_cover: string;
  streaming_url: string;
};

function MusicSearchPage() {
  const navigate = useNavigate();
  const { shareUri } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [recommended, setRecommended] = useState<ListSong[]>([]);
  const [results, setResults] = useState<ListSong[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const LOCALSTORAGE_KEY = "messageDraft";

  const toggleSongSelection = (songId: string) => {
    setSelectedSongs((prev) => (prev.includes(songId) ? [] : [songId]));
  };

  const mapChartToListSong = (chart: MusicChart): ListSong => ({
    id: chart.musicId,
    song_title: chart.songName,
    artist: chart.artist,
    album_cover: chart.albumImageUrl,
    streaming_url: chart.songUrl,
  });

  const mapApiSongToListSong = (s: ApiSong): ListSong => ({
    id: s.songId,
    song_title: s.songTitle,
    artist: s.artist,
    album_cover: s.coverImage,
    streaming_url: s.streamingUrl || s.prestreamingUrl || "",
  });

  // 인기 차트(추천) 불러오기
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const charts = await getPopularMusicCharts();
        if (!mounted) return;

        const chartArray: unknown = Array.isArray(charts)
          ? charts
          : ((charts as any)?.data ?? (charts as any)?.items ?? []);

        if (!Array.isArray(chartArray)) {
          setRecommended([]);
          return;
        }

        setRecommended((chartArray as MusicChart[]).map(mapChartToListSong));
      } catch (e) {
        console.error("Failed to load popular charts:", e);
        setRecommended([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const performSearch = async (query: string) => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const songs = await getSearchedSongs(q);
      setResults(songs.map(mapApiSongToListSong));
    } catch (_e) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Enter 눌렀을 때만 검색 실행
      void performSearch(searchQuery);
    }
  };

  const displayedSongs = searchQuery.trim() ? results : recommended;

  const selectedSong =
    selectedSongs.length > 0
      ? (displayedSongs.find((song) => song.id === selectedSongs[0]) ?? null)
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
          onKeyDown={onInputKeyDown}
          placeholder="곡, 앨범, 아티스트 명으로 검색"
          maxLength={50}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <h2 className="mb-4 px-4 font-semibold text-[16px] text-brown-200">
          {searchQuery.trim() ? "검색 결과" : "추천"}
        </h2>

        <div className="flex-1 overflow-y-auto">
          <MusicList
            songs={displayedSongs}
            selectedSongs={selectedSongs}
            onToggleSelection={toggleSongSelection}
          />
          {loading && (
            <div className="px-4 py-3 text-center text-gray-500 text-sm">
              검색 중...
            </div>
          )}
          {!loading && searchQuery.trim() && displayedSongs.length === 0 && (
            <div className="px-4 py-3 text-center text-gray-500 text-sm">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto">
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

        <div className="flex h-[46px] items-end bg-white px-4 pb-5">
          <NavigationButton
            active={selectedSongs.length > 0}
            onClick={() => {
              if (!selectedSong) return;
              const draft: Partial<MessageData> = {
                shareUri: "",
                senderName: "",
                content: "",
                songTitle: selectedSong.song_title,
                artist: selectedSong.artist,
                albumImageUrl: selectedSong.album_cover,
                songUrl: selectedSong.streaming_url,
              };
              try {
                localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(draft));
              } catch (e) {
                console.error("Failed to save draft to localStorage", e);
              }
              navigate(
                shareUri ? `/letter/write/${shareUri}` : "/letter/write"
              );
            }}
          >
            선택
          </NavigationButton>
        </div>
      </div>
    </div>
  );
}

export default MusicSearchPage;
