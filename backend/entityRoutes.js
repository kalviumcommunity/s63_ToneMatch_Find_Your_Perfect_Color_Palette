const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Entity = require("./entity");

// ✅ Add a new entity with validation
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .matches(/@gmail\.com$/)
      .withMessage("Only Gmail addresses are allowed"),
    
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, email } = req.body;
      const newEntity = new Entity({ name, description, email });
      await newEntity.save();
      res.status(201).json(newEntity);
    } catch (error) {
      console.error("Error adding entity:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }
);

// ✅ Get all entities
router.get("/", async (req, res) => {
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (error) {
    console.error("Error fetching entities:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Update an entity with validation
router.put(
  "/:id",
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("description")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Invalid email format")
      .matches(/@gmail\.com$/)
      .withMessage("Only Gmail addresses are allowed"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, email } = req.body;
      const updatedEntity = await Entity.findByIdAndUpdate(
        req.params.id,
        { name, description, email },
        { new: true }
      );

      if (!updatedEntity) {
        return res.status(404).json({ message: "Entity not found" });
      }

      res.json(updatedEntity);
    } catch (error) {
      console.error("Error updating entity:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }
);

// ✅ Delete an entity
router.delete("/:id", async (req, res) => {
  try {
    const deletedEntity = await Entity.findByIdAndDelete(req.params.id);

    if (!deletedEntity) {
      return res.status(404).json({ message: "Entity not found" });
    }

    res.json({ message: "Entity deleted successfully" });
  } catch (error) {
    console.error("Error deleting entity:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
