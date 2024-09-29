import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getStatusText = (status) => {
  switch (status) {
    case 'received':
      return 'Đã nhận đơn hàng';
    case 'inTransit':
      return 'Đang giao hàng';
    case 'delivered':
      return 'Đã giao hàng';
    default:
      return '';
  }
};

export default function OrderNoti() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const statuses = ['received', 'inTransit', 'delivered'];
    const interval = setInterval(() => {
      const newNotif = {
        id: Date.now(),
        orderId: `0001-${Math.floor(Math.random() * 1000)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        timestamp: new Date(),
      };
      setNotifications(prev => [newNotif, ...prev].slice(0, 5));
      toast.info(`${getStatusText(newNotif.status)} - ${newNotif.orderId}`, {
        autoClose: 3000,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Thông báo đơn hàng
      </Typography>
      <List>
        {notifications.map((notif) => (
          <ListItem key={notif.id}>
            <ListItemText
              primary={`${getStatusText(notif.status)} - ${notif.orderId}`}
              secondary={notif.timestamp.toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
      <ToastContainer />
    </Box>
  );
}