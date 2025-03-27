import { useState } from "react";
import { motion } from "framer-motion";

const TrendsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSeason, setActiveSeason] = useState("current");
  const [savedColors, setSavedColors] = useState([]);

  // Sample trend data
  const trends = [
    {
      id: 1,
      name: "Digital Lavender",
      hex: "#E6E6FA",
      category: "fashion",
      season: "current",
      description: "A soft, dreamy purple that embodies tranquility and digital innovation.",
      popularity: 95
    },
    {
      id: 2,
      name: "Viva Magenta",
      hex: "#BB2649",
      category: "fashion",
      season: "current",
      description: "Vibrant and energetic, this crimson red encourages experimentation and self-expression.",
      popularity: 90
    },
    {
      id: 3,
      name: "Sundial",
      hex: "#E9B265",
      category: "beauty",
      season: "current",
      description: "A warm golden yellow that brings optimism and solar energy to makeup looks.",
      popularity: 88
    },
    {
      id: 4,
      name: "Tranquil Blue",
      hex: "#5D8AA8",
      category: "fashion",
      season: "upcoming",
      description: "A calming mid-tone blue that reflects our desire for stability and peace.",
      popularity: 85
    },
    {
      id: 5,
      name: "Matcha",
      hex: "#87A96B",
      category: "beauty",
      season: "upcoming",
      description: "A grounding green that connects us to nature and wellness practices.",
      popularity: 82
    },
    {
      id: 6,
      name: "Peach Fuzz",
      hex: "#FFCC99",
      category: "fashion",
      season: "upcoming",
      description: "A nurturing, velvety peach tone that brings warmth and compassion.",
      popularity: 89
    },
    {
      id: 7,
      name: "Cyber Lime",
      hex: "#BFFF00",
      category: "beauty",
      season: "current",
      description: "An electrifying neon green that captures digital energy and youthful expression.",
      popularity: 80
    },
    {
      id: 8,
      name: "Apricot Crush",
      hex: "#FBCEB1",
      category: "fashion",
      season: "current",
      description: "A soft, nurturing orange that evokes comfort and optimism.",
      popularity: 87
    },
    {
      id: 9,
      name: "Midnight Plum",
      hex: "#5A395A",
      category: "beauty",
      season: "upcoming",
      description: "A deep, mysterious purple that adds drama and sophistication to evening looks.",
      popularity: 84
    }
  ];

  // Filter trends based on active filters
  const filteredTrends = trends.filter(trend => {
    if (activeCategory !== "all" && trend.category !== activeCategory) return false;
    if (activeSeason !== "all" && trend.season !== activeSeason) return false;
    return true;
  });

  // Sort trends by popularity
  const sortedTrends = [...filteredTrends].sort((a, b) => b.popularity - a.popularity);

  // Handle saving a color
  const handleSaveColor = (trend) => {
    if (!savedColors.some(color => color.id === trend.id)) {
      setSavedColors([...savedColors, trend]);
    } else {
      setSavedColors(savedColors.filter(color => color.id !== trend.id));
    }
  };

  // Check if a color is saved
  const isColorSaved = (id) => {
    return savedColors.some(color => color.id === id);
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Color Trends</h1>
        <p className="subtitle">Discover the latest color trends in fashion and beauty</p>

        <div className="filters-container">
          <div className="filter-group">
            <h3>Category</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </button>
              <button 
                className={`filter-btn ${activeCategory === "fashion" ? "active" : ""}`}
                onClick={() => setActiveCategory("fashion")}
              >
                Fashion
              </button>
              <button 
                className={`filter-btn ${activeCategory === "beauty" ? "active" : ""}`}
                onClick={() => setActiveCategory("beauty")}
              >
                Beauty
              </button>
            </div>
          </div>

          <div className="filter-group">
            <h3>Season</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${activeSeason === "all" ? "active" : ""}`}
                onClick={() => setActiveSeason("all")}
              >
                All Seasons
              </button>
              <button 
                className={`filter-btn ${activeSeason === "current" ? "active" : ""}`}
                onClick={() => setActiveSeason("current")}
              >
                Current
              </button>
              <button 
                className={`filter-btn ${activeSeason === "upcoming" ? "active" : ""}`}
                onClick={() => setActiveSeason("upcoming")}
              >
                Upcoming
              </button>
            </div>
          </div>
        </div>

        <div className="trends-grid">
          {sortedTrends.map((trend) => (
            <motion.div
              key={trend.id}
              className="trend-card"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className="trend-color" style={{ backgroundColor: trend.hex }}>
                <button 
                  className={`save-button ${isColorSaved(trend.id) ? "saved" : ""}`}
                  onClick={() => handleSaveColor(trend)}
                >
                  {isColorSaved(trend.id) ? "★" : "☆"}
                </button>
              </div>
              <div className="trend-info">
                <h3>{trend.name}</h3>
                <p className="trend-hex">{trend.hex}</p>
                <p className="trend-description">{trend.description}</p>
                <div className="trend-meta">
                  <span className={`trend-category ${trend.category}`}>
                    {trend.category === "fashion" ? "Fashion" : "Beauty"}
                  </span>
                  <span className={`trend-season ${trend.season}`}>
                    {trend.season === "current" ? "Current Season" : "Upcoming"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {savedColors.length > 0 && (
          <div className="saved-colors-section">
            <h2>Your Saved Colors</h2>
            <div className="saved-colors-grid">
              {savedColors.map((color) => (
                <div key={color.id} className="saved-color-item">
                  <div className="saved-color-swatch" style={{ backgroundColor: color.hex }}></div>
                  <div className="saved-color-info">
                    <p className="saved-color-name">{color.name}</p>
                    <p className="saved-color-hex">{color.hex}</p>
                  </div>
                  <button 
                    className="remove-saved-color"
                    onClick={() => handleSaveColor(color)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="trends-info">
          <h2>About Color Trends</h2>
          <p>
            Color trends are influenced by cultural shifts, technological advancements, and global events.
            Fashion and beauty industries often lead these trends, which typically change seasonally.
            Staying updated with color trends can help you make stylish choices that feel current and relevant.
          </p>
          <p>
            Remember that while trends are fun to follow, the most important thing is to choose colors that
            complement your skin tone and make you feel confident!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TrendsPage;