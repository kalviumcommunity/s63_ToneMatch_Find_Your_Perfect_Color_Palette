import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEntity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/entities/${id}`);
        const data = await response.json();
        setFormData({ name: data.name, description: data.description });
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    };
    fetchEntity();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/entities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update entity");

      navigate("/"); // Redirect after update
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Update Entity</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        <button type="submit">Update Entity</button>
      </form>
    </div>
  );
};

export default UpdateEntity;
