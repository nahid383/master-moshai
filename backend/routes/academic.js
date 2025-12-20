const express = require("express");
const Grade = require("../models/Grade");
const Subject = require("../models/Subject");

const router = express.Router();

// GET all grades
router.get("/grades", async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET subjects by grade
router.get("/subjects/:gradeId", async (req, res) => {
  try {
    const subjects = await Subject.find({
      grade: req.params.gradeId,
    });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
