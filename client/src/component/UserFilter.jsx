import { useState, useEffect } from "react";
import { fetchUsers, seedUsers } from "../utils/api";
import PropTypes from "prop-types";

const UserFilter = ({ onUserSelect, refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers();
        
        // If no users found, try seeding
        if (data.length === 0) {
          await seedUsers();
          const seededUsers = await fetchUsers();
          setUsers(seededUsers);
        } else {
          // Ensure we're working with valid user objects
          const validUsers = data.filter(user => 
            user && (user.name || user.username) && user._id
          );
          setUsers(validUsers);
        }
      } catch (error) {
        console.error("Error loading users:", error);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [refreshTrigger]); // Re-fetch users when refreshTrigger changes

  const handleChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    onUserSelect(userId); // Send selected user to parent
  };

  if (loading) {
    return <div className="user-filter-loading">Loading users...</div>;
  }

  if (error) {
    return <div className="user-filter-error">{error}</div>;
  }

  return (
    <div className="user-filter">
      <label className="user-filter-label">Filter by Creator:</label>
      <select 
        className="user-filter-select"
        value={selectedUser} 
        onChange={handleChange}
      >
        <option value="">-- Show All --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name || user.username || "Unknown User"}
          </option>
        ))}
      </select>
    </div>
  );
};

UserFilter.propTypes = {
  onUserSelect: PropTypes.func.isRequired,
  refreshTrigger: PropTypes.number
};

UserFilter.defaultProps = {
  refreshTrigger: 0
};

export default UserFilter;
