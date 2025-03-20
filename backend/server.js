require("dotenv").config(); // Load environment variables

const express = require("express");
const { resolve } = require("path");
const connectDatabase = require("./database"); 
const cors = require("cors");

const menuRoutes = require("./routes"); 
const entityRoutes = require("./entityRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS before routes
app.use(cors({
  origin: "http://localhost:5173",  // Allow frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// ✅ Middleware (apply before routes)
app.use(express.json());
app.use(express.static("static"));

// ✅ Connect to Database
connectDatabase();

// ✅ Register API Routes
app.use("/api/menu", menuRoutes);
app.use("/api/entities", entityRoutes);  // Correct path

// ✅ Test Route
app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
