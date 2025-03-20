import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import SkinToneResult from "./component/SkinToneResult";
import EntitiesPage from "../pages/entitiesPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<SkinToneResult />} />
        <Route path="/entity" element={<EntitiesPage />} />
       

      </Routes>
    </Router>
  );
}

export default App;
