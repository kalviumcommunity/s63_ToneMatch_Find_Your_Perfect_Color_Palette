import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to ToneMatch 🎨</h1>
      <p>Find the perfect color palette based on your skin tone.</p>
      <Link to="/analyze" className="start-button">Get Started 🚀</Link>
    </div>
  );
};

export default LandingPage;
