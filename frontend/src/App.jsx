import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import BrowseClassesPage from "./pages/BrowseClassesPage.jsx";
import DashboardPage from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/classes" element={<BrowseClassesPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}