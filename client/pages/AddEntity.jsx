import { useState } from "react";

const AddEntity = ({ onEntityAdded }) => {
  const [formData, setFormData] = useState({ name: "", description: "", email: "" });
  const [errors, setErrors] = useState({}); 

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.description.length < 10) newErrors.description = "Description must be at least 10 characters long";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required"; // ✅ Validate email format

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3000/api/entities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.errors?.[0]?.msg || "Failed to add entity");

      setFormData({ name: "", description: "", email: "" });
      setErrors({});
      onEntityAdded(); 
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Add Entity</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Entity Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        {errors.description && <p className="error">{errors.description}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <button type="submit">Add Entity</button>
      </form>
    </div>
  );
};

export default AddEntity;
