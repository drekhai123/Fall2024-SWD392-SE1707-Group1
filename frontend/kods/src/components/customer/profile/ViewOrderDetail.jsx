import React, { useState, useEffect } from 'react';
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
  Rating,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getOrderbyOrderId, getOrderDetailsByOrderId, updateDeliveryStatus, deleteOrderDetailsById } from '../../api/OrdersApi'; // Import the API function
import { addFeedback } from '../../api/FeedbackApi'; // Import the API function
import { getFeedbackByOrderId, deleteFeedback } from '../../api/FeedbackApi'; // Import the delete API function
import '../../../css/ViewOrderDetail.css'; // Import the new CSS file
import { Star, StarBorder } from '@mui/icons-material'; // Import star icons
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import {fetchLogTransportByCustomerId } from '../../api/TranslogApi'; // Import the new function

// Define an enum-like object for order statuses
const deliveryStatus = {
  PENDING: 'PENDING',
  DELIVERED: 'DELIVERED',
  PROCESSING: 'PROCESSING',
  CANCELLED: 'CANCELLED',
  // Add other statuses as needed
};

function getStatusColor(status) {
  switch (status) {
    case 'PENDING':
      return 'orange';
    case 'DELIVERED':
      return 'green';
    case 'PROCESSING':
      return 'blue';
    case 'CANCELLED':
      return 'red';
    case 'HEALTHY':
      return 'green';
    case 'UNHEALTHY':
      return 'yellow';
    case 'SICK':
      return 'orange';
    case 'DECEASED':
      return 'red';
    default:
      return 'black';
  }
}

function formatDateTime(date) {
  return new Date(date).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Bangkok'
  });
}

