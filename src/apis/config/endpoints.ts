export const API_ENDPOINTS = {
  // 음악 관련
  MUSIC: {
    SEARCH: "/music/search",
    POPULAR_CHART: "/music/popular-chart",
  },

  // 인증 관련
  AUTH: {
    REISSUE: "/auth/reissue",
    LOGOUT: "/auth/logout",
  },

  // 보드 관련
  BOARD: {
    LIST: "/board",
    DETAIL: (messageId: number | string) => `/board/${messageId}`,
    SHARE: "/board/share",
    INFO: "/board/info",
    CREATE: "/board/create",
  },

  // 메시지 관련
  MESSAGE: {
    CREATE: "/message",
  },
} as const;
