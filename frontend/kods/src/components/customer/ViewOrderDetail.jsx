import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Rating
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Mock data for demonstration
const orders = [
  {
    id: 1,
    code: 'ORD001',
    sender: {
      name: 'Nguyễn Văn A',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      phone: '0123456789',
    },
    receiver: {
      name: 'Trần Thị B',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      phone: '0987654321',
    },
    createdAt: '23/05/01 10:00:00',
    paymentMethod: 'Tiền mặt',
    paymentStatus: 'Đã thanh toán',
    deliveryStatus: 'Đã giao hàng',
    totalWeight: 5,
    totalCost: 150000,
    fishes: [
      { id: 1, name: 'Koi 1', fishStatus: [
        { date: '23/05/01', status: 'oke' },
        { date: '23/05/02', status: 'oke' },
        { date: '23/05/03', status: 'oke' },
      ]},
      { id: 2, name: 'Koi 2', fishStatus: [
        { date: '23/05/01', status: 'Đoke' },
        { date: '23/05/02', status: 'oke' },
        { date: '23/05/03', status: 'oke' },
      ]},
    ],
  },
];

export default function OrderDetail({ onBack }) {
  const { orderId } = useParams();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  // Find the order detail based on orderId
  const orderDetail = orders.find(order => order.id === parseInt(orderId));

  if (!orderDetail) {
    return <Typography variant="h6">Order not found</Typography>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/orders')}
        style={{ marginBottom: '20px' }}
      >
        Go Back
      </Button>
      <Typography variant="h4" gutterBottom>
        Order Details {orderDetail.code}
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
          <Paper style={{ padding: '20px', flex: 1, border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h6" gutterBottom>Sender Information</Typography>
            <Typography>Name: {orderDetail.sender.name}</Typography>
            <Typography>Address: {orderDetail.sender.address}</Typography>
            <Typography>Phone: {orderDetail.sender.phone}</Typography>
            <Typography>Order Created At: {orderDetail.createdAt}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
          <Paper style={{ padding: '20px', flex: 1, border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h6" gutterBottom>Receiver Information</Typography>
            <Typography>Name: {orderDetail.receiver.name}</Typography>
            <Typography>Address: {orderDetail.receiver.address}</Typography>
            <Typography>Phone: {orderDetail.receiver.phone}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>Order Information</Typography>
            <Typography>Payment Method: {orderDetail.paymentMethod}</Typography>
            <Typography>Payment Status: {orderDetail.paymentStatus}</Typography>
            <Typography>Delivery Status: {orderDetail.deliveryStatus}</Typography>
            <Typography>Total Weight: {orderDetail.totalWeight} kg</Typography>
            <Typography>Total Cost: {orderDetail.totalCost.toLocaleString('vi-VN')} VND</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fish Name</TableCell>
                  <TableCell>Fish Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetail.fishes.map((fish) => (
                  <TableRow key={fish.id}>
                    <TableCell>{fish.name}</TableCell>
                    <TableCell>
                      {fish.fishStatus.map((status, index) => (
                        <div key={index}>
                          {status.date}: {status.status}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>Feedback and Rating</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              style={{ marginBottom: '20px' }}
            />
            <ReactQuill value={feedback} onChange={(content) => setFeedback(content)} />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
              onClick={() => console.log('Feedback submitted:', { rating, feedback })}
            >
              Submit Feedback
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
