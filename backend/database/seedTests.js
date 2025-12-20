const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const Test = require("../models/Test");
const Question = require("../models/Question");
const Grade = require("../models/Grade");
const Subject = require("../models/Subject");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const grade = await Grade.findOne();
  const subject = await Subject.findOne({ grade: grade._id });

  const test = await Test.create({
    title: "Math Mock Test 1",
    grade: grade._id,
    subject: subject._id,
    duration: 30,
  });

  await Question.insertMany([
    {
      test: test._id,
      question: "2 + 2 = ?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 3,
    },
    {
      test: test._id,
      question: "5 × 2 = ?",
      options: ["5", "10", "15", "20"],
      correctAnswer: 1,
    },
  ]);

  console.log("✅ Demo test seeded");
  process.exit();
});
