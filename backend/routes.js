const express = require("express");
const router = express.Router();
const MenuItem = require("./schema.js");

// ✅ Add a new menu item
router.post("/items", async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all menu items
router.get("/items", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
