import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TaskDetails = ({ tasks, updateTask, deleteTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return <p className="text-center text-red-500 text-lg">Task not found.</p>; 
  }

  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!updatedTask.title.trim() || !updatedTask.description.trim()) {
      alert("Title and Description cannot be empty.");
      return;
    }
    updateTask(updatedTask);
    navigate("/");
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate("/"); // Redirect after deletion
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Task Details</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={updatedTask.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Task Title"
        />
        <textarea
          name="description"
          value={updatedTask.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Task Description"
        />
        <input
          type="date"
          name="dueDate"
          value={updatedTask.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <select
          name="priority"
          value={updatedTask.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
