import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./component/MainScreen";
import MenuScreen from "./component/MenuScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/menu" element={<MenuScreen />} />
      </Routes>
    </Router>
  );
}
export default App;
