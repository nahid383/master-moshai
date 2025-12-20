const mongoose = require("mongoose");
require("dotenv").config();

const Grade = require("../models/Grade");
const Subject = require("../models/Subject");

const gradesData = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "SSC",
  "HSC",
  "Admission",
];

const subjects = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "Bangla",
  "English",
  "ICT",
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Grade.deleteMany();
    await Subject.deleteMany();

    for (const gradeName of gradesData) {
      const grade = await Grade.create({ name: gradeName });

      for (const sub of subjects) {
        await Subject.create({
          name: sub,
          grade: grade._id,
        });
      }
    }

    console.log("✅ Academic data seeded");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
