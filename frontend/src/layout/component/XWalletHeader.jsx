import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppKitAccount } from "@reown/appkit/react"; 

const XWalletHeader = () => {
  const { address: connectedWalletAddress } = useAppKitAccount();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleWalletNavigation = (e) => {
    if (!connectedWalletAddress) {
      e.preventDefault(); // Prevent navigation
      toast.error("Please connect your wallet!");
    }
  };

  return (
    <header className="w-full py-2 px-4 md:px-8 shadow-sm bg-primay dark:bg-card">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-primary flex items-center"
        >
          <img src={logo} alt="XWALLET LOGO" className="w-[80px] h-[90px]" />
          XWallet
        </motion.h1>
        <nav className="space-x-6 hidden md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-semibold ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={handleWalletNavigation} 
            className={({ isActive }) =>
              `font-semibold ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Wallet
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `font-semibold ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Contact
          </NavLink>
        </nav>
        {/* Dark Mode Toggler */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? (
            <IconSun size={24} className="text-yellow-500" />
          ) : (
            <IconMoon size={24} className="text-gray-800 dark:text-gray-200" />
          )}
        </button>
      </div>
      <ToastContainer />
    </header>
  );
};

export default XWalletHeader;
