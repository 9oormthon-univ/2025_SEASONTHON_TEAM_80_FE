import { API_ENDPOINTS } from "@/apis/config/endpoints";
import { apiGet, apiPost } from "@/lib/api";
import type {
  CreateBoardRequest,
  CreateBoardResponse,
  GetBoardShareResponse,
  SharedBoardResponse,
} from "@/types/board";

export const createBoard = async (
  request: CreateBoardRequest
): Promise<CreateBoardResponse> => {
  return apiPost<CreateBoardResponse, CreateBoardRequest>(
    API_ENDPOINTS.BOARD.CREATE,
    request
  );
};

export const getBoardShare = async (): Promise<GetBoardShareResponse> => {
  return apiGet<GetBoardShareResponse>(API_ENDPOINTS.BOARD.SHARE);
};

export const getSharedBoard = async (
  shareUri: string,
  page: number = 0,
  size: number = 10,
  sort: string = "desc"
): Promise<SharedBoardResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });
  return apiGet<SharedBoardResponse>(
    `${API_ENDPOINTS.BOARD.SHARED_BOARD(shareUri)}?${params.toString()}`
  );
};
