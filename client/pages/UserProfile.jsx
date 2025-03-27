import { useState } from "react";
import { motion } from "framer-motion";

const UserProfile = () => {
  // Mock user data
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    skinTone: "Medium Warm",
    skinToneHex: "#D8A878",
    joinDate: "January 15, 2023",
    preferences: {
      emailNotifications: true,
      darkMode: false,
      saveHistory: true
    }
  });

  // Mock saved palettes
  const [savedPalettes, setSavedPalettes] = useState([
    {
      id: 1,
      name: "Summer Vibes",
      colors: ["#FF5733", "#33FF57", "#3357FF", "#F033FF"],
      dateAdded: "March 10, 2023"
    },
    {
      id: 2,
      name: "Work Wardrobe",
      colors: ["#5D8AA8", "#87A96B", "#F7D5AA", "#D9B091"],
      dateAdded: "February 22, 2023"
    },
    {
      id: 3,
      name: "Evening Look",
      colors: ["#800080", "#000080", "#E6E6FA", "#5A395A"],
      dateAdded: "March 15, 2023"
    }
  ]);

  // Mock saved products
  const [savedProducts, setSavedProducts] = useState([
    {
      id: 1,
      name: "Silk Blouse",
      color: "#F5D6C6",
      price: 79.99,
      dateAdded: "March 18, 2023"
    },
    {
      id: 2,
      name: "Matte Lipstick",
      color: "#BB2649",
      price: 24.99,
      dateAdded: "March 5, 2023"
    }
  ]);

  const [activeTab, setActiveTab] = useState("palettes");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Handle preference toggle
  const handleTogglePreference = (preference) => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        [preference]: !user.preferences[preference]
      }
    });
  };

  // Handle palette deletion
  const handleDeletePalette = (id) => {
    setSavedPalettes(savedPalettes.filter(palette => palette.id !== id));
  };

  // Handle product deletion
  const handleDeleteProduct = (id) => {
    setSavedProducts(savedProducts.filter(product => product.id !== id));
  };

  // Handle edit profile
  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  // Handle save profile
  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>User Profile</h1>
        <p className="subtitle">Manage your account and saved palettes</p>

        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="user-info">
              <div 
                className="user-avatar"
                style={{ backgroundColor: user.skinToneHex }}
              >
                {user.name.charAt(0)}
              </div>
              <h2>{user.name}</h2>
              <p className="user-email">{user.email}</p>
              <p className="user-skin-tone">
                Skin Tone: <span style={{ color: user.skinToneHex }}>{user.skinTone}</span>
              </p>
              <p className="join-date">Member since {user.joinDate}</p>
              
              {!isEditing ? (
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              ) : (
                <div className="edit-profile-form">
                  <h3>Edit Profile</h3>
                  <div className="form-group">
                    <label>Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={editedUser.name} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={editedUser.email} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-actions">
                    <button className="save-btn" onClick={handleSaveProfile}>Save</button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>

            <div className="user-preferences">
              <h3>Preferences</h3>
              <div className="preference-item">
                <label>
                  <input 
                    type="checkbox" 
                    checked={user.preferences.emailNotifications} 
                    onChange={() => handleTogglePreference("emailNotifications")}
                  />
                  Email Notifications
                </label>
              </div>
              <div className="preference-item">
                <label>
                  <input 
                    type="checkbox" 
                    checked={user.preferences.darkMode} 
                    onChange={() => handleTogglePreference("darkMode")}
                  />
                  Dark Mode
                </label>
              </div>
              <div className="preference-item">
                <label>
                  <input 
                    type="checkbox" 
                    checked={user.preferences.saveHistory} 
                    onChange={() => handleTogglePreference("saveHistory")}
                  />
                  Save History
                </label>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="content-tabs">
              <button 
                className={`tab-btn ${activeTab === "palettes" ? "active" : ""}`}
                onClick={() => setActiveTab("palettes")}
              >
                Saved Palettes
              </button>
              <button 
                className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
                onClick={() => setActiveTab("products")}
              >
                Saved Products
              </button>
              <button 
                className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                Analysis History
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "palettes" && (
                <div className="palettes-tab">
                  {savedPalettes.length > 0 ? (
                    <div className="saved-palettes">
                      {savedPalettes.map((palette) => (
                        <div key={palette.id} className="saved-palette-card">
                          <div className="palette-header">
                            <h3>{palette.name}</h3>
                            <button 
                              className="delete-btn"
                              onClick={() => handleDeletePalette(palette.id)}
                            >
                              ✕
                            </button>
                          </div>
                          <div className="palette-colors">
                            {palette.colors.map((color, index) => (
                              <div 
                                key={index} 
                                className="palette-color" 
                                style={{ backgroundColor: color }}
                              >
                                <span className="color-tooltip">{color}</span>
                              </div>
                            ))}
                          </div>
                          <p className="palette-date">Saved on {palette.dateAdded}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>You haven&apos;t saved any palettes yet.</p>
                      <button className="action-btn">Explore Palettes</button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "products" && (
                <div className="products-tab">
                  {savedProducts.length > 0 ? (
                    <div className="saved-products">
                      {savedProducts.map((product) => (
                        <div key={product.id} className="saved-product-card">
                          <div className="product-header">
                            <h3>{product.name}</h3>
                            <button 
                              className="delete-btn"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              ✕
                            </button>
                          </div>
                          <div className="product-details">
                            <div 
                              className="product-color" 
                              style={{ backgroundColor: product.color }}
                            ></div>
                            <p className="product-price">${product.price.toFixed(2)}</p>
                          </div>
                          <p className="product-date">Saved on {product.dateAdded}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>You haven&apos;t saved any products yet.</p>
                      <button className="action-btn">Shop Now</button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div className="history-tab">
                  <div className="empty-state">
                    <p>Your analysis history will appear here.</p>
                    <button className="action-btn">Try Color Analysis</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;