import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home/Home";
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import DashboardNavigation from "./components/Navigation/DashboardNavigation/DashboardNavigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      {/* <DashboardNavigation /> */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
