import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Task Manager</h1>
        <nav className="flex justify-center space-x-4 mt-4">
          <Link to="/" className="text-lg text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/add" className="text-lg text-gray-700 hover:text-blue-500">
            Add Task
          </Link>
        </nav>
        <div className="mt-6 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <Routes>
            <Route path="/" element={<TaskList tasks={tasks} />} />
            <Route path="/add" element={<TaskForm addTask={addTask} />} />
            <Route
              path="/task/:id"
              element={<TaskDetails tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// Ensure react-router-dom is installed by running:
// npm install react-router-dom
