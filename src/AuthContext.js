import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

export const AuthContext = createContext({
  isLoading: false,
});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("id_token") ? true : false
  );
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("access_token");
      const idToken = localStorage.getItem("id_token");

      if (accessToken && idToken) {
        // If tokens are present, attempt to fetch user profile
        try {
          await fetchUserProfile(idToken);
          setIsAuthenticated(true);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching user profile on reload:", error);
          logout(); // If fetching profile fails, log out
        }
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

            setIsAuthenticated(true);
            toast.success("Login successful!");
            window.history.replaceState(null, null, window.location.pathname);
          }
        }
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [navigate]);

  // Function to fetch user profile using access token
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/users/profile/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in Authorization header
          },
        }
      );
      setUser(response.data); // Set user data in state
    } catch (error) {
      throw new Error("Failed to fetch user profile");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");

    // Show success toast on logout
    toast.success("Logged out successfully!");
  };

  const login = (newAccessToken, newIdToken) => {
    // Store tokens in localStorage
    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("id_token", newIdToken);
    // Fetch user profile after login
    fetchUserProfile(newIdToken).then(() => {
      setIsAuthenticated(true);
      toast.success("Login successful!");
    });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logout, login, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
