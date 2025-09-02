import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { JoinCompletePage, JoinNicknamePage, LoginPage } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/join/nickname" element={<JoinNicknamePage />} />
        <Route path="/join/complete" element={<JoinCompletePage />} />
      </Routes>
    </Router>
  );
}

export default App;
