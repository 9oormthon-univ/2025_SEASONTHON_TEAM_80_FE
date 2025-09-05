import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppShell from "./layouts/AppShell";
import { queryClient } from "./lib/query-client";
import {
  JoinCompletePage,
  JoinNicknamePage,
  LetterCompletePage,
  LetterGuidePage,
  LetterSelectPage,
  LetterWritePage,
  LoginPage,
  MusicSearchPage,
} from "./pages";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppShell>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/join/nickname" element={<JoinNicknamePage />} />
            <Route path="/join/complete" element={<JoinCompletePage />} />
            <Route path="/letter/guide" element={<LetterGuidePage />} />
            <Route path="/letter/search" element={<MusicSearchPage />} />
            <Route path="/letter/select" element={<LetterSelectPage />} />
            <Route path="/letter/write" element={<LetterWritePage />} />
            <Route path="/letter/complete" element={<LetterCompletePage />} />
          </Routes>
        </AppShell>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
