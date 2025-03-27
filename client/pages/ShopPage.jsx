import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const ShopPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeColor, setActiveColor] = useState(location.state?.color || "all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample product data
  const sampleProducts = [
    {
      id: 1,
      name: "Silk Blouse",
      category: "clothing",
      colors: ["#F5D6C6", "#E0B492", "#BB2649"],
      colorNames: ["Light Cool", "Medium Cool", "Viva Magenta"],
      price: 79.99,
      image: "https://via.placeholder.com/300x400/F5D6C6/000000?text=Silk+Blouse",
      description: "A luxurious silk blouse that complements light and medium skin tones with cool undertones."
    },
    {
      id: 2,
      name: "Cashmere Sweater",
      category: "clothing",
      colors: ["#5D8AA8", "#87A96B", "#F7D5AA"],
      colorNames: ["Tranquil Blue", "Matcha", "Light Warm"],
      price: 129.99,
      image: "https://via.placeholder.com/300x400/5D8AA8/FFFFFF?text=Cashmere+Sweater",
      description: "A soft cashmere sweater available in colors that work beautifully with various skin tones."
    },
    {
      id: 3,
      name: "Matte Lipstick",
      category: "makeup",
      colors: ["#BB2649", "#E9B265", "#754C24"],
      colorNames: ["Viva Magenta", "Sundial", "Deep Neutral"],
      price: 24.99,
      image: "https://via.placeholder.com/300x400/BB2649/FFFFFF?text=Matte+Lipstick",
      description: "A long-lasting matte lipstick in shades that enhance your natural beauty."
    },
    {
      id: 4,
      name: "Statement Earrings",
      category: "accessories",
      colors: ["#FFD700", "#C0C0C0", "#B87333"],
      colorNames: ["Gold", "Silver", "Copper"],
      price: 45.99,
      image: "https://via.placeholder.com/300x400/FFD700/000000?text=Statement+Earrings",
      description: "Bold earrings in metallic tones that complement different undertones."
    },
    {
      id: 5,
      name: "Eyeshadow Palette",
      category: "makeup",
      colors: ["#E6E6FA", "#BFFF00", "#5A395A"],
      colorNames: ["Digital Lavender", "Cyber Lime", "Midnight Plum"],
      price: 39.99,
      image: "https://via.placeholder.com/300x400/E6E6FA/000000?text=Eyeshadow+Palette",
      description: "A versatile eyeshadow palette with trending colors for all skin tones."
    },
    {
      id: 6,
      name: "Linen Scarf",
      category: "accessories",
      colors: ["#FBCEB1", "#7C4E24", "#D9B091"],
      colorNames: ["Apricot Crush", "Deep Warm", "Medium Neutral"],
      price: 34.99,
      image: "https://via.placeholder.com/300x400/FBCEB1/000000?text=Linen+Scarf",
      description: "A lightweight linen scarf in colors that enhance your natural coloring."
    },
    {
      id: 7,
      name: "Cotton T-Shirt",
      category: "clothing",
      colors: ["#5D8AA8", "#FFCC99", "#8D5524"],
      colorNames: ["Tranquil Blue", "Peach Fuzz", "Deep Cool"],
      price: 29.99,
      image: "https://via.placeholder.com/300x400/FFCC99/000000?text=Cotton+T-Shirt",
      description: "A comfortable cotton t-shirt in colors that flatter different skin tones."
    },
    {
      id: 8,
      name: "Cream Blush",
      category: "makeup",
      colors: ["#FBCEB1", "#E9B265", "#BB2649"],
      colorNames: ["Apricot Crush", "Sundial", "Viva Magenta"],
      price: 19.99,
      image: "https://via.placeholder.com/300x400/FBCEB1/000000?text=Cream+Blush",
      description: "A blendable cream blush that adds a natural flush to your cheeks."
    }
  ];

  // Color options for filter
  const colorOptions = [
    { name: "All Colors", value: "all" },
    { name: "Light Cool", value: "#F5D6C6" },
    { name: "Light Warm", value: "#F7D5AA" },
    { name: "Medium Cool", value: "#E0B492" },
    { name: "Medium Neutral", value: "#D9B091" },
    { name: "Deep Cool", value: "#8D5524" },
    { name: "Deep Warm", value: "#7C4E24" },
    { name: "Viva Magenta", value: "#BB2649" },
    { name: "Tranquil Blue", value: "#5D8AA8" },
    { name: "Digital Lavender", value: "#E6E6FA" }
  ];

  // Simulate loading products
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Filter products based on active filters
  const filteredProducts = products.filter(product => {
    if (activeCategory !== "all" && product.category !== activeCategory) return false;
    if (activeColor !== "all" && !product.colors.includes(activeColor)) return false;
    return true;
  });

  // Handle "Add to Cart" action
  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart!`);
    // In a real app, this would add the product to a cart state or make an API call
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Shop Recommendations</h1>
        <p className="subtitle">Find products that match your color palette</p>

        <div className="filters-container">
          <div className="filter-group">
            <h3>Category</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All Products
              </button>
              <button 
                className={`filter-btn ${activeCategory === "clothing" ? "active" : ""}`}
                onClick={() => setActiveCategory("clothing")}
              >
                Clothing
              </button>
              <button 
                className={`filter-btn ${activeCategory === "makeup" ? "active" : ""}`}
                onClick={() => setActiveCategory("makeup")}
              >
                Makeup
              </button>
              <button 
                className={`filter-btn ${activeCategory === "accessories" ? "active" : ""}`}
                onClick={() => setActiveCategory("accessories")}
              >
                Accessories
              </button>
            </div>
          </div>

          <div className="filter-group">
            <h3>Color</h3>
            <div className="color-filter-buttons">
              {colorOptions.map((color) => (
                <button 
                  key={color.value}
                  className={`color-filter-btn ${activeColor === color.value ? "active" : ""}`}
                  onClick={() => setActiveColor(color.value)}
                  style={color.value !== "all" ? { backgroundColor: color.value } : {}}
                >
                  {color.value === "all" && color.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <p>Loading products...</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-description">{product.description}</p>
                    <div className="product-colors">
                      {product.colors.map((color, index) => (
                        <div 
                          key={index} 
                          className="product-color-swatch" 
                          style={{ backgroundColor: color }}
                          title={product.colorNames[index]}
                        ></div>
                      ))}
                    </div>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="no-results">
                <p>No products match your current filters. Try adjusting your selection.</p>
              </div>
            )}
          </div>
        )}

        <div className="shop-info">
          <h2>About Our Recommendations</h2>
          <p>
            Our product recommendations are based on color analysis and skin tone compatibility.
            Each product is selected to complement specific skin tones and color palettes.
            For the most personalized recommendations, complete the Color Quiz or upload your photo
            for skin tone analysis.
          </p>
          <p>
            <strong>Note:</strong> This is a demonstration shop. In a real application, these would
            be actual products available for purchase from various retailers.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ShopPage;