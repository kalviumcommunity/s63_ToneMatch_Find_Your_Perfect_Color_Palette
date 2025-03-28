const express = require("express");
require("dotenv").config();
const connectDatabase = require("./database"); // ✅ Ensure correct path
const cors = require("cors");

const menuRoutes = require("./routes");
const entityRoutes = require("./entityRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to Database with Error Handling
(async () => {
  try {
    await connectDatabase();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process if DB connection fails
  }
})();

app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/menu", menuRoutes);
app.use("/api/entities", entityRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// ✅ Global Error Handler (Optional)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
