import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TaskDetails = ({ tasks, updateTask, deleteTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find(task => task.id === parseInt(id));

  if (!task) return <p className="text-center text-red-500">Task not found.</p>;

  const [updatedTask, setUpdatedTask] = useState(task);

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateTask(updatedTask);
    navigate("/");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Task Details</h2>
      <div className="space-y-4">
        <input type="text" name="title" value={updatedTask.title} onChange={handleChange}
          className="w-full p-2 border rounded-lg" />
        <textarea name="description" value={updatedTask.description} onChange={handleChange}
          className="w-full p-2 border rounded-lg"></textarea>
        <input type="date" name="dueDate" value={updatedTask.dueDate} onChange={handleChange}
          className="w-full p-2 border rounded-lg" />
        <select name="priority" value={updatedTask.priority} onChange={handleChange}
          className="w-full p-2 border rounded-lg">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div className="flex space-x-2">
          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Save</button>
          <button onClick={() => deleteTask(task.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Delete</button>
          <button onClick={() => navigate("/")} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
