import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AddEntity = ({ onEntityAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.description.length < 10) newErrors.description = "Description must be at least 10 characters long";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

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
      setSubmitSuccess(true);
      
      // Notify parent component
      if (onEntityAdded) onEntityAdded();
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error.message);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="add-entity-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="form-title">Add New Color Entity</h2>
      <p className="form-description">
        Create a new color entity with a name, description, and contact email.
      </p>
      
      {submitSuccess && (
        <motion.div 
          className="success-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Entity added successfully!
        </motion.div>
      )}
      
      {errors.submit && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {errors.submit}
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="entity-form">
        <div className="form-group">
          <label htmlFor="name">Entity Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter entity name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe this color entity (min 10 characters)"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? "input-error" : ""}
            rows="4"
          />
          {errors.description && <p className="error-text">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Contact Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter contact email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <motion.button 
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? "Adding..." : "Add Entity"}
        </motion.button>
      </form>
    </motion.div>
  );
};

AddEntity.propTypes = {
  onEntityAdded: PropTypes.func
};

AddEntity.defaultProps = {
  onEntityAdded: () => {}
};

export default AddEntity;