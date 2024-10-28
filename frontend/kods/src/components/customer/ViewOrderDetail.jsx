import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

export default function ViewOrderDetail() {
  const { id } = useParams();
  const orderId = parseInt(id, 10);
  const orderDetails = orders.find(order => order.id === orderId);

  const allTimes = [...new Set(orderDetails.items.flatMap(item => item.fishStatus.map(status => status.time)))];
  const [selectedDate, setSelectedDate] = useState(allTimes[0]);

  const [review, setReview] = useState('');
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  useEffect(() => {
    setReview(orderDetails.review || '');
    setIsReviewSubmitted(!!orderDetails.review);
  }, [orderId, orderDetails.review]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleReviewChange = (content) => {
    setReview(content);
  };

  const handleSubmitReview = () => {
    setIsReviewSubmitted(true);
    orderDetails.review = review;
  };

  if (!orderDetails) {
    return <Typography variant="h6">Order not found</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button component={Link} to="/orders" variant="outlined" sx={{ mb: 1 }}>
        Back to Order History
      </Button>
      <Typography variant="h4" gutterBottom>
        Order Details - Order #{orderDetails.id}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Order Information</Typography>
            <Box>
              <Typography>Date: {orderDetails.date}</Typography>
              <Typography>Status: {orderDetails.status}</Typography>
              <Typography>Total: ${orderDetails.total.toFixed(2)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Shipping Address</Typography>
            <Typography>{orderDetails.shippingAddress}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          <Select
            value={selectedDate}
            onChange={handleDateChange}
            displayEmpty
            sx={{ mb: 2 }}
          >
            {allTimes.map((time, index) => (
              <MenuItem key={index} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fish</TableCell>
                  <TableCell align="right">Fish Status</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">
                      {item.fishStatus.find(status => status.time === selectedDate)?.status || 'N/A'}
                    </TableCell>
                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                    <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right"><strong>Total</strong></TableCell>
                  <TableCell align="right"><strong>${orderDetails.total.toFixed(2)}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Order Review
        </Typography>
        {isReviewSubmitted ? (
          <div>
            <Typography variant="h6" gutterBottom>
              Your Review:
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: review }} />
          </div>
        ) : (
          <div>
            <ReactQuill
              theme="snow"
              value={review}
              onChange={handleReviewChange}
              style={{ height: '200px', marginBottom: '50px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitReview}
              sx={{ mt: 2 }}
            >
              Submit Review
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
}