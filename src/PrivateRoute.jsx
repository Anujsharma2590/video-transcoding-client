import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // If still loading, show a loading spinner or placeholder
  if (isLoading) {
    return <div>Loading...</div>; // Customize this to match your UI
  }

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Otherwise, allow access to the protected component
  return children;
};

export default PrivateRoute;
