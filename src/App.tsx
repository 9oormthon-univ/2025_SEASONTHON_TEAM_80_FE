import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "@/pages/loginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
