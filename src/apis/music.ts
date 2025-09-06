import { API_ENDPOINTS } from "@/apis/config/endpoints";
import { apiGet } from "@/lib/api";
import type { MusicChart, Song } from "@/types/song";

export const getPopularMusicCharts = async (): Promise<MusicChart[]> => {
  const data = await apiGet<MusicChart[]>(API_ENDPOINTS.MUSIC.POPULAR_CHART);
  return data;
};

export const getSearchedSongs = async (query?: string): Promise<Song[]> => {
  const params = query ? { keyword: query } : undefined;
  const data = await apiGet<Song[] | unknown, { keyword?: string }>(
    API_ENDPOINTS.MUSIC.SEARCH,
    params
  );

  if (Array.isArray(data)) return data as Song[];
  const arr =
    (data as any)?.data?.searchResult ??
    (data as any)?.data ??
    (data as any)?.items ??
    [];
  return arr as Song[];
};
