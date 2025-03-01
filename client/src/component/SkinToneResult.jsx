import React, { useState, useEffect } from "react";
import { extractDominantColor } from "../utils/colorExtractor";

const SkinToneResult = () => {
  const [image, setImage] = useState(null);
  const [skinTone, setSkinTone] = useState("#D2A679");
  const [colors, setColors] = useState([]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [feedback, setFeedback] = useState("");
  const [colorScheme, setColorScheme] = useState("warm"); // warm, cool, neutral

  useEffect(() => {
    if (skinTone) {
      updateColorPalette(skinTone, colorScheme);
    }
  }, [skinTone, colorScheme]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      try {
        const dominantColor = await extractDominantColor(imageUrl);
        setSkinTone(dominantColor);
      } catch (error) {
        console.error("Error extracting color:", error);
      }
    }
  };

  const updateColorPalette = (tone, scheme) => {
    const palettes = {
      warm: ["#FFB74D", "#F57C00", "#E64A19", "#D84315"],
      cool: ["#64B5F6", "#1976D2", "#303F9F", "#283593"],
      neutral: ["#BDBDBD", "#9E9E9E", "#757575", "#616161"],
    };
    setColors(palettes[scheme]);
  };

  const submitFeedback = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback })
      });
      if (response.ok) {
        alert("Thank you for your feedback! 😊");
        setFeedback("");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="result-container">
      <h2>Upload Your Image 📸</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="upload-button" />
      
      {image && (
        <>
          <h3>Adjust Image Settings 🎛️</h3>
          <label>Brightness: {brightness}%</label>
          <input type="range" min="50" max="150" value={brightness} onChange={(e) => setBrightness(e.target.value)} />
          
          <label>Contrast: {contrast}%</label>
          <input type="range" min="50" max="150" value={contrast} onChange={(e) => setContrast(e.target.value)} />
          
          <img src={image} alt="Uploaded" className="uploaded-image" style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }} />
        </>
      )}

      <h2>Your Detected Skin Tone 🧐</h2>
      <div className="skin-tone-box" style={{ backgroundColor: skinTone }}></div>

      <h3>Select Color Scheme 🎨</h3>
      {['warm', 'cool', 'neutral'].map((scheme) => (
        <button key={scheme} onClick={() => setColorScheme(scheme)}>
          {scheme === 'warm' ? '🔥 Warm' : scheme === 'cool' ? '❄️ Cool' : '⚖️ Neutral'}
        </button>
      ))}

      <h3>Recommended Colors:</h3>
      <div className="color-palette">
        {colors.map((color, index) => (
          <div key={index} className="color-box" style={{ backgroundColor: color }}></div>
        ))}
      </div>

      <h3>💬 Give Us Your Feedback!</h3>
      <textarea placeholder="How accurate were the color suggestions?" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      <button onClick={submitFeedback}>Submit</button>
    </div>
  );
};

export default SkinToneResult;
