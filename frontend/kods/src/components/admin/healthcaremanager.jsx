
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select, message } from 'antd';
import { GetAllHealthCareStaff, UpdateHealthCareStaff } from '../api/HealthcareStaffApi'; // Adjust the import path as necessary
import '../../css/accountmanager.css';

const { Option } = Select;

function HealthcareStaffManager() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch healthcare staff data
  const fetchHealthcareStaff = async () => {
    try {
      setLoading(true);
      const response = await GetAllHealthCareStaff();
      if (response && response.status === 200) {
        const filteredStaff = response.data.filter(staff => staff.staffId !== 0);
        setFilteredData(filteredStaff || []);
      }
    } catch (error) {
      console.error('Error fetching healthcare staff:', error);
      message.error("Error fetching healthcare staff: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchHealthcareStaffsByName(value);
  };

  const searchHealthcareStaffsByName = async (name) => {
    setLoading(true);
    try {
      const response = await GetAllHealthCareStaff();
      if (response && response.status === 200) {
        const filtered = response.data.filter(staff =>
          staff.staffName.toLowerCase().includes(name.toLowerCase()) && staff.staffId !== 0
        );
        setFilteredData(filtered);
      }
    } catch (error) {
      console.error('Error searching healthcare staff:', error);
      message.error("Error searching healthcare staff: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthcareStaff();
  }, []);

  // Handle edit button click
  const handleEdit = (record) => {
    setSelectedStaff(record);
    form.setFieldsValue(record);
    setShowEditModal(true);
  };

  // Handle form submission for editing
  const handleEditSubmit = async (values) => {
    try {
      await UpdateHealthCareStaff(selectedStaff.staffId, values);
      message.success("Healthcare staff updated successfully!");
      setShowEditModal(false);
      fetchHealthcareStaff();
    } catch (error) {
      console.error('Error updating healthcare staff:', error);
      message.error("Error updating healthcare staff: " + error.message);
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
        <Button className="edit-button" onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Manage Healthcare Staff</h2>
      <Input
        placeholder="Search by healthcare staff name..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px' }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="staffId"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
      />
      <Modal
        title="Edit Healthcare Staff"
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

export default HealthcareStaffManager;