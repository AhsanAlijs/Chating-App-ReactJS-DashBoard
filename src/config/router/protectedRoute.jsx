import React from "react";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // const tokens = JSON.parse(token);
  const user = localStorage.getItem("user");
  const admin = JSON.parse(user);
  if (!token) {
    return <Navigate to="/" />;
  }

  if (!admin?.type) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
