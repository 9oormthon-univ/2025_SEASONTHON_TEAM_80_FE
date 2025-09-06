export interface Song {
  songId: string;
  songTitle: string;
  artist: string;
  coverImage: string;
  streamingUrl: string;
  prestreamingUrl: string;
}

export interface MusicChart {
  musicId: string;
  songName: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  score: number;
}
