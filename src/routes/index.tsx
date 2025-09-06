import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import OAuthCallback from "@/pages/oauth/callback";
import UserProfilePage from "@/pages/userPage/pages/user-profile-page";
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
        path={ROUTES.JOIN.GUIDE}
        element={
          <ProtectedRoute requireBoard={false}>
            <LetterGuidePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.JOIN.GUIDE_WITH_SHARE}
        element={
          <ProtectedRoute requireBoard={false}>
            <LetterGuidePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.JOIN.SEARCH}
        element={
          <ProtectedRoute requireBoard={false}>
            <MusicSearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.JOIN.SEARCH_WITH_SHARE}
        element={
          <ProtectedRoute requireBoard={false}>
            <MusicSearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.JOIN.SELECT}
        element={
          <ProtectedRoute requireBoard={false}>
            <LetterSelectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.JOIN.SELECT_WITH_SHARE}
        element={
          <ProtectedRoute requireBoard={false}>
            <LetterSelectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.JOIN.WRITE}
        element={
          <ProtectedRoute requireBoard={false}>
            <LetterWritePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.JOIN.WRITE_WITH_SHARE}
        element={
          <ProtectedRoute requireBoard={false}>
            <LetterWritePage />
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
      <Route
        path={ROUTES.USER.PROFILE}
        element={
          <ProtectedRoute requireBoard={true}>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.LETTER.GUIDE} element={<LetterGuidePage />} />
      <Route path={ROUTES.LETTER.SEARCH} element={<MusicSearchPage />} />
      <Route path={ROUTES.LETTER.SELECT} element={<LetterSelectPage />} />
      <Route path={ROUTES.LETTER.WRITE} element={<LetterWritePage />} />
      <Route path={ROUTES.LETTER.COMPLETE} element={<LetterCompletePage />} />

      <Route
        path={ROUTES.BOARD}
        element={
          <ProtectedRoute requireBoard={true}>
            <BoardPage />
          </ProtectedRoute>
        }
      />

      <Route path={ROUTES.SHARED_BOARD} element={<BoardPage />} />
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
    </Routes>
  );
}
