import { Route, Routes } from "react-router-dom";
import OAuthCallback from "@/pages/oauth/callback";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { ROUTES } from "../constants/routes";
import {
  BoardPage,
  ErrorPage,
  JoinCompletePage,
  JoinNicknamePage,
  LetterCompletePage,
  LetterGuidePage,
  LetterSelectPage,
  LetterWritePage,
  LoginPage,
  MusicSearchPage,
} from "../pages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<LoginPage />} />
      <Route path={ROUTES.OAUTH.CALLBACK} element={<OAuthCallback />} />
      <Route
        path={ROUTES.JOIN.NICKNAME}
        element={
          <ProtectedRoute requireBoard={false}>
            <JoinNicknamePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.JOIN.COMPLETE}
        element={
          <ProtectedRoute requireBoard={false}>
            <JoinCompletePage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.LETTER.GUIDE} element={<LetterGuidePage />} />
      <Route path={ROUTES.LETTER.SEARCH} element={<MusicSearchPage />} />
      <Route path={ROUTES.LETTER.SELECT} element={<LetterSelectPage />} />
      <Route path={ROUTES.LETTER.WRITE} element={<LetterWritePage />} />
      <Route path={ROUTES.LETTER.COMPLETE} element={<LetterCompletePage />} />
      <Route path={ROUTES.BOARD} element={<BoardPage />} />
      <Route path={ROUTES.SHARED_BOARD} element={<BoardPage />} />
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
    </Routes>
  );
}
