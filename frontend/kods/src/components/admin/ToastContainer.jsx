import React from 'react';
import { ToastContainer } from 'react-toastify';
import AdminPage from './adminpage';

function ParentComponent() {
  return (
    <>
      <ToastContainer /> {/* Move ToastContainer here */}
      <AdminPage />
    </>
  );
}

export default ParentComponent;