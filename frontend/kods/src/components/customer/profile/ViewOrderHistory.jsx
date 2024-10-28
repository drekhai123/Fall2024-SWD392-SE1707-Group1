import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from '@mui/material';
import { getOrderByCustomerId } from '../../api/OrdersApi'; // Import the API function

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = sessionStorage.getItem('user');
        console.log('User data from session storage:', userData);

        if (userData) {
          const user = JSON.parse(userData);
          const customerId = user?.customer?.customerId;
          console.log('Extracted customerId:', customerId);

          if (customerId) {
            const data = await getOrderByCustomerId(customerId);
            console.log('Fetched order data:', data);
            setOrders(data);
          } else {
            console.error('Customer ID not found');
          }
        } else {
          console.error('User data not found in session storage');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetail = (orderId) => {
    navigate(`/profile/ViewOrderHistory/${orderId}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Date Created</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Total Price</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const date = new Date(order.createdAt);
              const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

              // Define a function to get the color based on the status
              const getStatusColor = (status) => {
                switch (status) {
                  case 'PENDING':
                    return 'orange';
                  case 'PROCESSING':
                    return 'blue';
                  case 'DELIVERED':
                    return 'green';
                  case 'CANCELLED':
                    return 'red';
                  default:
                    return 'black';
                }
              };

              return (
                <TableRow key={order.id}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell style={{ color: getStatusColor(order.deliveryStatus) }}>
                    {order.deliveryStatus}
                  </TableCell>
                  <TableCell>{order.totalCost}</TableCell>
                  <TableCell>
                    {order.deliveryStatus === 'DELIVERED' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetail(order.orderId)}
                      >
                        View Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderHistory;
