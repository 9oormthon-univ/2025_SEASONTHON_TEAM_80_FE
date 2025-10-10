export interface Music {
  musicId: string;
  musicTitle: string;
  artist: string;
  musicCoverUrl: string;
  musicUrl: string;
  prestreamingUrl: string;
}

export interface MusicChart {
  musicId: string;
  musicName: string;
  artist: string;
  musicCoverUrl: string;
  musicUrl: string;
  score: number;
}
