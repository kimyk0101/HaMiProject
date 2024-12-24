import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "/src/component/Home";
import NextPage from "/src/component/NextPage";

function App() {
  return (
  <Router>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/next" element={<NextPage />} />
  </Routes>
  </Router>
  );
}

export default App;