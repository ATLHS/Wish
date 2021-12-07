import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn === true ? component : <Navigate to="/signin" replace />;
};

export default RequireAuth;
