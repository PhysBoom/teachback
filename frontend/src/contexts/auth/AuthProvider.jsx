import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "authToken";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));
  const navigate = useNavigate();

  const login = async ({ username, password }) => {
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem(STORAGE_KEY, data.token);
    setToken(data.token);
    navigate("/");
  };

  const signup = async ({ username, email, password, name }) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Signup failed");
    }

    localStorage.setItem(STORAGE_KEY, data.token);
    setToken(data.token);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    navigate("/signup");
  };

  const sendAuthenticatedApiRequest = async (url, options = {}) => {
    if (!token) {
      throw new Error("No auth token found");
    }

    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw new Error(data?.error || "Request failed");
    }

    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: Boolean(token),
        login,
        signup,
        logout,
        sendAuthenticatedApiRequest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}