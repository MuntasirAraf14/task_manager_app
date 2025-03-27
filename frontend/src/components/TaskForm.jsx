import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "", priority: "Low" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim()) {
      addTask(task);
      navigate("/");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Task Title" value={task.title} onChange={handleChange}
          className="w-full p-2 border rounded-lg" required />
        <textarea name="description" placeholder="Task Description" value={task.description} onChange={handleChange}
          className="w-full p-2 border rounded-lg" required />
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange}
          className="w-full p-2 border rounded-lg" required />
        <select name="priority" value={task.priority} onChange={handleChange}
          className="w-full p-2 border rounded-lg">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
