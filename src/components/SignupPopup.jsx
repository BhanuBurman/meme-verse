import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPopup = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const userData = { username, password };
    localStorage.setItem("login-info", JSON.stringify(userData));

    alert("Signup successful! You can now log in.");
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
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
        <button onClick={handleSignup} className="bg-green-600 text-white p-2 w-full rounded">
          Sign Up
        </button>
        <button onClick={onClose} className="mt-2 text-gray-500 text-sm">
          Close
        </button>
      </div>
    </div>
  );
};

export default SignupPopup;
