const express = require("express");
require("dotenv").config();
const connectDatabase = require("./database"); // ✅ Ensure correct path
const cors = require("cors");

const menuRoutes = require("./routes");
const entityRoutes = require("./entityRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to Database and ensure it's a valid async function
(async () => {
  await connectDatabase();
})();

app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/menu", menuRoutes);
app.use("/api/entities", entityRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
