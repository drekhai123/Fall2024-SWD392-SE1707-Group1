import React, { useEffect, useState, useCallback } from 'react';
import { Card, Row, Col, Statistic, Table, Modal } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { GetAllOrders } from '../api/OrdersApi';
import { GetAllCustomers } from '../api/CustomerApi';
import { GetAllPayments } from '../api/PaymentApi'; // Import the API to fetch payments
import '../../css/reportmanager.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Import Recharts components

const StatisticsReport = () => {
  const [ordersData, setOrdersData] = useState([]); // State to hold orders data
  const [paymentsData, setPaymentsData] = useState([]); // State to hold payments data
  const [totalSales, setTotalSales] = useState(0); // State to hold total sales
  const [totalCustomers, setTotalCustomers] = useState(0); // State to hold total customers
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold selected order
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  // Sample statistics data
  const estimatedRevenue = ordersData.reduce((total, order) => {
    const cost = parseFloat(String(order.totalCost).replace(/[^0-9.-]+/g, ''));
    return total + (isNaN(cost) ? 0 : cost);
  }, 0); // Calculate the estimated revenue based on totalCost

  const statisticsData = [
    {
      title: 'Total Revenue',
      value: `${totalSales.toLocaleString()} VND`, // Format total sales with VND
      trend: 'up',
    },
    {
      title: 'Estimated Revenue',
      value: `${estimatedRevenue.toLocaleString()} VND`, // Set the value based on calculated estimated revenue
      trend: 'up',
    },
    {
      title: 'Total Orders',
      value: ordersData.length + ' Orders', // Set the value based on the count of orders
      trend: ordersData.length > 10 ? 'up' : 'down', // Determine trend based on count
    },
    {
      title: 'Total Customers',
      value: totalCustomers.length + ' Customers',
      trend: 'up',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return { color: '#3f8600' }; // Green for Paid
      case 'PENDING':
        return { color: '#faad14' }; // Yellow for Pending
      case 'CANCELLED':
        return { color: '#cf1322' }; // Red for Failed
      case 'PROCESSING':
        return { color: 'blue' }; // Blue for Processing
      case 'DELIVERED':
        return { color: 'green' }; // Green for Delivered
      case 'CASH':
        return { color: '#000000' }; // Black for Cash
      case 'BANK_TRANSFER':
        return { color: '#0000FF' }; // Blue for Bank Transfer
      default:
        return {};
    }
  };

  const columns = [
    { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
    { title: 'Sender Name', dataIndex: 'senderName', key: 'senderName', ellipsis: true },
    { title: 'Recipient Name', dataIndex: 'recipientName', key: 'recipientName', ellipsis: true },
    { title: 'Recipient Email', dataIndex: 'recipientEmail', key: 'recipientEmail', ellipsis: true },
    {
      title: 'Created Date', dataIndex: 'createdAt', key: 'createdAt', render: (text) => {
        const date = new Date(text);
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with zero
        const year = date.getFullYear(); // Get full year
        return <span>{`${day}/${month}/${year}`}</span>; // Format as DD/MM/YYYY
      }
    },
    { title: 'Payment Method', dataIndex: 'paymentMethod', key: 'paymentMethod', render: (text) => <span style={getStatusColor(text)}>{text}</span>, align: 'center' },
    { title: 'Payment Status', dataIndex: 'paymentStatus', key: 'paymentStatus', render: (text) => <span style={getStatusColor(text)}>{text}</span>, align: 'center' },
    { title: 'Delivery Status', dataIndex: 'deliveryStatus', key: 'deliveryStatus', render: (text) => <span style={getStatusColor(text)}>{text}</span>, align: 'center' },
    { title: 'Total Cost', dataIndex: 'totalCost', key: 'totalCost' },
  ];

  const paymentColumns = [
    { title: 'Payment ID', dataIndex: 'paymentId', key: 'paymentId' },
    { title: 'Transaction ID', dataIndex: 'transactionId', key: 'transactionId' },
    { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => {
        const date = new Date(text);
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with zero
        const year = date.getFullYear(); // Get full year
        return <span>{`${day}/${month}/${year}`}</span>; // Format as DD/MM/YYYY
      },
      align: 'center' // Center
    },
    { title: 'Payment Status', dataIndex: 'status', key: 'status', render: (text) => <span style={getStatusColor(text)}>{text}</span>, align: 'center' },
  ];

  const handleRowClick = (record) => {
    setSelectedOrder(record); // Set the selected order
    setIsModalVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal
    setSelectedOrder(null); // Clear the selected order
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await GetAllOrders(); // Call the API to get orders
        setOrdersData(response.data); // Set the orders data to state
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    const fetchPayments = async () => {
      try {
        const response = await GetAllPayments(); // Call the API to get payments
        setPaymentsData(response.data); // Set the payments data to state
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    };

    fetchOrders();
    fetchPayments(); // Fetch payments data
  }, []); // Empty dependency array to run once on mount

  const calculateTotalSales = useCallback(() => {
    const total = ordersData.reduce((total, order) => {
      if (order.deliveryStatus === 'DELIVERED' && order.paymentStatus === 'PAID') {
        const cost = parseFloat(String(order.totalCost).replace(/[^0-9.-]+/g, ''));
        return total + (isNaN(cost) ? 0 : cost);
      }
      return total;
    }, 0);

    setTotalSales(total);
  }, [ordersData]);

  useEffect(() => {
    calculateTotalSales(); // Call calculateTotalSales whenever ordersData changes
  }, [ordersData, calculateTotalSales]); // No changes needed here

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Replace with your actual API call to get total customers
        const response = await GetAllCustomers(); // Example API call
        setTotalCustomers(response.data); // Set the total customers to state
      } catch (error) {
        console.error('Failed to fetch total customers:', error);
      }
    };

    fetchCustomers();
  }, []); // Empty dependency array to run once on mount

  const sortedOrdersData = [...ordersData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort orders by orderDate in descending order
  const sortedPaymentsData = [...paymentsData].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)); // Sort payments by createdDate in descending order

  // Calculate Total Revenue per day
  const totalRevenuePerDay = ordersData.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString(); // Format date to DD/MM/YYYY
    const cost = parseFloat(String(order.totalCost).replace(/[^0-9.-]+/g, ''));
    if (!isNaN(cost)) {
      acc[date] = (acc[date] || 0) + cost; // Sum costs for each date
    }
    return acc;
  }, {});

  const revenueData = Object.entries(totalRevenuePerDay).map(([date, total]) => ({
    date,
    totalRevenue: total,
  }));

  return (
    <div style={{ position: 'absolute', top: 0, right: 0, padding: '24px', maxWidth: '85%' }}>
      <h2>Statistics Report</h2>
      {/* Line Chart for Total Revenue per Day */}
      <h2 style={{ marginTop: '24px' }}>Total Revenue per Day</h2>
      <LineChart width={600} height={300} data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalRevenue" stroke="#8884d8" />
      </LineChart>
      <Row gutter={16}>
        {statisticsData.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ color: stat.trend === 'up' ? '#3f8600' : '#cf1322' }}
                prefix={stat.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              />
            </Card>
          </Col>
        ))}
      </Row>



      {/* Orders Table */}
      <h2 style={{ marginTop: '24px' }}>Latest Orders List</h2>
      <Table
        dataSource={sortedOrdersData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Handle row click
        })}
        rowClassName="hover-row" // Apply custom class for hover effect
      />

      {/* Payment List */}
      <h2 style={{ marginTop: '24px' }}>Latest Payment List</h2>
      <Table
        headerStyle={{ backcolor: 'green' }}
        dataSource={sortedPaymentsData} // Use payments data
        columns={paymentColumns} // Use payment columns
        pagination={{ pageSize: 5 }}
        rowClassName="hover-row" // Apply custom class for hover effect
      />

      {/* Modal for Order Details */}
      <Modal
        title={<div style={{ textAlign: 'center' }}>Order Details</div>} // Center the title
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Sender Name:</strong> {selectedOrder.senderName}</p>
            <p><strong>Sender Address:</strong> {selectedOrder.senderAddress}</p>
            <p><strong>Recipient Name:</strong> {selectedOrder.recipientName}</p>
            <p><strong>Recipient Address:</strong> {selectedOrder.recipientAddress}</p>
            <p><strong>Recipient Email:</strong> {selectedOrder.recipientEmail}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
            <p><strong>Delivery Status:</strong> {selectedOrder.deliveryStatus}</p>
            <p><strong>Total Cost:</strong> {selectedOrder.totalCost}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StatisticsReport;