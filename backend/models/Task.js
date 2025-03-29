const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to the User model
});

module.exports = mongoose.model("Task", TaskSchema);
