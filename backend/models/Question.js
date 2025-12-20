const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: {
    type: Number, // index of options
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
