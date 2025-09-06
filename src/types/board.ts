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
  // cover image URL for the shared board item
  coverImageUrl: string;
  // sender name
  sender: string;
  // whether the message has been read
  read?: boolean;
}

export interface SharedBoardResponse {
  content: SharedBoardMessage[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  // owner nickname (optional)
  nickname?: string;
}

export interface SharedBoardInfo {
  nickname: string;
}

export interface BoardListItem {
  messageId: string;
  sender: string;
  coverImageUrl: string;
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
  songId?: string | null;
  songName?: string | null;
  artist?: string | null;
  coverImageUrl?: string | null;
  songUrl?: string | null;
}

export interface BoardMessageResponse {
  success: boolean;
  code: number;
  message: string;
  data: BoardMessageData;
}
