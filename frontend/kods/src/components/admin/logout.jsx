import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { googleLogout } from '@react-oauth/google';
import { message } from 'antd';
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Function to clear session and token
    const handleLogout = () => {
      // Clear session storage or local storage
      googleLogout()
      sessionStorage.removeItem('token'); // Adjust based on how you store the token
      sessionStorage.removeItem('user'); // Adjust based on your implementation
      message.success("Logged out successfully!");
      // Redirect to homepage
      navigate('/'); // Redirect to the homepage
    };

    handleLogout();
  });

  return null; // No UI to render
};

export default Logout;