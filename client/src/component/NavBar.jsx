import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NavBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">ToneMatch</span>
          <span className="logo-icon">🎨</span>
        </Link>

        {/* Mobile menu button */}
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        {/* Navigation links */}
        <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/analyze"
              className={`nav-link ${isActive("/analyze") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Analyze
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/gallery"
              className={`nav-link ${isActive("/gallery") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/try-on"
              className={`nav-link ${isActive("/try-on") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Virtual Try-On
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/quiz"
              className={`nav-link ${isActive("/quiz") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Color Quiz
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/trends"
              className={`nav-link ${isActive("/trends") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Trends
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/shop"
              className={`nav-link ${isActive("/shop") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/entity"
              className={`nav-link ${isActive("/entity") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Entities
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/profile"
              className={`nav-link ${isActive("/profile") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default NavBar;