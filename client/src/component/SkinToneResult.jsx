/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Required for JSX
/* eslint-enable no-unused-vars */
import { motion } from "framer-motion";
import { extractDominantColor } from "../utils/colorExtractor";

const SkinToneResult = () => {
  const [image, setImage] = useState(null);
  const [skinTone, setSkinTone] = useState("#D2A679");
  const [colors, setColors] = useState([]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [feedback, setFeedback] = useState("");
  const [colorScheme, setColorScheme] = useState("warm"); // warm, cool, neutral
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    if (skinTone) {
      updateColorPalette(skinTone, colorScheme);
    }
  }, [skinTone, colorScheme]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImage(e.dataTransfer.files[0]);
    }
  };

  const processImage = async (file) => {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    try {
      const dominantColor = await extractDominantColor(imageUrl);
      setSkinTone(dominantColor);
      setAnalysisComplete(true);
    } catch (error) {
      console.error("Error extracting color:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateColorPalette = (tone, scheme) => {
    const palettes = {
      warm: ["#FFB74D", "#F57C00", "#E64A19", "#D84315", "#BF360C"],
      cool: ["#64B5F6", "#1976D2", "#303F9F", "#283593", "#1A237E"],
      neutral: ["#BDBDBD", "#9E9E9E", "#757575", "#616161", "#424242"],
    };
    setColors(palettes[scheme]);
  };

  const submitFeedback = async () => {
    if (!feedback.trim()) return;
    
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

  const colorSchemeOptions = [
    { value: "warm", label: "Warm", emoji: "🔥", description: "Perfect for warm undertones" },
    { value: "cool", label: "Cool", emoji: "❄️", description: "Ideal for cool undertones" },
    { value: "neutral", label: "Neutral", emoji: "⚖️", description: "Great for neutral undertones" }
  ];

  return (
    <motion.div 
      className="analyze-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="page-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Discover Your <span className="gradient-text">Perfect Palette</span>
      </motion.h1>
      
      <motion.p 
        className="page-description"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Upload a photo of yourself in natural lighting to analyze your skin tone and get personalized color recommendations
      </motion.p>

      {/* Upload Section */}
      <motion.section 
        className="upload-section"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="section-title">Upload Your Photo</h2>
        
        <div 
          className={`upload-area ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon">📸</div>
          <p>Drag & drop your image here or</p>
          <label className="upload-button-label">
            <span>Choose File</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden-input" 
            />
          </label>
          <p className="upload-tip">For best results, use a well-lit photo with a clear view of your face</p>
        </div>
      </motion.section>

      {/* Analysis Results Section */}
      {image && (
        <motion.section 
          className="analysis-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="analysis-container">
            <div className="image-container">
              <h3>Your Photo</h3>
              
              <div className="image-adjustment">
                <div className="slider-group">
                  <label>Brightness: {brightness}%</label>
                  <input 
                    type="range" 
                    min="50" 
                    max="150" 
                    value={brightness} 
                    onChange={(e) => setBrightness(e.target.value)} 
                    className="slider"
                  />
                </div>
                
                <div className="slider-group">
                  <label>Contrast: {contrast}%</label>
                  <input 
                    type="range" 
                    min="50" 
                    max="150" 
                    value={contrast} 
                    onChange={(e) => setContrast(e.target.value)} 
                    className="slider"
                  />
                </div>
              </div>
              
              <div className="image-preview">
                <img 
                  src={image} 
                  alt="Uploaded" 
                  className="uploaded-image" 
                  style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }} 
                />
              </div>
            </div>
            
            <div className="results-container">
              <h3>Analysis Results</h3>
              
              {isAnalyzing ? (
                <div className="analyzing-indicator">
                  <div className="spinner"></div>
                  <p>Analyzing your skin tone...</p>
                </div>
              ) : (
                <>
                  <div className="detected-tone">
                    <h4>Detected Skin Tone</h4>
                    <div className="tone-display">
                      <div 
                        className="skin-tone-box" 
                        style={{ backgroundColor: skinTone }}
                      ></div>
                      <div className="tone-info">
                        <p className="tone-hex">{skinTone}</p>
                        <p className="tone-description">
                          {colorScheme === "warm" ? "Warm undertones" : 
                           colorScheme === "cool" ? "Cool undertones" : 
                           "Neutral undertones"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="color-scheme-selector">
                    <h4>Select Color Scheme</h4>
                    <div className="scheme-options">
                      {colorSchemeOptions.map((scheme) => (
                        <button 
                          key={scheme.value}
                          onClick={() => setColorScheme(scheme.value)}
                          className={`scheme-button ${colorScheme === scheme.value ? 'active' : ''}`}
                        >
                          <span className="scheme-emoji">{scheme.emoji}</span>
                          <span className="scheme-label">{scheme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="recommended-colors">
                    <h4>Your Recommended Colors</h4>
                    <div className="color-palette">
                      {colors.map((color, index) => (
                        <div 
                          key={index} 
                          className="color-box" 
                          style={{ backgroundColor: color }}
                        >
                          <span className="color-tooltip">{color}</span>
                        </div>
                      ))}
                    </div>
                    <p className="palette-description">
                      These colors are specially selected to complement your {colorScheme} skin tone
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* Color Tips Section */}
      {analysisComplete && (
        <motion.section 
          className="tips-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>How to Use Your Color Palette</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">👗</div>
              <h4>Clothing</h4>
              <p>Choose tops, dresses, and accessories in these colors to enhance your natural complexion</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">💄</div>
              <h4>Makeup</h4>
              <p>Select lipsticks, eyeshadows, and blushes in these shades for a harmonious look</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🎨</div>
              <h4>Home Decor</h4>
              <p>Surround yourself with these colors in your living space for a personalized environment</p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Feedback Section */}
      <motion.section 
        className="feedback-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3>Share Your Feedback</h3>
        <p>How accurate were the color suggestions? Let us know your thoughts!</p>
        
        <div className="feedback-form">
          <textarea 
            placeholder="Your feedback helps us improve..." 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)}
            className="feedback-input"
          />
          <button 
            onClick={submitFeedback}
            className="submit-feedback"
            disabled={!feedback.trim()}
          >
            Submit Feedback
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default SkinToneResult;