import React, { useEffect, useState } from "react";
import { Bell, User, Moon, Sun } from "lucide-react"; // Icons for notifications, user, and theme toggle
import Link from "next/link";

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // State for dark mode

  const toggleTheme = () => { 
    setIsDarkMode(!isDarkMode);
    // Here you would ideally update the theme in the body or global state
    document.body.classList.toggle("dark", !isDarkMode); // Toggling dark mode on body
  };

  useEffect(()=>{
    document.body.classList.add("dark")
  },[])
  return (
    <header className="bg-white sticky top-0 dark:bg-gray-900 shadow-lg px-4 py-4 sm:px-6 md:px-8 flex justify-between items-center transition-colors duration-300">
      {/* Left Side - Search Bar */}
      <div className="flex items-center space-x-4 w-full max-w-md sm:max-w-xs">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        />
      </div>

      {/* Right Side - User Profile, Notifications, and Theme Toggle */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative">
          <button className="text-gray-600 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Bell size={20} />
            <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <User size={20} className="text-gray-600 dark:text-white" />
            <span className="text-gray-800 dark:text-white">Adarsh</span>
          </div>
          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-500">
              <span className="font-semibold text-white">JD</span>
            </button>
            {/* Profile Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600 group-hover:block hidden">
              <ul>
                <li>
                  <Link href="/profile" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link href="/logout" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="text-gray-600 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          {isDarkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
