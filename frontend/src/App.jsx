import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/login";
import Register from "./page/Register";
import Home from "./page/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
