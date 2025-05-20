import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import LieuPage from "./pages/LieuPage";

import EventPage from "./pages/EventPage";
import EventDetailsPage from "./pages/EventDetailsPage";


import ProgramPage from "./pages/ProgramPage";
import ProgramDetailsPage from "./pages/ProgramDetailsPage";

import SitePage from "./pages/SitePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Routes protégées */}
          <Route element={<PrivateRoute />}>
          <Route path="/lieux" element={<LieuPage />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/program" element={<ProgramPage />} />
            <Route path="/program/:id" element={<ProgramDetailsPage />} />
            <Route path="/site" element={<SitePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
