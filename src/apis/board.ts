import { API_ENDPOINTS } from "@/apis/config/endpoints";
import { apiGet, apiPost } from "@/lib/api";
import type {
  BoardInfoResponse,
  BoardListResponse,
  BoardMessageResponse,
  CreateBoardRequest,
  CreateBoardResponse,
  GetBoardShareResponse,
  SharedBoardResponse,
} from "@/types/board";

// 보드 생성
export const createBoard = async (
  request: CreateBoardRequest
): Promise<CreateBoardResponse> => {
  return apiPost<CreateBoardResponse, CreateBoardRequest>(
    API_ENDPOINTS.BOARD.CREATE,
    request
  );
};

// 보드 공유 링크 반환
export const getBoardShare = async (): Promise<GetBoardShareResponse> => {
  return apiGet<GetBoardShareResponse>(API_ENDPOINTS.BOARD.SHARE);
};

//공유 보드 메세지 반환
export const getSharedBoard = async (
  shareUri: string,
  page: number = 0,
  size: number = 10,
  sort: string = "desc"
): Promise<SharedBoardResponse> => {
  // send pagination/sort as query params on GET
  const qs = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  }).toString();

  return apiGet<SharedBoardResponse>(
    `${API_ENDPOINTS.BOARD.SHARED_BOARD(shareUri)}?${qs}`
  );
};

//보드 정보 반환
export const getBoardInfo = async (
  shareUri: string
): Promise<BoardInfoResponse> => {
  return apiGet<BoardInfoResponse>(
    API_ENDPOINTS.BOARD.INFO_BY_SHARE_URI(shareUri)
  );
};

//보드 상세 메세지 반환
export const getBoardDetail = async (
  messageId: string
): Promise<BoardMessageResponse> => {
  return apiGet<BoardMessageResponse>(API_ENDPOINTS.BOARD.DETAIL(messageId));
};

//보드 리스트 반환
export const getBoardList = async (
  page = 0,
  size = 10,
  sort = "desc"
): Promise<BoardListResponse> => {
  const body = { page, size, sort } as unknown as object;
  return apiGet<BoardListResponse, object>(API_ENDPOINTS.BOARD.LIST, body);
};
