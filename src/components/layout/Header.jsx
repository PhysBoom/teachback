import React, { useContext } from "react";
import Logo from "../ui/Logo.jsx";
import Button from "../ui/Button.jsx";
import { AuthContext } from "../../contexts/auth/AuthContext.js";
import UserPill from "../ui/UserPill.jsx";
import { useNavigate } from "react-router-dom";

export default function Header({ showLogoOnly = false, className="", logoTextColor="" }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className={`flex items-center justify-between border-b border-slate-800/60 px-6 md:px-12 py-5 sticky top-0 bg-navy-deep backdrop-blur-md z-50 ${className}`}>
      <Logo textColor={logoTextColor} />

      {!showLogoOnly &&
        auth.userId ? (
          <UserPill 
            textColor="text-white"
            name="John Doe" 
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAtKoRJvGdeDO9bllNk6BGClcR6SM7dlXw1rch8cXFXsVazBABq-owzNrMCjk5P-BY6nY3Sg8UgRznRLHoxpKT_TJBHIK0aIyrR5grG0Lpo0JQgHhXF-G9q6eliHVWOZGZDvqoDJkpbD9GA_e47FTlNbWaDNWE33Hiomd_XjqLhW2htiL26bGhJQCmqROVfNCYMy1iChZ_taK-5xrhRid8YMhv6rKy0qBRSOoptcLSWM_TyVs6YhdZTMn5Glksx8vn5LNQVPhFU1Aw" 
            onClick={() => navigate("/dashboard")}
            showLogout={true}
           />
        ) : (
        <div className="hidden md:flex flex-1 justify-end gap-10">
            <div className="flex gap-4">
            <Button size="sm" variant="primary" as="a" to="/signup">
                Get Started Free
            </Button>
            <Button size="sm" variant="ghost" as="a" to="/classes">
                Browse Classes
            </Button>
            </div>
        </div>
        )
      }
    </header>
  );
}