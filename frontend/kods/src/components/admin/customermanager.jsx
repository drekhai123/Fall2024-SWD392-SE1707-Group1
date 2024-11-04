import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select, message } from 'antd';
import { GetAllCustomers, UpdateCustomer } from '../api/CustomerApi'; // Adjust the import path as necessary
import '../../css/accountmanager.css';

const { Option } = Select;

function StaffManager() {
  // const [staffData, setStaffData] = useState([]); // State to hold delivery staff data
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State to hold selected staff for editing
  const [form] = Form.useForm(); // Ant Design form instance
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [loading, setLoading] = useState(true);
  // Fetch delivery staff data
  const fetchCustomers = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      const response = await GetAllCustomers(); // Fetch delivery staff data from API
      if (response.data && response.status === 200) {
        // setStaffData(response.data || []); // Set the fetched data
        setFilteredData(response.data || []); // Initialize filtered data
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      message.error("Error fetching customers: " + error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchCustomersByName(value); // Corrected function call
  };
  const searchCustomersByName = async (name) => {
    setLoading(true);
    try {
      const response = await GetAllCustomers(); // Fetch all delivery staff
      if (response && response.status === 200) {
        const filtered = response.data.filter(customer =>
          customer.customerName.toLowerCase().includes(name.toLowerCase())
        );
        setFilteredData(filtered); // Set filtered data
      }
    } catch (error) {
      console.error('Error searching customers:', error);
      message.error("Error searching customers: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomers(); // Fetch data on component mount
  }, []);

  // Handle edit button click
  const handleEdit = (record) => {
    setSelectedCustomer(record); // Set the selected staff for editing
    form.setFieldsValue(record); // Populate the form with the selected staff data
    setShowEditModal(true); // Show the edit modal
  };

  // Handle form submission for editing
  const handleEditSubmit = async (values) => {
    try {
      await UpdateCustomer(selectedCustomer.customerId, values); // Call API to update staff
      message.success("Customer updated successfully!");
      setShowEditModal(false); // Close the modal
      fetchCustomers(); // Refresh the staff data
    } catch (error) {
      console.error('Error updating customer:', error);
      message.error("Error updating customer: " + error.message);
    }
  };

  const columns = [
    { title: 'Customer ID', dataIndex: 'customerId' },
    { title: 'Customer Name', dataIndex: 'customerName' },
    { title: 'Customer Address', dataIndex: 'address' },
    { title: 'Gender', dataIndex: 'gender' },
    { title: 'Phone Number', dataIndex: 'phoneNumber' },
    { title: 'Date of Birth', dataIndex: 'dob' },
    {
      title: 'Actions',
      render: (text, record) => (
        <Button
          className="ban-button"
          onClick={() => handleEdit(record)
          }
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Manage Customers</h2>
      <Input
        placeholder="Search by customer name..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px' }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading} // Show loading state
        rowKey="staffId"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
      />
      <Modal
        title="Edit Customer"
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleEditSubmit}
          layout="vertical"
        >
          <Form.Item name="customerName" label="Customer Name" rules={[{ required: true, message: 'Please input the customer name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
            <Select placeholder="Select your gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: 'Please select your date of birth!' }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default StaffManager;