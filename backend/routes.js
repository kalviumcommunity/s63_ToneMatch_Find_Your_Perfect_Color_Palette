const express = require('express');
const router = express.Router();
const MenuItem = require('./schema'); // Import the correct model

// CREATE - Add a new item
router.post('/items', async (req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ - Get all items
router.get('/items', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE - Modify an item by ID
router.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: "Item not found" });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - Remove an item by ID
router.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
