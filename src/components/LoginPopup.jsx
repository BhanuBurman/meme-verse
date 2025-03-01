import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("login-info"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      alert("Login successful!");
      onClose(); // Close popup
      navigate("/"); // Navigate to profile page
    } else {
      alert("Invalid username or password! Please sign up first.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 opacity-0.2">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white p-2 w-full rounded">
          Login
        </button>
        <button onClick={onClose} className="mt-2 text-gray-500 text-sm">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
