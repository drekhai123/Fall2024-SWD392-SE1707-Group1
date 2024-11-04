import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../../css/manager.css';
import AccountManager from './accountmanager';
import DeliveryStaffManager from './deliverystaffmanager';
import StaffManager from './staffmanager';
import CustomerManager from './customermanager';
import Reports from './reports';
import Logout from './logout';

function AdminPage() {
  const [activeComponent, setActiveComponent] = useState('accountmanagement');
  const [selectedAccountId, setSelectedAccountId] = useState(null); // New state for selected account
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Retrieve user role from sessionStorage
    const role = sessionStorage.getItem('userRole'); // Adjust the key based on your implementation
    if (role !== 'admin') {
      // If the role is not admin, redirect to homepage
      navigate('/');
    }
  }, [navigate]);

  const handleAccountClick = (accountId) => { // Updated function for account management
    setSelectedAccountId(accountId);
    setActiveComponent(accountId);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'reports': // New case for reports
        return <Reports selectedAccountId={selectedAccountId} />;
      case 'accountmanagement': // New case for account management
        return <AccountManager selectedAccountId={selectedAccountId} />;
      case 'deliverystaffmanagement': // New case for delivery staff management
        return <DeliveryStaffManager selectedAccountId={selectedAccountId} />;
      case 'staffmanagement': // New case for staff management
        return <StaffManager selectedAccountId={selectedAccountId} />;
      case 'customermanagement': // New case for customer management
        return <CustomerManager selectedAccountId={selectedAccountId} />;
      case 'logout': // New case for logout
        return <Logout selectedAccountId={selectedAccountId} />;
      default:
        return (
          <div>
            <h2>Welcome to Your Account</h2>
            <p>Select an option from the sidebar to view details.</p>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="account-management">
        <div className="sidebar">
          <h3>Manager</h3>
          <ul>
            <li>
              <button onClick={() => handleAccountClick('reports')} className={activeComponent === 'reports' ? 'active' : ''}>
                Reports
              </button>
            </li>
            <li>
              <button onClick={() => handleAccountClick('accountmanagement')} className={activeComponent === 'accountmanagement' ? 'active' : ''}>
                Manage Accounts
              </button>
            </li>
            <li>
              <button onClick={() => handleAccountClick('deliverystaffmanagement')} className={activeComponent === 'deliverystaffmanagement' ? 'active' : ''}>
                Manage Delivery Staff
              </button>
            </li>
            <li>
              <button onClick={() => handleAccountClick('staffmanagement')} className={activeComponent === 'staffmanagement' ? 'active' : ''}>
                Manage Staff
              </button>
            </li>
            <li>
              <button onClick={() => handleAccountClick('customermanagement')} className={activeComponent === 'customermanagement' ? 'active' : ''}>
                Manage Customers
              </button>
            </li>
            <li>
              <button onClick={() => handleAccountClick('logout')} className={activeComponent === 'logout' ? 'active' : ''}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;