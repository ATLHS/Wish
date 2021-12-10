import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Signup from "./views/Signup/Signup";
import SignIn from "./views/SignIn/SignIn";
import Navigation from "./components/Navigation/Navigation";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./views/Dashboard/Dashboard";
import Profil from "./views/Profil/Profil";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );

  const useAuth = () => {
    return {
      isLoggedIn,
      signin: (user, token) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            user,
          })
        );
        localStorage.setItem(
          "token",
          JSON.stringify({
            token,
          })
        );
        setIsLoggedIn(true);
      },
      logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      },
    };
  };

  const auth = useAuth();

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>
        <Navigation />
        <Routes>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <Profil />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
