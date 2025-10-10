import { API_ENDPOINTS } from "@/apis/config/endpoints";
import { apiGet } from "@/lib/api";
import type { Music, MusicChart } from "@/types/song";

// API 응답의 가능한 구조 정의
interface MusicSearchResponse {
  data?:
    | {
        searchResult?: Music[];
      }
    | Music[];
  items?: Music[];
}

export const getPopularMusicCharts = async (): Promise<MusicChart[]> => {
  const data = await apiGet<MusicChart[]>(API_ENDPOINTS.MUSIC.POPULAR_CHART);
  return data;
};

export const getSearchedSongs = async (query?: string): Promise<Music[]> => {
  const params = query ? { keyword: query } : undefined;
  const data = await apiGet<
    Music[] | MusicSearchResponse,
    { keyword?: string }
  >(API_ENDPOINTS.MUSIC.SEARCH, params);

  if (Array.isArray(data)) return data;

  const response = data as MusicSearchResponse;
  
  // 중첩된 응답 구조 처리
  const musicArray =
    (Array.isArray(response.data) ? response.data : null) ??
    (response.data && !Array.isArray(response.data) ? response.data.searchResult : null) ??
    response.items;

  if (!musicArray) {
    console.warn('Unexpected API response structure:', data);
    return [];
  }

  return musicArray;
};
