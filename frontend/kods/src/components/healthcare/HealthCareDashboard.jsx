// src/OrderDetail.js
import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { GetAllOrders, getOrderDetailsByOrderId } from '../api/OrdersApi';
import { createNewHealthCareStaff } from '../api/HealthcareStaffApi';
import { useNavigate } from 'react-router-dom';

const healthStatuses = [
  'HEALTHY',
  'UNHEALTHY',
  'SICK',
  'DECEASED',
];

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleString('en-GB', options);
};

const HealthCareDashboard = ({ order, onClose }) => {
  const [healthStatus, setHealthStatus] = useState("");
  const [temperature, setTemperature] = useState('');
  const [oxygenLevel, setOxygenLevel] = useState('');
  const [phLevel, setPhLevel] = useState('');
  const [notes, setNotes] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isOrderDetailVisible, setIsOrderDetailVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedFishProfileId, setSelectedFishProfileId] = useState('');
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await GetAllOrders(token);
        console.log("Fetched orders:", response.data);
        console.log(`Total orders fetched: ${response.data.length}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSubmit = async () => {
    // Check for negative values
    if (parseFloat(temperature) < 0 || parseFloat(oxygenLevel) < 0 || parseFloat(phLevel) < 0) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Values cannot be negative.', life: 3000 });
      return;
    }

    const newHealthStatusData = {
      date: new Date().toISOString(),
      status: healthStatus,
      temperature: parseFloat(temperature),
      oxygenLevel: parseFloat(oxygenLevel),
      phLevel: parseFloat(phLevel),
      notes: notes,
      orderDetailsId: selectedFishProfileId,
    };

    console.log('Submitting new health status data:', newHealthStatusData);

    try {
      const createdStatus = await createNewHealthCareStaff(newHealthStatusData);
      console.log('Successfully created new health status:', createdStatus);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Health status updated successfully.', life: 3000 });
    } catch (error) {
      console.error('Error during health status submission:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update health status.', life: 3000 });
    }

    setIsDialogVisible(false);
  };

  const handleLogout = () => {
    console.log('User logged out');
    sessionStorage.clear(); // Clear all session storage data
    navigate('/login');
  };

  const handleHealthCheck = (orderDetailsId) => {
    setIsDialogVisible(true);
    setSelectedFishProfileId(orderDetailsId);
    const selectedDetail = orderDetails.find(detail => detail.orderDetailsId === orderDetailsId);
    if (selectedDetail) {
      setHealthStatus(selectedDetail.healthStatus || '');
      setTemperature(selectedDetail.temperature || '');
      setOxygenLevel(selectedDetail.oxygenLevel || '');
      setPhLevel(selectedDetail.phLevel || '');
      setNotes(selectedDetail.notes || '');
    }
  };

  const handleViewOrderDetail = async (orderId) => {
    try {
      const token = sessionStorage.getItem('token');
      console.log(`Fetching details for order ID: ${orderId}`);
      const details = await getOrderDetailsByOrderId(orderId, token);
      console.log("Fetched order details:", details);
      console.log(`Order details for order ID ${orderId}:`, details);
      setOrderDetails(details);
      setIsOrderDetailVisible(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - order details not found:', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'The fish does not exist in the order.', life: 3000 });
      } else {
        console.error("Error fetching order details:", error);
      }
    }
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'orange';
      case 'DELIVERED':
        return 'green';
      case 'PROCESSING':
        return 'blue';
      case 'CANCELLED':
        return 'red';
      default:
        return 'black';
    }
  };

  const user = JSON.parse(sessionStorage.getItem('user'));
  const username = user.userName;
  const role = user.role || 'User';

  return (
    <div style={{ display: 'flex' }}>
      <Toast ref={toast} />
      <div style={{ width: '250px', padding: '20px', borderRight: '1px solid #ccc' }}>
        <h2>Information</h2>
        <img src="/images/healthcare.jpg" alt="User Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '10px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Role:</strong> {role}</p>
        <Button label="Logout" onClick={handleLogout} style={{ marginTop: '20px' }} />
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Healthcare</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>CustomerId</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>OrderId</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Delivery Status</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Created At</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Sender Name</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Recipient Name</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.orderId}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.customerId}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.orderId}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', color: getStatusColor(order.deliveryStatus) }}>
                    {order.deliveryStatus}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{formatDate(order.createdAt)}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.senderName}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order.recipientName}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <Button label="View Order Detail" onClick={() => handleViewOrderDetail(order.orderId)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              label={index + 1}
              onClick={() => handlePageChange(index + 1)}
              style={{ margin: '0 5px' }}
              className={currentPage === index + 1 ? 'p-button-secondary' : ''}
            />
          ))}
        </div>
        <Dialog header="Order Details" visible={isOrderDetailVisible} onHide={() => setIsOrderDetailVisible(false)}>
          {orderDetails ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Fish Profile ID</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Weight</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Gender</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((detail) => (
                  <tr key={detail.orderDetailsId}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.fishProfileId}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.fishProfile.name}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.fishProfile.weight}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{detail.fishProfile.gender}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      <Button label="Health Check" onClick={() => handleHealthCheck(detail.orderDetailsId)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading order details...</p>
          )}
        </Dialog>
        <Dialog header="Health Check" visible={isDialogVisible} onHide={() => setIsDialogVisible(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px', width: '70vw', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', margin: '20px 0' }}>Fish Profile</h2>
            {orderDetails && orderDetails
              .filter(detail => detail.orderDetailsId === selectedFishProfileId)
              .map((detail) => (
                <div key={detail.orderDetailsId}>
                  <p><strong>OrderDetails ID:</strong> {detail.orderDetailsId}</p>
                  <p><strong>Fish Profile ID:</strong> {detail.fishProfileId}</p>
                  <p><strong>Name:</strong> {detail.fishProfile.name}</p>
                  <p><strong>Weight:</strong> {detail.fishProfile.weight}</p>
                  <p><strong>Gender:</strong> {detail.fishProfile.gender}</p>
                  <p><strong>Current Health Status:</strong> {detail.orderDetailsId.healthStatus}</p>
                </div>
              ))}
            <label htmlFor="healthStatus" style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>Change Health Status:</label>
            <Dropdown
              id="healthStatus"
              value={healthStatus}
              options={healthStatuses}
              onChange={(e) => setHealthStatus(e.value)}
              placeholder="Select a status"
              style={{ padding: '16px', borderRadius: '8px', border: '3px solid #ccc', fontSize: '18px' }}
            />

            <label htmlFor="temperature" style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>Temperature:</label>
            <input
              type="number"
              id="temperature"
              value={temperature}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (value >= 0) setTemperature(e.target.value);
              }}
              style={{ padding: '16px', borderRadius: '8px', border: '3px solid #ccc', fontSize: '18px' }}
              min="0"
              step="0.1"
            />

            <label htmlFor="oxygenLevel" style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>Oxygen Level:</label>
            <input
              type="number"
              id="oxygenLevel"
              value={oxygenLevel}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (value >= 0) setOxygenLevel(e.target.value);
              }}
              style={{ padding: '16px', borderRadius: '8px', border: '3px solid #ccc', fontSize: '18px' }}
              min="0"
              step="0.1"
            />

            <label htmlFor="phLevel" style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>pH Level:</label>
            <input
              type="number"
              id="phLevel"
              value={phLevel}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (value >= 0) setPhLevel(e.target.value);
              }}
              style={{ padding: '16px', borderRadius: '8px', border: '3px solid #ccc', fontSize: '18px' }}
              min="0"
              step="0.1"
            />

            <label htmlFor="notes" style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>Notes:</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ padding: '16px', borderRadius: '8px', border: '3px solid #ccc', fontSize: '18px', minHeight: '120px' }}
            />

            <Button label="Submit" onClick={handleSubmit} />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default HealthCareDashboard;