import { apiPost } from "@/lib/api";
import { API_ENDPOINTS } from "./config/endpoints";

interface LogoutResponse {
  success: boolean;
  code: number;
  message: string;
  data: string;
}

export const logout = async (): Promise<LogoutResponse> => {
  return apiPost<LogoutResponse>(API_ENDPOINTS.AUTH.LOGOUT);
};
