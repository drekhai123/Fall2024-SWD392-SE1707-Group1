import React, { useEffect, useState } from 'react'; // Thêm useEffect và useState
import axios from 'axios'; // Thêm import axios
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


export default function ViewOrderHistory() {
  const [orders, setOrders] = useState([]); // Use state to store orders

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        console.log('Fetched orders:', response.data); // Log fetched orders
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); // Fetch orders when component mounts
  }, []); // Dependency array is empty to run once

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
                    to={`/orders/${order.id}`}
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