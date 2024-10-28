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
  const orders = [
    {
      id: 1,
      date: '2023-05-01',
      total: 150.99,
      status: 'Delivered',
      items: [
        {
          id: 1,
          name: 'Fish 1',
          quantity: 2,
          price: 49.99,
          fishStatus: [
            { time: '2024-10-01', status: 'OK' },
            { time: '2024-10-02', status: 'OK' }
          ]
        },
        {
          id: 2,
          name: 'Fish 2',
          quantity: 1,
          price: 51.01,
          fishStatus: [
            { time: '2024-10-01', status: 'Not OK' },
            { time: '2024-10-02', status: 'OK' }
          ]
        },
      ],
      shippingAddress: '123 Main St, City, Country, 12345',
      review: ''
    },
    {
      id: 2,
      date: '2023-05-15',
      total: 89.99,
      status: 'Processing',
      items: [
        {
          id: 3,
          name: 'Fish 3',
          quantity: 1,
          price: 89.99,
          fishStatus: [
            { time: '2024-10-01', status: 'Not OK' },
            { time: '2024-10-02', status: 'OK' }
          ]
        },
      ],
      shippingAddress: '456 Elm St, City, Country, 67890',
      review: ''
    },
    {
      id: 3,
      date: '2023-06-02',
      total: 200.50,
      status: 'Shipped',
      items: [
        {
          id: 4,
          name: 'Fish 4',
          quantity: 2,
          price: 100.25,
          fishStatus: [
            { time: '2024-10-01', status: 'OK' },
            { time: '2024-10-02', status: 'Not OK' }
          ]
        },
      ],
      shippingAddress: '789 Oak St, City, Country, 11223',
      review: ''
    },
  ];

  // const [orders, setOrders] = useState([]);
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get('/api/orders');
  //       setOrders(response.data);
  //     } catch (error) {
  //       console.error('Error fetching orders:', error);
  //     }
  //   };

  //   fetchOrders(); // Gọi hàm fetchOrders
  // }, []); // Chạy một lần khi component mount


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