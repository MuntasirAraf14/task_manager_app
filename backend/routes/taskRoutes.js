const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new task
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            user: req.user.id, // Assign the task to the logged-in user
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all tasks for a user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update a task
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: "Task not found" });
        }
        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.user.toString() !== req.user.id) {
            return res.status(404).json({ message: "Task not found" });
        }
        await task.deleteOne();
        res.json({ message: "Task deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
