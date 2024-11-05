import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select, message, Card, DatePicker } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../css/accountmanager.css';
import {
  GetAllAccount,
  ToggleAccountBannedStatus,
  AddNewDeliveryStaff,
  AddNewStaff
} from '../api/AccountApi'; // Adjust the import path as necessary
import { createNewStaff } from '../api/StaffApi';
import { createNewDeliveryStaff } from '../api/DeliveryStaffApi';
import { getJwtToken } from '../api/Url';

const { Option } = Select;
const roles = ['staff', 'delivery']; // Define roles for the dropdown

function AccountManager() {
  const [data, setData] = useState([]); // State to hold account data
  const [showRoleModal, setShowRoleModal] = useState(false); // State for role selection modal
  const [showForm, setShowForm] = useState(false); // State for account creation form
  const [loading, setLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState(null); // State to hold selected role
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const navigate = useNavigate(); // Initialize navigate for navigation

  // Function to check if the user is authorized
  const isAuthorized = () => {
    const token = getJwtToken();
    return token !== null; // Check if token exists
  };

  // Redirect to login if not authorized
  useEffect(() => {
    if (!isAuthorized()) {
      navigate('/login'); // Redirect to login page
    } else {
      fetchData(); // Fetch data if authorized
    }
  }, [navigate]); // Add navigate to the dependency array

  // Function to fetch account data
  const fetchData = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await GetAllAccount(); // Use the API function
      if (response && response.status === 200) {
        setData(response.data || []); // Set the fetched data directly
        setFilteredData(response.data || []); // Initialize filtered data
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      toast.error("Error fetching accounts: " + error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchAccountsByUsername(value); // Call search function
  };

  const searchAccountsByUsername = async (username) => {
    setLoading(true);
    try {
      const response = await GetAllAccount(); // Fetch all accounts
      if (response && response.status === 200) {
        const filtered = response.data.filter(account =>
          account.userName.toLowerCase().includes(username.toLowerCase())
        );
        setFilteredData(filtered); // Set filtered data
      }
    } catch (error) {
      console.error('Error searching accounts:', error);
      toast.error("Error searching accounts: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle account creation
  const handleOpenRoleModal = () => {
    setShowRoleModal(true);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowRoleModal(false);
    setShowForm(true); // Show the form after selecting a role
  };

  const handleCloseForm = () => {
    setShowForm(false);
    form.resetFields(); // Reset form fields when closing
    setSelectedRole(null); // Reset selected role
  };


  // Handle form submission
  const handleSubmit = async (values) => {
    const { username, password, confirmPassword, email, staffName, dob, gender, phoneNumber } = values;

    // Validate password and confirm password
    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      let accountId;

      // Format the date of birth to 'YYYY-MM-DD'
      const formattedDob = dob.format('YYYY-MM-DD'); // Ensure dob is a moment object

      // Step 1: Call the appropriate API based on the selected role
      if (selectedRole === 'staff') {
        const addStaffResponse = await AddNewStaff({ username, password, email });
        if (addStaffResponse.status !== 201) {
          throw new Error('Failed to add staff');
        }
        accountId = addStaffResponse.data.accountId; // Get the account ID from the response
        const newStaff = {
          accountId: accountId,
          staffName: staffName,
          dob: formattedDob,
          gender: gender,
          phoneNumber: phoneNumber,
        };
        console.log(newStaff);
        // Step 2: Call createNewStaff with the additional details
        await createNewStaff(newStaff);
      } else if (selectedRole === 'delivery') {
        const addDeliveryResponse = await AddNewDeliveryStaff({ username, password, email });
        if (addDeliveryResponse.status !== 201) {
          throw new Error('Failed to add delivery staff');
        }
        accountId = addDeliveryResponse.data.accountId; // Get the account ID from the response
        const newDeliveryStaff = {
          accountId: accountId,
          staffName: staffName,
          dob: formattedDob,
          gender: gender,
          phoneNumber: phoneNumber,
        };
        console.log(newDeliveryStaff);
        // Step 2: Call createNewDeliveryStaff with the additional details
        await createNewDeliveryStaff(newDeliveryStaff);
      }

      message.success("Account created successfully!");
      handleCloseForm(); // Close the form after successful creation
      fetchData(); // Refresh the account data
    } catch (error) {
      console.error('Error creating new account:', error);
      message.error("Email or Username already exists!"); // Display the error message
    }
  };

  // Toggle banned status
  const toggleBannedStatus = async (record) => {
    if (isToggling || !record) return; // Prevent duplicate calls
    setIsToggling(true); // Disable further calls

    try {
      const newBannedStatus = !record.banned;
      const response = await ToggleAccountBannedStatus(record.accountId, newBannedStatus);
      if (response && response.status === 200) {
        toast.success(`Account ${newBannedStatus ? 'banned' : 'unbanned'} successfully!`);
        fetchData();
        const updatedData = data.map(item =>
          item.accountId === record.accountId ? { ...item, banned: newBannedStatus } : item
        );
        setData(updatedData); // Update the state with the new data
        if (searchTerm) {
          const updatedFilteredData = filteredData.map(item =>
            item.accountId === record.accountId ? { ...item, banned: newBannedStatus } : item
          );
          setFilteredData(updatedFilteredData); // Update filtered data if searching
        }
      } else {
        toast.error("Failed to update banned status.");
      }
    } catch (error) {
      console.error('Error toggling banned status:', error);
      toast.error("Error toggling banned status: " + error.message);
    } finally {
      setIsToggling(false); // Re-enable the button after request is completed
    }
  };

  const columns = [
    { title: 'Account ID', dataIndex: 'accountId' },
    { title: 'Username', dataIndex: 'userName' },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Role', dataIndex: 'role', render: (role) => (
        <span style={{
          display: 'inline-block', // Ensure it behaves like a block element
          width: '100px', // Set a fixed width for uniformity
          textAlign: 'center', // Center the text
          backgroundColor: role === 'staff' ? '#FF8C00' :
            role === 'delivery' ? '#4169E1' :
              role === 'customer' ? '#3CB371' :
                role === 'admin' ? '#87CEEB' : 'transparent',
          color: 'white',
          padding: '4px 0', // Adjust padding for vertical centering
          borderRadius: '4px'
        }}>
          {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalize the first letter */}
        </span>
      )
    },
    { title: 'Verified', dataIndex: 'verified', render: (verified) => (verified ? 'Yes' : 'No') },
    {
      title: 'Actions',
      render: (text, record) => (
        <>
          <span style={{
            display: 'inline-block', // Ensure it behaves like a block element
            width: '100px', // Set a fixed width for uniformity
            textAlign: 'center', // Center the text
            backgroundColor: record.role === 'staff' ? '#FF8C00' :
              record.role === 'delivery' ? '#4169E1' :
                record.role === 'customer' ? '#3CB371' :
                  record.role === 'admin' ? '#87CEEB' : 'transparent',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
          }}>
            {record.role.charAt(0).toUpperCase() + record.role.slice(1)} {/* Capitalize the first letter */}
          </span>
          <Button
            className="ban-button" // Apply the custom class here
            onClick={() => toggleBannedStatus(record)}
            disabled={isToggling}
            style={{
              marginLeft: '8px',
              backgroundColor: record.banned ? 'red' : (record.banned ? 'orange' : undefined),
            }}
          >
            {record.banned ? 'Unban' : 'Ban'}
          </Button>
        </>
      ),
    },
  ];

  const renderRoleSelection = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {roles.map(role => (
          <Card
            key={role}
            title={role.charAt(0).toUpperCase() + role.slice(1)}
            className="role-card"
            style={{ width: 200, cursor: 'pointer' }}
            onClick={() => handleRoleSelect(role)}
          >
            <p>Select this role</p>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Manage Accounts</h2>
      <Button type="primary" onClick={handleOpenRoleModal} style={{ marginBottom: '16px' }}>
        Create a New Staff/Deliver/HealthCare
      </Button>
      <Input
        placeholder="Search by username..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px' }}
      />
      <Table
        columns={columns}
        dataSource={filteredData} // Use filtered data
        loading={loading} // Show loading state
        rowKey="accountId"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
      />
      <Modal
        title={<div className="custom-modal-title">Select Role</div>} // Use a div with custom class for centering
        open={showRoleModal}
        onCancel={() => setShowRoleModal(false)}
        footer={null}
      >
        {renderRoleSelection()}
      </Modal>
      <Modal
        title="Create New Account"
        open={showForm}
        onCancel={handleCloseForm} // Use the new close handler
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit} // Call handleSubmit on form submission
          layout="horizontal"
        >
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="staffName"
            label="Staff Name"
            rules={[{ required: true, message: 'Please input the staff name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select placeholder="Select your gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters long!' }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true, message: 'Please confirm your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#ff7700', borderColor: '#ff7700' }}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AccountManager;
