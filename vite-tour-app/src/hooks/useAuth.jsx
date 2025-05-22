"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create Auth Context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Check if user is authenticated
  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken && API_URL) {
        try {
          const response = await axios.get(`${API_URL}/api/protected-endpoint/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.status === 200) {
            const username = response.data.message?.split(" ")[1]?.replace("!", "");
            setUser({ username });
          } else {
            localStorage.clear();
            setUser(null);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.clear();
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, [API_URL]);

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/login/`, { email, password });
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setUser({ loggedIn: true });
      navigate("/recommendations/preferences");
    } catch (error) {
      console.error("Login error:", error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isLoggedIn: !!user,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
