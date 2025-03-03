import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion";

import Profile from "../components/Profile";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";
import DarkModeToggle from "./DarkModeToggle";

import { IoReorderThreeOutline } from "react-icons/io5";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("login-info"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      {(showLogin || showSignup) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
          {showSignup && <SignupPopup onClose={() => setShowSignup(false)} />}
        </div>
      )}
      <header className="bg-white dark:bg-slate-800 shadow-md dark:shadow-gray-400 p-4 relative z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <NavLink to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Meme Maker
            </NavLink>
          </div>
          {/* {Desktop Navigation} */}
          <div className="hidden md:flex space-x-6 text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-violet-500 font-semibold"
                  : "text-gray-700 hover:text-violet-500 dark:text-white"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/create-meme"
              className={({ isActive }) =>
                isActive
                  ? "text-violet-500 font-semibold"
                  : "text-gray-700 hover:text-violet-500 dark:text-white"
              }
            >
              Create Meme
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                isActive
                  ? "text-violet-500 font-semibold"
                  : "text-gray-700 hover:text-violet-500 dark:text-white"
              }
            >
              Leaderboard
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-violet-500 font-semibold"
                  : "text-gray-700 hover:text-violet-500 dark:text-white"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-violet-500 font-semibold"
                  : "text-gray-700 hover:text-violet-500 dark:text-white"
              }
            >
              Contact Us
            </NavLink>
          </div>
          <div className="hidden md:flex">
            {<DarkModeToggle />}
            {user ? (
              <Profile />
            ) : (
              <div className="flex gap-4">

                <button
                  onClick={() => setShowLogin(true)}
                  className="text-gray-900 text-sm font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="bg-violet-500 px-4 py-2 rounded-md text-white text-sm font-semibold"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
          <button
            className="flex md:hidden text-4xl"
            onClick={() => setShowMobileNav(!showMobileNav)}
          >
            <IoReorderThreeOutline />
          </button>
          {showMobileNav && (
              <motion.div
              initial={{ x: "100%", opacity: 0 }} // Start from the right
              animate={{ x: 0, opacity: 1 }} // Slide in smoothly
              exit={{ x: "100%", opacity: 0 }} // Slide out when closed
              transition={{ type: "ease-in-out", duration: 0.3 }} // Smooth transition
              className="absolute right-0 top-16 w-52 max-w-md bg-white shadow-2xl dark:shadow-gray-400 rounded-md z-50"
            >
              <div className=" py-3 space-y-4 flex flex-col">
                {user && (
                  <NavLink
                    to="/my-profile"
                    className="text-gray-900 hover:text-violet-500 border-b-1 px-4 border-gray-400"
                  >
                    My Profile
                  </NavLink>
                )}
                <NavLink
                  to="/"
                  className=" text-gray-900 hover:text-violet-500 border-b-1 px-4 border-gray-400"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/create-meme"
                  className="text-gray-900 hover:text-violet-500 border-b-1 px-4 border-gray-400"
                >
                  Create Meme
                </NavLink>
                <NavLink
                  to="/leaderboard"
                  className="text-gray-900 hover:text-violet-500 border-b-1 px-4 border-gray-400"
                >
                  Leaderboard
                </NavLink>
                <NavLink
                  to="/about"
                  className="text-gray-900 hover:text-violet-500 border-b-1 px-4 border-gray-400"
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className="text-gray-900 hover:text-violet-500 border-b-1 px-4 border-gray-400"
                >
                  Contact Us
                </NavLink>
                {!user && (
                  <>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="text-gray-900 hover:text-violet-500 border-b-1 px-4 border-gray-400 flex flex-start"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setShowSignup(true)}
                      className="text-gray-900 hover:text-violet-500 border-b-1 px-4 border-gray-400 flex flex-start"
                    >
                      Singup
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </nav>
      </header>
    </>
  );
}
