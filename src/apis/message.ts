import { API_ENDPOINTS } from "@/apis/config/endpoints";
import { apiPost } from "@/lib/api";
import type { MessageData } from "@/types/message";

export const postMessage = async (
  body: Partial<MessageData>
): Promise<{ result: string }> => {
  const data = await apiPost<{ result: string }, Partial<MessageData>>(
    API_ENDPOINTS.MESSAGE.CREATE,
    body
  );

  return data;
};
