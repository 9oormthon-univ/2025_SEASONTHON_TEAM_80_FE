import axios, { type AxiosError, type AxiosInstance } from "axios";

// 로딩 상태 관리
let loadingCount = 0;
let loadingCallback: ((isLoading: boolean) => void) | null = null;

export const setLoadingCallback = (callback: (isLoading: boolean) => void) => {
  loadingCallback = callback;
};

const updateLoadingState = () => {
  if (loadingCallback) {
    loadingCallback(loadingCount > 0);
  }
};

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_API_VERSION || ""}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    loadingCount++;
    updateLoadingState();

    if (import.meta.env.DEV) {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
      );
    }

    return config;
  },
  (error) => {
    loadingCount = Math.max(0, loadingCount - 1);
    updateLoadingState();
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    loadingCount = Math.max(0, loadingCount - 1);
    updateLoadingState();

    if (import.meta.env.DEV) {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }

    return response;
  },
  (error: AxiosError) => {
    loadingCount = Math.max(0, loadingCount - 1);
    updateLoadingState();

    // 에러 로깅
    if (import.meta.env.DEV) {
      console.error(
        `API Error: ${error.response?.status} ${error.config?.url}`
      );
    }

    // 401
    if (error.response?.status === 401) {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    // 403
    if (error.response?.status === 403) {
      console.warn("접근 권한이 없습니다.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
