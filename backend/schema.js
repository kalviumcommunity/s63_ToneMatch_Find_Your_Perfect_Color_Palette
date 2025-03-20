const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  
});

module.exports = mongoose.model('MenuItem', menuItemSchema);