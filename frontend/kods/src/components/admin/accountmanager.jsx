import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select, message, Card } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  GetAllAccount,
  ToggleAccountBannedStatus,
  AddNewDeliveryStaff,
  AddNewStaff
} from '../api/AccountApi'; // Adjust the import path as necessary
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

  const handleSubmit = async (values) => {
    const { username, password, confirmPassword, email } = values;

    // Validate password and confirm password
    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      // Call the appropriate API based on the selected role
      if (selectedRole === 'staff') {
        await AddNewStaff({ username, password, email });
      } else if (selectedRole === 'delivery') {
        await AddNewDeliveryStaff({ username, password, email });
      }

      message.success("Account created successfully!");
      handleCloseForm(); // Close the form after successful creation
      fetchData(); // Refresh the account data
    } catch (error) {
      console.error('Error creating new account:', error);
      message.error(error.message); // Display the error message
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
    { title: 'Role', dataIndex: 'role' },
    { title: 'Verified', dataIndex: 'verified', render: (verified) => (verified ? 'Yes' : 'No') },
    {
      title: 'Actions',
      render: (text, record) => (
        <>
          <Select
            defaultValue={record.role}
            style={{ width: 120 }}
            onChange={(value) => {
              // Handle role change if needed
              console.log(`Role changed to: ${value} for account ID: ${record.accountId}`);
            }}
          >
            {roles.map(role => (
              <Option key={role} value={role}>{role}</Option>
            ))}
          </Select>
          <Button
            onClick={() => toggleBannedStatus(record)}
            disabled={isToggling}
            style={{
              marginLeft: '8px',
              backgroundColor: record.banned ? 'orange' : undefined,
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
        Create a New Account
      </Button>
      <Input
        placeholder="Search by username"
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
        title="Select Role"
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
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
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
