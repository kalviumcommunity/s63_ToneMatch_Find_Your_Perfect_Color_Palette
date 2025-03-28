import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import SkinToneResult from "./component/SkinToneResult";
import EntitiesPage from "../pages/entitiesPage";
import UpdateEntity from "../pages/UpdateEntity";
import ColorGallery from "../pages/ColorGallery";
import VirtualTryOn from "../pages/VirtualTryOn";
import ColorQuiz from "../pages/ColorQuiz";
import TrendsPage from "../pages/TrendsPage";
import ShopPage from "../pages/ShopPage";
import UserProfile from "../pages/UserProfile";
import NavBar from "./component/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="content-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/analyze" element={<SkinToneResult />} />
            <Route path="/entity" element={<EntitiesPage />} />
            <Route path="/entity/update/:id" element={<UpdateEntity />} />
            
            {/* New Routes */}
            <Route path="/gallery" element={<ColorGallery />} />
            <Route path="/try-on" element={<VirtualTryOn />} />
            <Route path="/quiz" element={<ColorQuiz />} />
            <Route path="/trends" element={<TrendsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
