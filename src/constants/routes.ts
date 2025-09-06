export const ROUTES = {
  HOME: "/",
  BOARD: "/board",
  SHARED_BOARD: "/board/:shareUri",
  JOIN: {
    NICKNAME: "/join/nickname",
    COMPLETE: "/join/complete",
  },
  LETTER: {
    GUIDE: "/letter/guide/:shareUri",
    SEARCH: "/letter/search/:shareUri",
    SELECT: "/letter/select/:shareUri",
    WRITE: "/letter/write/:shareUri",
    COMPLETE: "/letter/complete/:shareUri",
  },
  OAUTH: {
    CALLBACK: "/login/oauth2/code/kakao",
  },
  ERROR: "*",
} as const;
