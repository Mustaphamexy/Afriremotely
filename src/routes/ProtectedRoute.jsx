import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import CompanyDashboard from "../pages/Dashboard/CompanyDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Redirect based on user accountType
  switch (user.accountType) {
    case "jobseeker":
      return <UserDashboard />;
    case "organization":
      return <CompanyDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <Navigate to="/sign-in" replace />;
  }
};

export default ProtectedRoute;
