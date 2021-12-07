import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Signup from "./views/Signup/Signup";
import SignIn from "./views/SignIn/SignIn";
import Navigation from "./components/Navigation/Navigation";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

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
