import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "userId";

export default function AuthProvider({ children }) {
  const [userId, setUserId] = useState(() =>
    localStorage.getItem(STORAGE_KEY)
  );
  const navigate = useNavigate();

  const login = ({ email, password }) => {
    localStorage.setItem(STORAGE_KEY, "12345");
    setUserId("12345");
  };

  const logInWithGoogle = () => {
    localStorage.setItem(STORAGE_KEY, "12345");
    setUserId("12345");
}

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUserId(null);
    navigate("/signup");
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        isAuthenticated: Boolean(userId),
        login,
        logout,
        logInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}