import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select, message } from 'antd';
import { GetAllDeliveryStaff, UpdateDeliveryStaff } from '../api/DeliveryStaffApi'; // Adjust the import path as necessary
import '../../css/accountmanager.css';

const { Option } = Select;

function DeliveryStaffManager() {
  // const [staffData, setStaffData] = useState([]); // State to hold delivery staff data
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [selectedStaff, setSelectedStaff] = useState(null); // State to hold selected staff for editing
  const [form] = Form.useForm(); // Ant Design form instance
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [loading, setLoading] = useState(true);
  // Fetch delivery staff data
  const fetchDeliveryStaff = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      const response = await GetAllDeliveryStaff(); // Fetch delivery staff data from API
      if (response && response.status === 200) {
        // Filter out staff with staffId = 0
        const filteredStaff = response.data.filter(staff => staff.staffId !== 0);
        setFilteredData(filteredStaff || []); // Initialize filtered data
      }
    } catch (error) {
      console.error('Error fetching delivery staff:', error);
      message.error("Error fetching delivery staff: " + error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchDeliveryStaffsByName(value); // Corrected function call
  };
  const searchDeliveryStaffsByName = async (name) => {
    setLoading(true);
    try {
      const response = await GetAllDeliveryStaff(); // Fetch all delivery staff
      if (response && response.status === 200) {
        const filtered = response.data.filter(staff =>
          staff.staffName.toLowerCase().includes(name.toLowerCase()) && staff.staffId !== 0 // Exclude staff with staffId = 0
        );
        setFilteredData(filtered); // Set filtered data
      }
    } catch (error) {
      console.error('Error searching delivery staff:', error);
      message.error("Error searching delivery staff: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDeliveryStaff(); // Fetch data on component mount
  }, []);

  // Handle edit button click
  const handleEdit = (record) => {
    setSelectedStaff(record); // Set the selected staff for editing
    form.setFieldsValue(record); // Populate the form with the selected staff data
    setShowEditModal(true); // Show the edit modal
  };

  // Handle form submission for editing
  const handleEditSubmit = async (values) => {
    try {
      await UpdateDeliveryStaff(selectedStaff.staffId, values); // Call API to update staff
      message.success("Delivery staff updated successfully!");
      setShowEditModal(false); // Close the modal
      fetchDeliveryStaff(); // Refresh the staff data
    } catch (error) {
      console.error('Error updating delivery staff:', error);
      message.error("Error updating delivery staff: " + error.message);
    }
  };

  const columns = [
    { title: 'Staff ID', dataIndex: 'staffId' },
    { title: 'Staff Name', dataIndex: 'staffName' },
    { title: 'Gender', dataIndex: 'gender' },
    { title: 'Phone Number', dataIndex: 'phoneNumber' },
    { title: 'Date of Birth', dataIndex: 'dob' },
    {
      title: 'Actions',
      render: (text, record) => (
        <Button className="ban-button" onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Manage Delivery Staff</h2>
      <Input
        placeholder="Search by deliver staff name..."
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
        title="Edit Delivery Staff"
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleEditSubmit}
          layout="vertical"
        >
          <Form.Item name="staffName" label="Staff Name" rules={[{ required: true, message: 'Please input the staff name!' }]}>
            <Input />
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

export default DeliveryStaffManager;