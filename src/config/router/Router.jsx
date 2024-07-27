import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../../screens/login/LoginForm";
import NavSidebar from "../../components/Sidebar/NavSidebar";
import NotAuthorized from "../../screens/notAuthorized/NotAuthorized"; // Create this component if not available
import ProtectedRoute from "./protectedRoute";

const isAuthenticated = false;
const isAdmin = false;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/adminPanel",
    element: (
      <ProtectedRoute>
        <NavSidebar />
      </ProtectedRoute>
    ),
  },
  {
    path: "/not-authorized",
    element: <NotAuthorized />, // Adjust the path as needed
  },
]);

export default router;
