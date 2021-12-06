import React from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const { authed } = useAuth();

  return authed === true ? children : <Navigate to="/login" replace />;
};

export default AuthProvider;