export default function OrderDetail({ onBack }) {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState(null); // State to hold general order details
  const [orderDetailById, setOrderDetailById] = useState(null); // State to hold order details by ID
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submittedFeedback, setSubmittedFeedback] = useState(null); // Add this line
  const [feedbackData, setFeedbackData] = useState(null); // State to hold feedback data
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const [transportLogs, setTransportLogs] = useState([]);

  useEffect(() => {
    async function fetchOrderDetail() {
      try {
        const order = await getOrderbyOrderId(orderId);
        setOrderDetail(order);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    }

    async function fetchOrderDetailByOrderId() {
      try {
        const orderbyId = await getOrderDetailsByOrderId(orderId);
        setOrderDetailById(orderbyId);
      } catch (error) {
        console.error('Error fetching order details by ID:', error);
      }
    }

    async function fetchFeedback() {
      try {
        const feedback = await getFeedbackByOrderId(orderId);
        setFeedbackData(feedback);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    }

    fetchOrderDetail();
    fetchOrderDetailByOrderId();
    fetchFeedback();
  }, [orderId]);

  useEffect(() => {
    if (orderDetail) {
      async function fetchTransportLogs() {
        try {
          const logs = await fetchLogTransportByCustomerId(orderDetail.customerId);
          const filteredLogs = logs.filter(log =>
            log.transport.orders.some(order => order.orderId === orderDetail.orderId)
          );
          setTransportLogs(filteredLogs);
        } catch (error) {
          console.error('Error fetching transport logs:', error);
        }
      }

      fetchTransportLogs();
    }
  }, [orderDetail]);

  const handleDeleteFeedback = async () => {
    try {
      if (feedbackData && feedbackData.feedbackId) {
        await deleteFeedback(feedbackData.feedbackId);
        console.log(`Feedback with ID ${feedbackData.feedbackId} deleted successfully.`);
        setFeedbackData(null);
        setFeedback('');
        setRating(0);
      } else {
        console.log('No feedback to delete.');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      const plainTextComment = feedback.replace(/<[^>]+>/g, '');

      const feedbackData = {
        comment: plainTextComment,
        rating,
        orderId: parseInt(orderId, 10),
        customerId: orderDetail.customerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('Submitting feedback with data:', feedbackData);

      const response = await addFeedback(feedbackData);

      setSubmittedFeedback(response);

      console.log('Feedback submitted successfully:', response);

      window.location.reload();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleViewAllStatus = (healthStatus) => {
    setSelectedStatuses(healthStatus);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteAndUpdateStatus = async (detail) => {
    try {

      // First, delete the fish order details
      const orderDetailsId = orderDetailById[0]?.orderDetailsId;

      if (orderDetailsId) {
        try {
          await deleteOrderDetailsById(orderDetailsId);
          console.log(`Order detail with ID ${orderDetailsId} deleted successfully.`);
        } catch (error) {
          console.error('Error deleting order detail:', error);
        }
      } else {
        console.error('OrderDetailsId not found');
      }

      // Then, update the delivery status
      await updateDeliveryStatus(detail.orderId, deliveryStatus.CANCELLED);
      console.log('Order status updated to CANCELLED');
      toast.success('Order cancelled successfully!');
      navigate(`/profile/ViewOrderHistory/${detail.orderId}`);
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Failed to process order. Please try again.');
    }
  };

  if (!orderDetail) {
    return <Typography variant="h6">Order not found</Typography>;
  }

  return (
    <div className="full-page-background">
      <ToastContainer />
      <div className="order-detail-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/profile/ViewOrderHistory')}
          >
            Go Back
          </Button>
          {orderDetail.deliveryStatus === 'PENDING' && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenDialog}
            >
              Cancel Order
            </Button>
          )}
        </div>

        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <DialogTitle id="confirm-dialog-title">Confirm Cancellation</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              Are you sure you want to cancel this order?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              No
            </Button>
            <Button onClick={() => handleDeleteAndUpdateStatus(orderDetail)} color="secondary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h4" gutterBottom>
          Order Details {orderDetail.code}
        </Typography>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
            <Paper style={{ padding: '20px', flex: 1, border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h6" gutterBottom><strong>Sender Information</strong></Typography>
              <Typography><strong>Name:</strong> {orderDetail.senderName}</Typography>
              <Typography><strong>Address:</strong> {orderDetail.senderAddress}</Typography>
              <Typography><strong>Phone:</strong> {orderDetail.senderPhoneNumber}</Typography>
              <Typography>
                <strong>Order Created: </strong>
                {formatDateTime(orderDetail.createdAt)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
            <Paper style={{ padding: '20px', flex: 1, border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h6" gutterBottom><strong>Receiver Information</strong></Typography>
              <Typography><strong>Name:</strong> {orderDetail.recipientName}</Typography>
              <Typography><strong>Address:</strong> {orderDetail.recipientAddress}</Typography>
              <Typography><strong>Email:</strong> {orderDetail.recipientEmail}</Typography>
              <Typography><strong>Phone:</strong> {orderDetail.recipientPhoneNumber}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom><strong>Order Information</strong></Typography>
              <Typography><strong>Payment Method:</strong> {orderDetail.paymentMethod}</Typography>
              <Typography>
                <strong>Payment Status:</strong>
                <span style={{ color: getStatusColor(orderDetail.paymentStatus) }}>
                  <strong>{orderDetail.paymentStatus}</strong>
                </span>
              </Typography>
              <Typography>
                <strong>Delivery Status:</strong>
                <span style={{ color: getStatusColor(orderDetail.deliveryStatus) }}>
                  <strong>{orderDetail.deliveryStatus}</strong>
                </span>
              </Typography>
              <Typography><strong>Total Weight:</strong> {orderDetail.totalWeight} kg</Typography>
              <Typography><strong>Total Cost:</strong> {orderDetail.totalCost.toLocaleString('vi-VN')} VND</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Location</strong></TableCell>
                    <TableCell><strong>Time</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transportLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.location}</TableCell>
                      <TableCell>{formatDateTime(log.time)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Fish Name</strong></TableCell>
                    <TableCell><strong>Health Status</strong></TableCell>
                    <TableCell><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetailById && orderDetailById.map((item) => (
                    <TableRow key={item.fishProfileId}>
                      <TableCell>{item.fishProfile.name}</TableCell>
                      <TableCell>
                        {item.healthStatus.length > 0 ? (
                          (() => {
                            const latestStatus = item.healthStatus[item.healthStatus.length - 1];
                            const formattedDate = formatDateTime(latestStatus.date);
                            return (
                              <div>
                                {formattedDate}:
                                <span style={{ color: getStatusColor(latestStatus.status) }}>
                                  {latestStatus.status}
                                </span>
                              </div>
                            );
                          })()
                        ) : (
                          <div>No health status available</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewAllStatus(item.healthStatus)}
                        >
                          View All Status
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {orderDetail.deliveryStatus === 'DELIVERED' && (
            <Grid item xs={12}>
              <Paper style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom><strong>Feedback and Rating</strong></Typography>
                {feedbackData ? (
                  <div>
                    <Typography><strong>Comment: </strong> {feedbackData.comment}</Typography>
                    <div style={{ marginBottom: '20px' }}>
                      <Rating
                        name="read-only"
                        value={feedbackData.rating}
                        readOnly
                        icon={<Star fontSize="large" />}
                        emptyIcon={<StarBorder fontSize="large" />}
                      />
                    </div>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDeleteFeedback}
                    >
                      Delete Feedback
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(event, newValue) => setRating(newValue)}
                      style={{ marginBottom: '20px' }}
                      icon={<Star fontSize="large" />}
                      emptyIcon={<StarBorder fontSize="large" />}
                    />
                    <ReactQuill
                      value={feedback}
                      onChange={(content) => setFeedback(content)}
                      style={{ height: '150px', marginBottom: '20px' }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: '20px' }}
                      onClick={handleFeedbackSubmit}
                    >
                      Submit Feedback
                    </Button>
                  </div>
                )}
              </Paper>
            </Grid>
          )}
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Paper
            style={{
              padding: '20px',
              margin: '20px auto',
              maxWidth: '1500px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Typography variant="h6" id="modal-title">All Health Statuses</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Temperature</TableCell>
                    <TableCell>Oxygen</TableCell>
                    <TableCell>phLevel</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedStatuses.length > 0 ? (
                    selectedStatuses.map((status, index) => {
                      const formattedDate = formatDateTime(status.date);
                      return (
                        <TableRow key={index}>
                          <TableCell>{formattedDate}</TableCell>
                          <TableCell><strong><span style={{ color: getStatusColor(status.status) }}>
                              {status.status}
                            </span></strong>
                          </TableCell>
                          <TableCell>{status.temperature}</TableCell>
                          <TableCell>{status.oxygenLevel}</TableCell>
                          <TableCell>{status.phLevel}</TableCell>
                          <TableCell>{status.notes}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6}>No health status available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={handleClose} variant="contained" color="secondary" style={{ marginTop: '20px' }}>
              Close
            </Button>
          </Paper>
        </Modal>
      </div>
    </div>
  );
}
