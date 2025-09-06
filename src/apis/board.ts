import { API_ENDPOINTS } from "@/apis/config/endpoints";
import { apiGet, apiPost } from "@/lib/api";
import type {
  CreateBoardRequest,
  CreateBoardResponse,
  GetBoardShareResponse,
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
