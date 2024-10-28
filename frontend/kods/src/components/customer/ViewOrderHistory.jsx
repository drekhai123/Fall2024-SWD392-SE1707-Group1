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
import { getOrderByCustomerId } from '../api/OrdersApi'; // Import the API function

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
    navigate(`/orders/${orderId}`);
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
              <TableCell>Order ID</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.createdAt}</TableCell>
                <TableCell>{order.deliveryStatus}</TableCell>
                <TableCell>{order.totalCost}</TableCell>
                {/* <TableCell>
                  {order.totalPrice ? order.totalPrice.toLocaleString('vi-VN') : 'N/A'} VND
                </TableCell> */}
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetail(order.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderHistory;
