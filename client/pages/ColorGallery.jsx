import { useState } from "react";
import { motion } from "framer-motion";

const ColorGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample data for color palettes
  const colorPalettes = [
    {
      id: 1,
      name: "Summer Breeze",
      category: "light",
      colors: ["#FFD1DC", "#FFB6C1", "#FF69B4", "#FF1493", "#C71585"],
      description: "Perfect for light skin tones with warm undertones",
    },
    {
      id: 2,
      name: "Deep Ocean",
      category: "dark",
      colors: ["#000080", "#0000CD", "#4169E1", "#1E90FF", "#87CEEB"],
      description: "Ideal for deep skin tones with cool undertones",
    },
    {
      id: 3,
      name: "Autumn Leaves",
      category: "medium",
      colors: ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F5DEB3"],
      description: "Great for medium skin tones with warm undertones",
    },
    {
      id: 4,
      name: "Spring Bloom",
      category: "light",
      colors: ["#98FB98", "#90EE90", "#3CB371", "#2E8B57", "#006400"],
      description: "Complements light skin tones with neutral undertones",
    },
    {
      id: 5,
      name: "Sunset Glow",
      category: "medium",
      colors: ["#FF4500", "#FF6347", "#FF7F50", "#FFA07A", "#FFDAB9"],
      description: "Enhances medium skin tones with warm undertones",
    },
    {
      id: 6,
      name: "Midnight Sky",
      category: "dark",
      colors: ["#191970", "#483D8B", "#6A5ACD", "#7B68EE", "#9370DB"],
      description: "Perfect for deep skin tones with neutral undertones",
    },
  ];

  // Filter palettes based on selected category
  const filteredPalettes = selectedCategory === "all" 
    ? colorPalettes 
    : colorPalettes.filter(palette => palette.category === selectedCategory);

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Color Gallery</h1>
        <p className="subtitle">Browse color palettes by skin tone category</p>

        {/* Category Filter */}
        <div className="category-filter">
          <button 
            className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          <button 
            className={`filter-btn ${selectedCategory === "light" ? "active" : ""}`}
            onClick={() => setSelectedCategory("light")}
          >
            Light Skin Tones
          </button>
          <button 
            className={`filter-btn ${selectedCategory === "medium" ? "active" : ""}`}
            onClick={() => setSelectedCategory("medium")}
          >
            Medium Skin Tones
          </button>
          <button 
            className={`filter-btn ${selectedCategory === "dark" ? "active" : ""}`}
            onClick={() => setSelectedCategory("dark")}
          >
            Deep Skin Tones
          </button>
        </div>

        {/* Palettes Grid */}
        <div className="palettes-grid">
          {filteredPalettes.map((palette) => (
            <motion.div
              key={palette.id}
              className="palette-card"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <h3>{palette.name}</h3>
              <div className="palette-colors">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="palette-color"
                    style={{ backgroundColor: color }}
                  >
                    <span className="color-code">{color}</span>
                  </div>
                ))}
              </div>
              <p className="palette-description">{palette.description}</p>
              <button className="save-btn">Save Palette</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ColorGallery;