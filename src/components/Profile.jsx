import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("login-info");
    navigate("/");
    window.location.reload(); // Refresh page to update navbar
  };

  const navigate = useNavigate();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
      >
        <FaUserCircle className="text-xl" />
        <span className="text-gray-900 font-semibold">User</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg transition-opacity opacity-100">
          <ul className="py-2">
            <li>
              <span
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                onClick={() => navigate("/my-profile")}
              >
                Profile
              </span>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
              >
                Settings
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
