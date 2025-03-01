import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Profile from '../components/Profile';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopUp';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
      <header className="bg-white shadow-md p-4 relative z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <a href="#" className="text-2xl font-bold text-gray-900">Meme Maker</a>
          </div>
          <div className="flex space-x-6 text-lg">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-violet-500 font-semibold" : "text-gray-700 hover:text-violet-500"}>Home</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-violet-500 font-semibold" : "text-gray-700 hover:text-violet-500"}>Contact Us</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-violet-500 font-semibold" : "text-gray-700 hover:text-violet-500"}>About</NavLink>
            <NavLink to="/create-meme" className={({ isActive }) => isActive ? "text-violet-500 font-semibold" : "text-gray-700 hover:text-violet-500"}>Create Meme</NavLink>
          </div>
          <div>
            {user ? (
              <Profile />
            ) : (
              <div className="flex gap-4">
                <button onClick={() => setShowLogin(true)} className="text-gray-900 text-sm font-semibold">
                  Login
                </button>
                <button onClick={() => setShowSignup(true)} className="bg-violet-500 px-4 py-2 rounded-md text-white text-sm font-semibold">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
