import React, { useState } from "react";
import { extractDominantColor } from "../utils/colorExtractor";

const SkinToneResult = () => {
  const [image, setImage] = useState(null);
  const [skinTone, setSkinTone] = useState("#D2A679");
  const [colors, setColors] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      extractDominantColor(imageUrl).then((dominantColor) => {
        setSkinTone(dominantColor);
        setColors(["#E57373", "#F06292", "#BA68C8", "#64B5F6", "#4DB6AC"]);
      });
    }
  };

  return (
    <div className="result-container">
      <h2>Upload Your Image 📸</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="upload-button" />
      {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
      
      <h2>Your Detected Skin Tone 🧐</h2>
      <div className="skin-tone-box" style={{ backgroundColor: skinTone }}></div>

      <h3>Recommended Colors 🎨:</h3>
      <div className="color-palette">
        {colors.map((color, index) => (
          <div key={index} className="color-box" style={{ backgroundColor: color }}></div>
        ))}
      </div>
    </div>
  );
};

export default SkinToneResult;
