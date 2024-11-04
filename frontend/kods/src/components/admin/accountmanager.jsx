import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select, DatePicker } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  checkAccountExists,
  GetAllAccount,
  UpdateRole,
  ToggleAccountBannedStatus,
} from '../api/AccountApi'; // Adjust the import path as necessary
import { createNewStaff, checkAccountIdExists } from '../api/StaffApi';
import { createNewDeliveryStaff } from '../api/DeliveryStaffApi';
import 'react-toastify/dist/ReactToastify.css';
import { getJwtToken } from '../api/Url';

const { Option } = Select; // Destructure Option from Select

function AccountManager() {
  const [data, setData] = useState([]); // State to hold account data
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredData, setFilteredData] = useState([]); // State for filtere
  const navigate = useNavigate(); // Initialize navigate for navigation
  const [formData, setFormData] = useState(null); // State to hold form data
  const [originalRole, setOriginalRole] = useState(null); // State to hold the original role

  // Define roles for the dropdown
  const roles = ['delivery staff', 'staff', 'admin']; // Add your roles here
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

  const handleRoleChange = async (value, record) => {
    if (value === record.role) {
      // Do not show the form if the role hasn't changed
      return;
    }
    if (value === 'admin') {
      // Change role to admin immediately
      try {
        const updateResponse = await UpdateRole(record.accountId, value); // Update role in DB
        if (updateResponse) {
          const updatedData = data.map(item =>
            item.accountId === record.accountId ? { ...item, role: value } : item
          );
          setData(updatedData); // Update the data state
          toast.success("Role updated to admin successfully!"); // Notify the user
        } else {
          toast.error("Failed to update role in the database.");
        }
      } catch (error) {
        console.error('Error updating role to admin:', error);
        toast.error("Error updating role: " + error.message);
      }
    } else {
      // Store the original role and show the form
      setOriginalRole(record.role);
      setFormData({ ...record, role: value }); // Set form data with the new role
      setShowForm(true); // Show the form modal
    }
  };

  // Function to handle closing the form
  const handleCloseForm = () => {
    setShowForm(false); // Close the form
    if (originalRole) {
      // Reset the role back to the original if it exists
      const updatedData = data.map(item =>
        item.accountId === formData.accountId ? { ...item, role: originalRole } : item
      );
      setData(updatedData); // Update the data state
    }
  };

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

  // Define the form fields based on the selected roleY
  const renderFormFields = () => {
    const role = formData?.role;
    switch (role) {
      case 'staff':
        return (
          <>
            <Form.Item label="Staff Name" name="staffName" rules={[{ required: true, message: 'Please input staff name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Staff Gender" name="staffGender" rules={[{ required: true, message: 'Please select staff gender!' }]}>
              <Select>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Staff Phone Number" name="staffPhoneNum" rules={[{ required: true, message: 'Please input staff phone number!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Staff DOB" name="staffDOB" rules={[{ required: true, message: 'Please select staff DOB!' }]}>
              <DatePicker />
            </Form.Item>
          </>
        );
      case 'delivery staff':
        return (
          <>
            <Form.Item label="Delivery Staff Name" name="deliveryStaffName" rules={[{ required: true, message: 'Please input delivery staff name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Delivery Staff Gender" name="deliveryStaffGender" rules={[{ required: true, message: 'Please select delivery staff gender!' }]}>
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Delivery Staff Phone Number" name="deliveryStaffPhoneNum" rules={[{ required: true, message: 'Please input delivery staff phone number!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Delivery Staff DOB" name="deliveryStaffDOB" rules={[{ required: true, message: 'Please select delivery staff DOB!' }]}>
              <DatePicker />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (values) => {
    try {
      // Check if the accountId already exists in either Staff or Delivery Staff
      const accountExists = await checkAccountIdExists(values.accountId);
      if (accountExists) {
        toast.error("Account ID already exists in Staff or Delivery Staff.");
        return; // Prevent form submission
      }

      // Update the role first
      const updateResponse = await UpdateRole(values.accountId, values.role); // Update role
      if (updateResponse) {
        // Logic to create new staff in the database based on the role
        if (values.role === 'staff') {
          await createNewStaff(values); // Create new staff
        } else if (values.role === 'delivery staff') {
          await createNewDeliveryStaff(values); // Create new delivery staff
        }

        toast.success("New staff created successfully!");
        setShowForm(false); // Close the form after submission
        fetchData(); // Refresh data after creating new staff
      } else {
        toast.error("Failed to update account.");
      }
    } catch (error) {
      console.error('Error creating new staff:', error);
      toast.error("Error creating new staff: " + error.message);
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
            onChange={(value) => handleRoleChange(value, record)} // Call the new handler
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

  return (
    <div>
      <h2>Manage Accounts</h2>
      <Input
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px' }}
      />
      <Table
        columns={columns}
        dataSource={searchTerm ? filteredData : data} // Use filtered data if searchTerm exists
        loading={loading} // Show loading state
        rowKey="accountId"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
      />
      <Modal
        title="Create New Info"
        open={showForm}
        onCancel={handleCloseForm} // Use the new close handler
        footer={null}
      >
        <Form
          form={form}
          initialValues={formData || {}}
          onFinish={handleSubmit} // Call handleSubmit on form submission
          layout="horizontal"
        >
          {renderFormFields()} {/* Render fields based on role */}
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
