import { useState } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [image, setImage] = useState(null);
  const [palette, setPalette] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        generateColorPalette();
      };
      reader.readAsDataURL(file);
    }
  };

  const generateColorPalette = () => {
    // Placeholder for actual color extraction (replace with Color Thief)
    setPalette(["#ff5733", "#33ff57", "#3357ff", "#f4a261", "#e76f51"]);
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">ToneMatch</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <h1 className="main-title">Find Your Perfect Color Palette</h1>
        <p className="subtitle">
          Upload an image and discover the best colors for your clothing, makeup, and accessories.
        </p>
        {/* Styled Upload Button */}
        <label className="upload-btn">
          Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      </header>

      {/* Uploaded Image Display */}
      {image && (
        <div className="image-section fade-in">
          <h2>Uploaded Image</h2>
          <img src={image} alt="Uploaded" className="uploaded-image" />
        </div>
      )}

      {/* Recommended Color Palette */}
      {palette.length > 0 && (
        <section className="palette-section fade-in">
          <h2>Your Recommended Palette</h2>
          <div className="palette-container">
            {palette.map((color, index) => (
              <div key={index} className="color-box" style={{ backgroundColor: color }}></div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 ToneMatch. All rights reserved.</p>
      </footer>
    </div>
  );
}
