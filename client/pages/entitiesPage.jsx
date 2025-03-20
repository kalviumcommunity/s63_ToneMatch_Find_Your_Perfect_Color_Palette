import { useState, useEffect } from "react";
import AddEntity from "../pages/AddEntity";

const EntitiesPage = () => {
  const [entities, setEntities] = useState([]);

  const fetchEntities = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/entities");
      if (!response.ok) throw new Error("Failed to fetch entities");
      
      const data = await response.json();
      setEntities(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  return (
    <div>
      <h1>Entities List</h1>
      <AddEntity onEntityAdded={fetchEntities} />
      <ul>
        {entities.length > 0 ? (
          entities.map((entity) => (
            <li key={entity._id}>
              <strong>{entity.name}</strong>: {entity.description}
            </li>
          ))
        ) : (
          <p>No entities found</p>
        )}
      </ul>
    </div>
  );
};

export default EntitiesPage;
