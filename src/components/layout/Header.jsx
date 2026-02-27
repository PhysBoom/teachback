import React, { useContext, useState, useEffect } from "react";
import Logo from "../ui/Logo.jsx";
import Button from "../ui/Button.jsx";
import { AuthContext } from "../../contexts/auth/AuthContext.js";
import UserPill from "../ui/UserPill.jsx";
import { useNavigate } from "react-router-dom";

export default function Header({
  showLogoOnly = false,
  className = "",
  logoTextColor = "",
}) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
      return localStorage.getItem("theme") === "dark";
    });
  
  useEffect(() => {
    const root = document.documentElement;

      if (darkMode) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
  }, [darkMode]);

  return (
    <header
      className={`
        flex items-center justify-between
        border-b
        px-6 md:px-12 py-5
        sticky top-0 backdrop-blur-md z-50
        bg-navy-deep
        border-slate-800
        ${className}
      `}
    >
      <Logo textColor={logoTextColor} />

      <div className="flex items-center gap-4">
        {/* 🌙 Dark Mode Toggle (only if provided) */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              flex items-center justify-center
              w-9 h-9 rounded-lg
              text-slate-600 dark:text-slate-300
              hover:bg-slate-100 dark:hover:bg-navy-lighter
              transition-colors
            "
            title="Toggle dark mode"
          >
            {darkMode ? (
              // Sun icon (light mode active)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
            ) : (
              // Moon icon (dark mode inactive)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3
                  7 7 0 0021 12.79z"
                />
              </svg>
            )}
          </button>

        {/* Auth Area */}
        {!showLogoOnly &&
          (auth.userId ? (
            <UserPill
              textColor="text-white"
              name="John Doe"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAtKoRJvGdeDO9bllNk6BGClcR6SM7dlXw1rch8cXFXsVazBABq-owzNrMCjk5P-BY6nY3Sg8UgRznRLHoxpKT_TJBHIK0aIyrR5grG0Lpo0JQgHhXF-G9q6eliHVWOZGZDvqoDJkpbD9GA_e47FTlNbWaDNWE33Hiomd_XjqLhW2htiL26bGhJQCmqROVfNCYMy1iChZ_taK-5xrhRid8YMhv6rKy0qBRSOoptcLSWM_TyVs6YhdZTMn5Glksx8vn5LNQVPhFU1Aw"
              onClick={() => navigate("/dashboard")}
              showLogout={true}
            />
          ) : (
            <div className="hidden md:flex flex-1 justify-end gap-4">
              <Button size="sm" variant="primary" as="a" to="/signup">
                Get Started Free
              </Button>
              <Button size="sm" variant="ghost" as="a" to="/classes">
                Browse Classes
              </Button>
            </div>
          ))}
      </div>
    </header>
  );
}