import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { JoinCompletePage, JoinNicknamePage, LoginPage } from "./pages";
import AppShell from "./layouts/AppShell";

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/join/nickname" element={<JoinNicknamePage />} />
          <Route path="/join/complete" element={<JoinCompletePage />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;
