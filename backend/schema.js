const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    minlength: 3 
  },
  description: { 
    type: String, 
    required: true, 
    minlength: 10 
  },
  email: { 
    type: String, 
    required: true, 
    match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Please enter a valid Gmail address."]
  },
  created_by: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",  // Reference to the User model
    required: true 
  }
});

module.exports = mongoose.model("MenuItem", menuItemSchema);

