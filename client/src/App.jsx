import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import SkinToneResult from "./component/SkinToneResult";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<SkinToneResult />} />
       

      </Routes>
    </Router>
  );
}

export default App;
