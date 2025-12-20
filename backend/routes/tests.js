const express = require("express");
const router = express.Router();
const Test = require("../models/Test");
const protect = require("../middlewares/authMiddleware");

// GET all tests
router.get("/", protect, async (req, res) => {
  try {
    const tests = await Test.find().select("_id title");
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET QUESTIONS OF A TEST (FIXED)
router.get("/:id/questions", protect, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.json(test.questions); // ⭐ THIS WAS THE PROBLEM
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
