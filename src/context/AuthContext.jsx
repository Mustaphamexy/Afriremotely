import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Demo "database"
  const demoUsers = [
    {
      id: 1,
      email: "jobseeker@example.com",
      password: "Password123",
      fullName: "John Doe",
      accountType: "jobseeker",
    },
    {
      id: 2,
      email: "organization@example.com",
      password: "Password123",
      fullName: "Acme Corp",
      accountType: "organization",
    },
    {
      id: 3,
      email: "admin@example.com",
      password: "Password123",
      fullName: "Super Admin",
      accountType: "admin",
    },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // 🔑 Simulate DB lookup
      const foundUser = demoUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.fullName,
        accountType: foundUser.accountType,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          foundUser.fullName
        )}&background=0D8ABC&color=fff`,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // still keep session
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
