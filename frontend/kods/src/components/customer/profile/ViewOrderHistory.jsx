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
  Typography,
  Pagination
} from '@mui/material';
import { getOrderByCustomerId } from '../../api/OrdersApi'; // Import the API function

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1); // State for current page
  const rowsPerPage = 5; // Number of orders per page
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'asc' });

  const sortedOrders = React.useMemo(() => {
    const sortableOrders = [...orders];
    sortableOrders.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableOrders;
  }, [orders, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userResponse = sessionStorage.getItem('user');
        const userData = JSON.parse(userResponse)
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

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div style={{ padding: '20px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Sender name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Recipient name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Total weight</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Total Price</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Distance</TableCell>
              <TableCell
                style={{ fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => requestSort('deliveryStatus')}
              >
                Delivery Status
              </TableCell>
              <TableCell
                style={{ fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => requestSort('createdAt')}
              >
                Date Created
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedOrders.length > 0 ? (
              sortedOrders.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((order) => {
                const date = new Date(order.createdAt);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

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
                    <TableCell>{order.senderName}</TableCell>
                    <TableCell>{order.recipientName}</TableCell>
                    <TableCell>{order.totalWeight}</TableCell>
                    <TableCell>{new Intl.NumberFormat('vi-VN').format(order.totalCost)} VND</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.distance.toFixed(2)}</TableCell>
                    <TableCell style={{ color: getStatusColor(order.deliveryStatus) }}>
                      {order.deliveryStatus}
                    </TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetail(order.orderId)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography variant="h6">
                    Please create a new order
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {orders.length > 0 && (
          <Pagination
            count={Math.ceil(orders.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          />
        )}
      </TableContainer>
    </div>
  );
};

export default OrderHistory;
