import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      navigate("/login"); // Redirect to login after successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Signup</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="username" placeholder="Username" onChange={handleChange}
            className="w-full p-2 border rounded-lg" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange}
            className="w-full p-2 border rounded-lg" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange}
            className="w-full p-2 border rounded-lg" required />
          <button type="submit" className="w-full bg-blue-600 text-black p-2 rounded-lg hover:bg-blue-700">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
