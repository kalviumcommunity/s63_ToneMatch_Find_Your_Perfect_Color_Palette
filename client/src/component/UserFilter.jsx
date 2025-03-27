import { useState, useEffect } from "react";

const UserFilter = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    onUserSelect(userId); // Send selected user to parent
  };

  return (
    <div>
      <label>Select User:</label>
      <select value={selectedUser} onChange={handleChange}>
        <option value="">-- Show All --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserFilter;
