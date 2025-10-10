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
  data: {
    boardId: string | null;
    shareUri: string;
  };
}

export interface SharedBoardMessage {
  messageId: string;
  musicId: string;
  musicCoverUrl: string;
}

export interface SharedBoardData {
  content: SharedBoardMessage[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface SharedBoardResponse {
  success: boolean;
  code: number;
  message: string;
  data: SharedBoardData;
}

export interface SharedBoardInfo {
  nickname: string;
}

export interface BoardListItem {
  messageId: string;
  senderName: string;
  content: string;
  musicId: string;
  musicName: string;
  artist: string;
  musicCoverUrl: string;
  musicUrl: string;
  read: boolean;
}

export interface BoardListData {
  content: BoardListItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface BoardListResponse {
  success: boolean;
  code: number;
  message: string;
  data: BoardListData;
}

export interface BoardInfoData {
  name: string;
  profileImage: string;
  messageCount: number;
  serverTime: string;
}

export interface BoardInfoResponse {
  success: boolean;
  code: number;
  message: string;
  data: BoardInfoData;
}

export interface BoardMessageData {
  messageId: string;
  senderName: string;
  content: string;
  musicId?: string | null;
  musicName?: string | null;
  artist?: string | null;
  musicCoverUrl?: string | null;
  musicUrl?: string | null;
}

export interface BoardMessageResponse {
  success: boolean;
  code: number;
  message: string;
  data: BoardMessageData;
}
