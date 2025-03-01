require("dotenv").config(); // Ensure this is the first line

const express = require("express");
const { resolve } = require("path");
const connectDatabase = require("./database"); // Import the fixed database connection function
const menuRoutes = require("./routes"); // Ensure this is the correct path to your routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to Database
connectDatabase();

// Serve Static Files
app.use(express.static("static"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

// Register API Routes
app.use("/api", menuRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
