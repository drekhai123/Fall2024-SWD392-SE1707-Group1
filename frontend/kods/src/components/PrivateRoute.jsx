import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userRole = JSON.parse(localStorage.getItem("user"))?.role; // Fetch the user's role

  const isAdmin = userRole === 'admin'; // Check if the user is an admin

  return (
     isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    )
  );
};

export default PrivateRoute;
