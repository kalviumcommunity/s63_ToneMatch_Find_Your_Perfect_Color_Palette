import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AddEntity from "./AddEntity";
import UserFilter from "../src/component/UserFilter";
import ColorInspirationSection from "../src/component/ColorInspirationSection";
import { 
  fetchEntities, 
  fetchEntitiesByUser, 
  seedEntities 
} from "../src/utils/api";

const EntitiesPage = () => {
  const [entities, setEntities] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [userRefreshTrigger, setUserRefreshTrigger] = useState(0);

  useEffect(() => {
    loadEntities(selectedUser);
  }, [selectedUser]);

  const loadEntities = async (userId = "") => {
    setLoading(true);
    setError(null);
    try {
      let data;
      
      if (userId) {
        data = await fetchEntitiesByUser(userId);
      } else {
        data = await fetchEntities();
      }
      
      // If no entities found, try seeding
      if (data.length === 0 && !userId) {
        try {
          await seedEntities();
          data = await fetchEntities();
        } catch (seedError) {
          console.error("Error seeding entities:", seedError);
          // Continue with empty data if seeding fails
        }
      }
      
      // Ensure entities have valid created_by data
      const validEntities = data.map(entity => {
        if (entity.created_by && typeof entity.created_by === 'object' && (entity.created_by.name || entity.created_by.username)) {
          return entity;
        } else {
          // If created_by is not a valid user object, set a placeholder
          return {
            ...entity,
            created_by: { name: "Unknown Creator", _id: entity.created_by || "" }
          };
        }
      });
      
      setEntities(validEntities);
    } catch (error) {
      console.error("Error loading entities:", error);
      setError("Failed to load entities. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entity?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/entities/${id}`, {
          method: "DELETE",
          credentials: 'include'
        });
        
        if (response.ok) {
          // Refresh the entities list after deletion
          loadEntities(selectedUser);
        } else {
          console.error("Failed to delete entity");
          setError("Failed to delete entity. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting entity:", error);
        setError("Error deleting entity. Please try again.");
      }
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="gradient-text">Manage Your Color Entities</h1>
      <p className="entity-description">
        Create and manage your color entities. Add new color combinations, update existing ones, or remove those you no longer need.
      </p>
      
      <div className="entity-controls">
        <button 
          className="toggle-form-btn"
          onClick={toggleAddForm}
        >
          {showAddForm ? "Hide Form" : "Add New Entity"}
        </button>
        
        {/* User selection */}
        <UserFilter 
          onUserSelect={handleUserSelect} 
          refreshTrigger={userRefreshTrigger}
        />
      </div>

      {/* Conditionally render the AddEntity form */}
      {showAddForm && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="add-entity-container"
        >
          <AddEntity onEntityAdded={() => { 
            loadEntities(selectedUser);
            setShowAddForm(false); // Hide form after successful submission
            setUserRefreshTrigger(prev => prev + 1); // Trigger UserFilter refresh
          }} />
        </motion.div>
      )}

      {/* Entities List */}
      <div className="entities-list-container">
        <h2>Your Color Entities</h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p className="loading">Loading entities...</p>
        ) : (
          <div className="entities-grid">
            {entities.length > 0 ? (
              entities.map((entity) => (
                <motion.div 
                  key={entity._id}
                  className="entity-card"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3>{entity.name}</h3>
                  <p>{entity.description}</p>
                  <div className="entity-email">{entity.email}</div>
                  <div className="entity-creator">
                    Created by: {entity.created_by && (entity.created_by.name || entity.created_by.username) || "Unknown Creator"}
                  </div>
                  <div className="entity-actions">
                    <Link to={`/entity/update/${entity._id}`}>
                      <button className="edit-btn">Edit</button>
                    </Link>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(entity._id)}
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="no-entities">No entities found. Create one by clicking &quot;Add New Entity&quot;.</p>
            )}
          </div>
        )}
      </div>

      {/* Color Inspiration Section */}
      <ColorInspirationSection title="Find Your Perfect Color Palette" />
    </motion.div>
  );
};

export default EntitiesPage;