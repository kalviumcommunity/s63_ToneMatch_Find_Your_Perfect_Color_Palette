import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddEntity from "./AddEntity";

const EntitiesPage = () => {
  const [entities, setEntities] = useState([]);

  const fetchEntities = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/entities");
      const data = await response.json();
      setEntities(data);
    } catch (error) {
      console.error("Error fetching entities:", error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/entities/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete entity");

      setEntities(entities.filter((entity) => entity._id !== id));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h1>Entities</h1>
      <AddEntity onEntityAdded={fetchEntities} />
      <ul>
        {entities.map((entity) => (
          <li key={entity._id}>
            {entity.name} - {entity.description}
            <Link to={`/update/${entity._id}`}><button>Edit</button></Link>
            <button onClick={() => handleDelete(entity._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntitiesPage;
