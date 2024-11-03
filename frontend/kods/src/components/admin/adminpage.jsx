import React, { useState } from 'react';
// import TransportService from './transportservice';
// import AdditionalserviceManagement from './manageaddtionalservice.jsx';
// import ManageRoute from './manageroute';
import '../../css/manager.css';
import AccountManager from './accountmanager';


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