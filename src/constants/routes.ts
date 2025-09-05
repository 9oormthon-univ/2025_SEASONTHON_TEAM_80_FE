export const ROUTES = {
  HOME: "/",
  BOARD: "/board",
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
  ERROR: "*",
} as const;
