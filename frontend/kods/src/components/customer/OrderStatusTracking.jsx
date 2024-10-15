// src/OrderStatusTracking.js
import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Stepper, Step, StepLabel, TextField } from '@mui/material';

const orders = [
  { id: 'ORD001', date: '2024-09-20', status: 'Delivered', items: 3 },
  { id: 'ORD002', date: '2024-09-22', status: 'In Transit', items: 1 },
  { id: 'ORD003', date: '2024-09-23', status: 'Processing', items: 2 },
  { id: 'ORD004', date: '2024-09-25', status: 'Shipped', items: 4 },
];

const steps = ['Order Placed', 'Processing', 'Shipped', 'In Transit', 'Delivered'];

const getStatusIndex = (status) => {
  switch (status) {
    case 'Order Placed':
      return 0;
    case 'Processing':
      return 1;
    case 'Shipped':
      return 2;
    case 'In Transit':
      return 3;
    case 'Delivered':
      return 4;
    default:
      return 0;
  }
};

const OrderStatusTracking = () => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClickOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.id.includes(searchTerm) ||
    order.date.includes(searchTerm) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order Status Tracking
      </Typography>
      <TextField
        label="Search Orders"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && filteredOrders.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleClickOpen(order)}>Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        searchTerm && (
          <Typography variant="body1" color="textSecondary">
            No orders found.
          </Typography>
        )
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Tracking - {selectedOrder?.id}</DialogTitle>
        <DialogContent>
          <Stepper activeStep={getStatusIndex(selectedOrder?.status)} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography variant="body1">Current Status: {selectedOrder?.status}</Typography>
          <Typography variant="body2">Order Date: {selectedOrder?.date}</Typography>
          <Typography variant="body2">Number of Items: {selectedOrder?.items}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">CLOSE</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderStatusTracking;