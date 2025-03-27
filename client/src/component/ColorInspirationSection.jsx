import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ColorInspirationSection = ({ title }) => {
  // Sample color palettes with descriptions and image URLs
  const colorInspirations = [
    {
      id: 1,
      name: "Summer Sunset",
      description: "Warm oranges and pinks that complement warm skin tones beautifully.",
      palette: ["#FF9E7D", "#FF5E5B", "#D8345F", "#700961", "#5F1854"],
      imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Ocean Breeze",
      description: "Cool blues and teals that work wonderfully with cool skin undertones.",
      palette: ["#A4E5E6", "#7FB3D5", "#5499C7", "#2874A6", "#1A5276"],
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Forest Harmony",
      description: "Earthy greens and browns that enhance neutral skin tones.",
      palette: ["#A9DFBF", "#7DCEA0", "#52BE80", "#27AE60", "#145A32"],
      imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <motion.section
      className="inspiration-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="gradient-text">{title || "Color Inspiration"}</h2>
      <p className="inspiration-description">
        Discover beautiful color palettes that complement different skin tones. 
        Find your perfect match and create stunning color combinations for your wardrobe, makeup, or design projects.
      </p>

      <div className="inspiration-grid">
        {colorInspirations.map((inspiration) => (
          <motion.div
            key={inspiration.id}
            className="inspiration-card"
            whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="inspiration-image-container">
              <img 
                src={inspiration.imageUrl} 
                alt={inspiration.name} 
                className="inspiration-image"
              />
            </div>
            <div className="inspiration-content">
              <h3 className="color-grade-medium">{inspiration.name}</h3>
              <p>{inspiration.description}</p>
              <div className="color-palette-preview">
                {inspiration.palette.map((color, index) => (
                  <div 
                    key={index}
                    className="color-preview-box"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="color-tips">
        <h3 className="color-accent-medium">Tips for Finding Your Perfect Colors</h3>
        <ul className="tips-list">
          <li>
            <span className="color-grade-dark">Identify your undertone</span> - Look at the veins on your wrist. Blue veins indicate cool undertones, green veins suggest warm undertones, and a mix indicates neutral undertones.
          </li>
          <li>
            <span className="color-grade-dark">Test in natural light</span> - Colors can look different under artificial lighting. Always evaluate colors in natural daylight for the most accurate representation.
          </li>
          <li>
            <span className="color-grade-dark">Consider your contrast level</span> - High contrast between your hair, skin, and eyes works well with bold, vibrant colors. Low contrast features pair nicely with softer, muted tones.
          </li>
        </ul>
      </div>
    </motion.section>
  );
};

ColorInspirationSection.propTypes = {
  title: PropTypes.string
};

export default ColorInspirationSection;