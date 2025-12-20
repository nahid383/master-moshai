const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });


const Grade = require("../models/Grade");
const Subject = require("../models/Subject");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected for subject seeding");

    const grades = await Grade.find();

    if (!grades.length) {
      console.log("❌ No grades found");
      process.exit();
    }

    const subjects = [
      "Math",
      "Physics",
      "Chemistry",
      "Biology",
      "Bangla",
      "English",
      "ICT",
    ];

    await Subject.deleteMany();

    for (let grade of grades) {
      for (let name of subjects) {
        await Subject.create({
          name,
          grade: grade._id,
        });
      }
    }

    console.log("✅ Subjects seeded successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Subject seed error:", err.message);
    process.exit(1);
  });
