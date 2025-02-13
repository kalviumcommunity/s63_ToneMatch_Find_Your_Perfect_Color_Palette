import { useState } from "react";
import "./pages/LandingPage";

export default function LandingPage() {
  const [image, setImage] = useState(null);
  const [palette, setPalette] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        generateColorPalette();
      };
      reader.readAsDataURL(file);
    }
  };

  const generateColorPalette = () => {
    // Simulating color extraction process (Replace with actual library later)
    setPalette(["#ff5733", "#33ff57", "#3357ff", "#f4a261", "#e76f51"]);
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <h2 className="logo">ToneMatch</h2>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      
      <header className="welcome-section">
        <h1 className="title">Discover Your Perfect Colors</h1>
        <p className="description">Upload an image of your skin tone and get personalized color palette recommendations for clothing, makeup, and accessories.</p>
      </header>
      
      <div className="upload-section">
        <label className="upload-button">
          Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      </div>
      
      {image && (
        <div className="image-preview">
          <img src={image} alt="Uploaded" />
        </div>
      )}
      
      {palette.length > 0 && (
        <div className="palette-container">
          <h2 className="palette-title">Your Color Palette</h2>
          <div className="palette">
            {palette.map((color, index) => (
              <div key={index} className="color-box" style={{ backgroundColor: color }}></div>
            ))}
          </div>
        </div>
      )}
      
      <footer className="footer">
        <p>&copy; 2025 ToneMatch. All rights reserved.</p>
      </footer>
    </div>
  );
}
