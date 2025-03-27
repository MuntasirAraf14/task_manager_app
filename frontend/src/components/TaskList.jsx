import React, { useState } from "react";
import { Link } from "react-router-dom";

const TaskList = ({ tasks }) => {
  const [filter, setFilter] = useState("All");

  const filteredTasks = filter === "All" ? tasks : tasks.filter(task => task.priority === filter);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Task List</h2>
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setFilter("All")} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">All</button>
        <button onClick={() => setFilter("High")} className="px-4 py-2 bg-red-300 rounded-lg hover:bg-red-400">High</button>
        <button onClick={() => setFilter("Medium")} className="px-4 py-2 bg-yellow-300 rounded-lg hover:bg-yellow-400">Medium</button>
        <button onClick={() => setFilter("Low")} className="px-4 py-2 bg-green-300 rounded-lg hover:bg-green-400">Low</button>
      </div>

      {filteredTasks.length > 0 ? (
        <ul className="space-y-2">
          {filteredTasks.map(task => (
            <li key={task.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-gray-600">{task.dueDate}</p>
                <p className={`text-sm font-bold ${task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                  {task.priority} Priority
                </p>
              </div>
              <Link to={`/task/${task.id}`} className="text-blue-500 hover:underline">View</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
