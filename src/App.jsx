import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import BrowseClassesPage from "./pages/BrowseClassesPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/classes" element={<BrowseClassesPage />} />
    </Routes>
  );
}