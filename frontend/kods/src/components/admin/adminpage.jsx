import React, { useState } from 'react';
// import TransportService from './transportservice';
// import AdditionalserviceManagement from './manageaddtionalservice.jsx';
// import ManageRoute from './manageroute';
import '../../css/manager.css';
import AccountManager from './accountmanager';
import DeliveryStaffManager from './deliverystaffmanager';
import StaffManager from './staffmanager';
import CustomerManager from './customermanager';

function AdminPage() {
  const [activeComponent, setActiveComponent] = useState('accountmanagement');
  const [selectedAccountId, setSelectedAccountId] = useState(null); // New state for selected account

  const handleAccountClick = (accountId) => { // Updated function for account management
    setSelectedAccountId(accountId);
    setActiveComponent(accountId);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'accountmanagement': // New case for account management
        return <AccountManager selectedAccountId={selectedAccountId} />;
      case 'deliverystaffmanagement': // New case for delivery staff management
        return <DeliveryStaffManager selectedAccountId={selectedAccountId} />;
      case 'staffmanagement': // New case for staff management
        return <StaffManager selectedAccountId={selectedAccountId} />;
      case 'customermanagement': // New case for customer management
        return <CustomerManager selectedAccountId={selectedAccountId} />;
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