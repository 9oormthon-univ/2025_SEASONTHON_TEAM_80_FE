import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import {
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
      <Route path={ROUTES.JOIN.NICKNAME} element={<JoinNicknamePage />} />
      <Route path={ROUTES.JOIN.COMPLETE} element={<JoinCompletePage />} />
      <Route path={ROUTES.LETTER.GUIDE} element={<LetterGuidePage />} />
      <Route path={ROUTES.LETTER.SEARCH} element={<MusicSearchPage />} />
      <Route path={ROUTES.LETTER.SELECT} element={<LetterSelectPage />} />
      <Route path={ROUTES.LETTER.WRITE} element={<LetterWritePage />} />
      <Route path={ROUTES.LETTER.COMPLETE} element={<LetterCompletePage />} />
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
    </Routes>
  );
}