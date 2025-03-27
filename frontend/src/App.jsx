import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import "./index.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center w-full px-6 py-4 bg-blue-600 text-white shadow-md">
      <h1 className="text-3xl font-bold">Task Manager</h1>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/" className="text-lg hover:underline">Home</Link>
            <Link to="/add" className="text-lg hover:underline">Add Task</Link>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-lg   hover:underline">Login</Link>
            <Link to="/signup" className="text-lg hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

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
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white-100">
          <Navbar />
          <div className="flex-grow flex justify-center items-center p-6">
            <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md">
              <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><TaskList tasks={tasks} /></ProtectedRoute>} />
                <Route path="/add" element={<ProtectedRoute><TaskForm addTask={addTask} /></ProtectedRoute>} />
                <Route path="/task/:id" element={<ProtectedRoute>
                  <TaskDetails tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
                </ProtectedRoute>} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
