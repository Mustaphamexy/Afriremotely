import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/userslogin/`, {
        email,
        password,
      });

      // Expecting API to return: username, email, role, tokens
      const userData = {
        username: response.data.username,
        email: response.data.email ?? null,
        role: response.data.role ?? null,
        tokens: response.data.tokens,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // ✅ FIXED: Store individual tokens separately
      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);
      localStorage.setItem("tokens", JSON.stringify(response.data.tokens)); // Keep this for backward compatibility if needed

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // 📝 SIGNUP
  const signup = async (username, email, password, password2, role) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/userssignup/`, {
        username,
        email,
        password,
        password2,
        role,
      });

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
    // ✅ FIXED: Also remove individual tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};