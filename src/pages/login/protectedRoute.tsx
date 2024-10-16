import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../../hooks";

export const ProtectedRoute = () => {
  const { user } = useAuthentication();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
