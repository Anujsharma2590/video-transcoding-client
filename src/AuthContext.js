import React, { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if tokens are already in localStorage
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");

    if (accessToken && idToken) {
      setIsAuthenticated(true);

      setIsLoading(false);
    } else {
      // Try to extract tokens from URL hash after Cognito redirect
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const newAccessToken = params.get("access_token");
        const newIdToken = params.get("id_token");

        if (newAccessToken && newIdToken) {
          // Store the tokens in localStorage
          localStorage.setItem("access_token", newAccessToken);
          localStorage.setItem("id_token", newIdToken);

          // Set authentication state
          setIsAuthenticated(true);

          // Remove hash from the URL to clean up
          window.history.replaceState(null, null, " ");
        }
      }
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to home or login page after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
