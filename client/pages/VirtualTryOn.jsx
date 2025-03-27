import { useState } from "react";
import { motion } from "framer-motion";
import { extractDominantColor } from "../src/utils/colorExtractor";

const VirtualTryOn = () => {
  const [image, setImage] = useState(null);
  const [skinTone, setSkinTone] = useState("#D2A679"); // Default skin tone
  const [selectedColor, setSelectedColor] = useState("#FF5733");
  const [colorName, setColorName] = useState("Coral Red");
  const [compatibility, setCompatibility] = useState("Good");

  // Predefined colors with names
  const predefinedColors = [
    { hex: "#FF5733", name: "Coral Red" },
    { hex: "#33FF57", name: "Mint Green" },
    { hex: "#3357FF", name: "Royal Blue" },
    { hex: "#F033FF", name: "Bright Pink" },
    { hex: "#FF33A8", name: "Hot Pink" },
    { hex: "#33FFF0", name: "Turquoise" },
    { hex: "#FFD700", name: "Gold" },
    { hex: "#800080", name: "Purple" },
    { hex: "#008000", name: "Green" },
    { hex: "#000080", name: "Navy Blue" },
  ];

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      try {
        const dominantColor = await extractDominantColor(imageUrl);
        setSkinTone(dominantColor);
        calculateCompatibility(dominantColor, selectedColor);
      } catch (error) {
        console.error("Error extracting color:", error);
      }
    }
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color.hex);
    setColorName(color.name);
    calculateCompatibility(skinTone, color.hex);
  };

  // Calculate color compatibility
  const calculateCompatibility = (skin, color) => {
    // This is a simplified algorithm for demonstration
    // In a real app, you would use color theory to determine compatibility
    
    // Convert hex to RGB
    const skinRGB = hexToRgb(skin);
    const colorRGB = hexToRgb(color);
    
    if (!skinRGB || !colorRGB) {
      setCompatibility("Unknown");
      return;
    }
    
    // Calculate color difference
    const difference = Math.sqrt(
      Math.pow(colorRGB.r - skinRGB.r, 2) +
      Math.pow(colorRGB.g - skinRGB.g, 2) +
      Math.pow(colorRGB.b - skinRGB.b, 2)
    );
    
    // Determine compatibility based on difference
    if (difference > 200) {
      setCompatibility("Excellent");
    } else if (difference > 150) {
      setCompatibility("Good");
    } else if (difference > 100) {
      setCompatibility("Fair");
    } else {
      setCompatibility("Poor");
    }
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex) => {
    // For RGB format like "rgb(r, g, b)"
    if (hex.startsWith("rgb")) {
      const match = hex.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        return {
          r: parseInt(match[1]),
          g: parseInt(match[2]),
          b: parseInt(match[3])
        };
      }
      return null;
    }
    
    // For hex format like "#RRGGBB"
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Virtual Try-On</h1>
        <p className="subtitle">Simulate how colors look with your skin tone</p>

        <div className="try-on-container">
          <div className="upload-section">
            <h2>Upload Your Image</h2>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="upload-button"
            />
            
            {image && (
              <div className="image-preview">
                <img src={image} alt="Uploaded" className="uploaded-image" />
                <div className="detected-skin-tone">
                  <h3>Detected Skin Tone</h3>
                  <div 
                    className="skin-tone-box" 
                    style={{ backgroundColor: skinTone }}
                  ></div>
                  <p>{skinTone}</p>
                </div>
              </div>
            )}
          </div>

          <div className="color-selection">
            <h2>Select a Color to Try On</h2>
            <div className="color-grid">
              {predefinedColors.map((color, index) => (
                <div 
                  key={index} 
                  className={`color-option ${selectedColor === color.hex ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorSelect(color)}
                >
                  <span className="color-tooltip">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="compatibility-result">
            <h2>Color Compatibility</h2>
            <div className="result-display">
              <div className="color-comparison">
                <div className="skin-color" style={{ backgroundColor: skinTone }}></div>
                <div className="selected-color" style={{ backgroundColor: selectedColor }}></div>
              </div>
              <div className="compatibility-info">
                <p><strong>Selected Color:</strong> {colorName} ({selectedColor})</p>
                <p><strong>Compatibility:</strong> <span className={`compatibility-${compatibility.toLowerCase()}`}>{compatibility}</span></p>
                <p className="compatibility-explanation">
                  {compatibility === "Excellent" && "This color creates a beautiful contrast with your skin tone."}
                  {compatibility === "Good" && "This color works well with your skin tone."}
                  {compatibility === "Fair" && "This color is acceptable with your skin tone."}
                  {compatibility === "Poor" && "This color may not complement your skin tone well."}
                </p>
              </div>
            </div>
          </div>

          <div className="simulation-view">
            <h2>Simulation</h2>
            <div className="simulation-container" style={{ backgroundColor: skinTone }}>
              <div className="simulation-item" style={{ backgroundColor: selectedColor }}>
                <p>Clothing Item</p>
              </div>
            </div>
            <p className="simulation-note">This is a simplified simulation. The actual appearance may vary.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VirtualTryOn;