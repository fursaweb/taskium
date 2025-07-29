const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: "Must provide title" },
  description: String,
  date: String,
  isCompleted: { type: Boolean, default: false },
  isImportant: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: String,
});

module.exports = mongoose.model("Task", TaskSchema);
