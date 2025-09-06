export const ROUTES = {
  HOME: "/",
  JOIN: {
    NICKNAME: "/join/nickname",
    COMPLETE: "/join/complete",
  },
  LETTER: {
    GUIDE: "/letter/guide",
    SEARCH: "/letter/search",
    SELECT: "/letter/select",
    WRITE: "/letter/write",
    COMPLETE: "/letter/complete",
  },
  OAUTH: {
    CALLBACK: "/login/oauth2/code/kakao",
  },
  ERROR: "*",
} as const;
