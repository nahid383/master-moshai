const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/auth");
const testRoutes = require("./routes/tests");
const academicRoutes = require("./routes/academic");
const studentProfileRoutes = require("./routes/studentProfile");
const testExamRoutes = require("./routes/tests");


const app = express();

// ==================
// Middlewares
// ==================
app.use(cors());
app.use(express.json());

// ==================
// Routes
// ==================
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/academic", academicRoutes);
app.use("/api/student-profile", studentProfileRoutes);
app.use("/api/tests", testExamRoutes);


// ==================
// Health Check
// ==================
app.get("/", (req, res) => {
  res.send("Master Moshai API is running 🚀");
});

// ==================
// MongoDB Connection
// ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// ==================
// Start Server
// ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
