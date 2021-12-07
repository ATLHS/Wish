import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
