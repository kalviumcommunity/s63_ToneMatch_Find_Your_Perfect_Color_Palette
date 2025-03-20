const express = require("express");
const router = express.Router();
const Entity = require("./entity");

// ✅ Add a new entity
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEntity = new Entity({ name, description });
    await newEntity.save();
    res.status(201).json(newEntity);
  } catch (error) {
    console.error("Error adding entity:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

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

// ✅ Update an entity
router.put("/:id", async (req, res) => {
  try {
    const { name, description } = req.body;

    const updatedEntity = await Entity.findByIdAndUpdate(
      req.params.id,
      { name, description },
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
});

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
