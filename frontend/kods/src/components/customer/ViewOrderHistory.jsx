import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data for orders
const orders = [
  { id: 1, code: 'ORD001', date: '2023-05-01', total: 150.99, status: 'Delivered', quantity: 2 },
  { id: 2, code: 'ORD002', date: '2023-05-15', total: 89.99, status: 'Processing', quantity: 1 },
  { id: 3, code: 'ORD003', date: '2023-06-02', total: 200.50, status: 'Shipped', quantity: 3 },
];

export default function ViewOrderHistory() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Code</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Fish Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.code}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {/* Simplified logic for fish status */}
                  {order.status === 'Delivered' ? 'OK' : 'Pending'}
                </TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/order/${order.id}`}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}