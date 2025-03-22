const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  content: { type: String, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true, // Ensure the note belongs to a section
  },
  subSection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSection",
    required: true, // Ensure the note belongs to a specific video
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Export the Notes model
module.exports = mongoose.model("Notes", notesSchema);
