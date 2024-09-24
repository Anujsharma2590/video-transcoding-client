import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to home if not authenticated
  }

  return children; // Render protected component if authenticated
};

export default PrivateRoute;
