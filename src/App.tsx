import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppShell from "./layouts/AppShell";
import {
  JoinCompletePage,
  JoinNicknamePage,
  LetterGuidePage,
  LoginPage,
  MusicSearchPage,
} from "./pages";

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/join/nickname" element={<JoinNicknamePage />} />
          <Route path="/join/complete" element={<JoinCompletePage />} />
          <Route path="/letter/guide" element={<LetterGuidePage />} />
          <Route path="/letter/search" element={<MusicSearchPage />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;
