const mongoose = require("mongoose");
require("dotenv").config();

const Test = require("../models/Test");

async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const testId = "6942b1c2dbb053e0744bd01d"; // 🔴 PUT YOUR TEST ID HERE

    const questions = [
      {
        question: "What is velocity?",
        options: [
          "Speed",
          "Speed with direction",
          "Distance",
          "Acceleration"
        ],
        correctAnswer: 1
      },
      {
        question: "SI unit of force is?",
        options: [
          "Joule",
          "Pascal",
          "Newton",
          "Watt"
        ],
        correctAnswer: 2
      }
    ];

    const test = await Test.findById(testId);
    if (!test) {
      console.log("❌ Test not found");
      process.exit();
    }

    test.questions = questions;
    await test.save();

    console.log("✅ Questions added successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit();
  }
}

seedQuestions();
