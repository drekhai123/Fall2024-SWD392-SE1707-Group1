import React from 'react';
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

// Updated mock data with fishStatus
const orders = [
  { id: 1, code: 'ORD001', dateCreated: '2023-05-01', status: 'Delivered', totalPrice: 150000, fishStatus: 'Fresh' },
  { id: 2, code: 'ORD002', dateCreated: '2023-05-03', status: 'In Transit', totalPrice: 200000, fishStatus: 'Frozen' },
  { id: 3, code: 'ORD003', dateCreated: '2023-05-05', status: 'Processing', totalPrice: 180000, fishStatus: 'Fresh' },
];

const OrderHistory = () => {
  const navigate = useNavigate();

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
              <TableCell>Order Code</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Fish Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.code}</TableCell>
                <TableCell>{order.dateCreated}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.totalPrice.toLocaleString('vi-VN')} VND</TableCell>
                <TableCell>{order.fishStatus}</TableCell>
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
