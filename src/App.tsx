/** @jsxImportSource @emotion/react */

import { Login } from "./components/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/home";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <Router>
      {user ? (
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
