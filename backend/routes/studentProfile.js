const express = require("express");
const StudentProfile = require("../models/StudentProfile");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * CREATE student profile (once)
 */
router.post("/", protect, async (req, res) => {
  try {
    const { grade, subjects } = req.body;

    const exists = await StudentProfile.findOne({ user: req.user.id });
    if (exists) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = await StudentProfile.create({
      user: req.user.id,
      grade,
      subjects,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET logged-in student profile
 */
router.get("/me", protect, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.user.id })
      .populate("grade")
      .populate("subjects")
      .populate("weakSubjects");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * UPDATE weak subjects (adaptive learning base)
 */
router.put("/weak-subjects", protect, async (req, res) => {
  try {
    const { weakSubjects } = req.body;

    const profile = await StudentProfile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.weakSubjects = weakSubjects;
    await profile.save();

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
