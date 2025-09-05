import axiosInstance from "@/apis/config/instance";

export const apiGet = async <T, P = undefined>(
  url: string,
  params?: P
): Promise<T> => {
  const response = await axiosInstance.get<T>(url, { params });
  return response.data;
};

export const apiPost = async <T, B = undefined>(
  url: string,
  body?: B
): Promise<T> => {
  const response = await axiosInstance.post<T>(url, body);
  return response.data;
};

export const apiPut = async <T, B = undefined>(
  url: string,
  body?: B
): Promise<T> => {
  const response = await axiosInstance.put<T>(url, body);
  return response.data;
};

export const apiPatch = async <T, B = undefined>(
  url: string,
  body?: B
): Promise<T> => {
  const response = await axiosInstance.patch<T>(url, body);
  return response.data;
};

export const apiDelete = async <T, P = undefined>(
  url: string,
  params?: P
): Promise<T> => {
  const response = await axiosInstance.delete<T>(url, { params });
  return response.data;
};

export const apiPostFormData = async <T>(
  url: string,
  formData: FormData
): Promise<T> => {
  const response = await axiosInstance.post<T>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const apiPutFormData = async <T>(
  url: string,
  formData: FormData
): Promise<T> => {
  const response = await axiosInstance.put<T>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
