export interface CreateBoardRequest {
  nickname: string;
}

export interface CreateBoardResponse {
  boardId: string;
  userId: string;
  nickname: string;
  shareUri: string;
}

export interface GetBoardShareResponse {
  boardId: string | null;
  shareUri: string;
}

export interface SharedBoardMessage {
  messageId: string;
  albumCoverUrl: string;
  songTitle: string;
  artist: string;
}

export interface SharedBoardResponse {
  content: SharedBoardMessage[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  nickname?: string;
}

export interface SharedBoardInfo {
  nickname: string;
}
