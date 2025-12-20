const mongoose = require("mongoose");
require("dotenv").config();
const Grade = require("../models/Grade");

mongoose.connect(process.env.MONGO_URI);

const grades = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "SSC",
  "HSC",
  "Admission",
];

const seed = async () => {
  await Grade.deleteMany();
  for (let g of grades) {
    await Grade.create({ name: g });
  }
  console.log("✅ Grades seeded");
  process.exit();
};

seed();
