import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./views/Dashboard/Dashboard";
import Home from "./views/Home/Home";
import Signup from "./views/Signup/Signup";
import SignIn from "./views/SignIn/SignIn";
import Navigation from "./components/Navigation/Navigation";
import { AuthContext } from "./context/AuthContext";

function App() {
  const useAuth = () => {
    return {
      isLoggedIn: false,
      token: null,
      login: (token) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token,
          })
        );
      },
      logout: () => {
        localStorage.removeItem("user");
      },
    };
  };

  const auth = useAuth();

  return (
    <BrowserRouter>
      <Navigation />
      <AuthContext.Provider value={auth}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
