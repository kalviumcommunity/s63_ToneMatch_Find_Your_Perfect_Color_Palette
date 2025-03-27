import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AddEntity from "./AddEntity";
import UserFilter from "../src/component/UserFilter";
import ColorInspirationSection from "../src/component/ColorInspirationSection";

const EntitiesPage = () => {
  const [entities, setEntities] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchEntities(selectedUser);
  }, [selectedUser]);

  const fetchEntities = async (userId = "") => {
    setLoading(true);
    try {
      const url = userId ? `http://localhost:3000/api/entities/user/${userId}` : "http://localhost:3000/api/entities";
      const response = await fetch(url);
      const data = await response.json();
      setEntities(data);
    } catch (error) {
      console.error("Error fetching entities:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entity?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/entities/${id}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          // Refresh the entities list after deletion
          fetchEntities(selectedUser);
        } else {
          console.error("Failed to delete entity");
        }
      } catch (error) {
        console.error("Error deleting entity:", error);
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
        <UserFilter users={users} onUserSelect={setSelectedUser} />
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
            fetchEntities(selectedUser); 
            fetchUsers();
            setShowAddForm(false); // Hide form after successful submission
          }} />
        </motion.div>
      )}

      {/* Entities List */}
      <div className="entities-list-container">
        <h2>Your Color Entities</h2>
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