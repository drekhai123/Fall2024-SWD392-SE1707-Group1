// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Select,
//   MenuItem
// } from '@mui/material';
// import { useParams, Link } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// export default function ViewOrderDetail() {
//   const { id } = useParams();
//   const orderId = parseInt(id, 10);

//   const [orderDetails, setOrderDetails] = useState(null);

//   useEffect(() => {
//     // Fetch order details from an API or state management store
//     // Example: fetchOrderDetails(orderId).then(data => setOrderDetails(data));
//   }, [orderId]);

//   const allTimes = orderDetails ? [...new Set(orderDetails.items.flatMap(item => item.fishStatus.map(status => status.time)))] : [];
//   const [selectedDate, setSelectedDate] = useState(allTimes[0]);

//   const [review, setReview] = useState('');
//   const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

//   useEffect(() => {
//     if (orderDetails) {
//       setReview(orderDetails.review || '');
//       setIsReviewSubmitted(!!orderDetails.review);
//     }
//   }, [orderDetails]);

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const handleReviewChange = (content) => {
//     setReview(content);
//   };

//   const handleSubmitReview = () => {
//     setIsReviewSubmitted(true);
//     // Update the review in the database or state management store
//     // Example: updateOrderReview(orderId, review);
//   };

//   if (!orderDetails) {
//     return <Typography variant="h6">Loading...</Typography>;
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Button component={Link} to="/orders" variant="outlined" sx={{ mb: 1 }}>
//         Back to Order History
//       </Button>
//       <Typography variant="h4" gutterBottom>
//         Order Details - Order #{orderDetails.id}
//       </Typography>
//       <Paper sx={{ p: 3 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6">Order Information</Typography>
//             <Box>
//               <Typography>Date: {orderDetails.date}</Typography>
//               <Typography>Status: {orderDetails.status}</Typography>
//               <Typography>Total: ${orderDetails.total.toFixed(2)}</Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6">Shipping Address</Typography>
//             <Typography>{orderDetails.shippingAddress}</Typography>
//           </Grid>
//         </Grid>
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6" gutterBottom>
//             Order Items
//           </Typography>
//           <Select
//             value={selectedDate}
//             onChange={handleDateChange}
//             displayEmpty
//             sx={{ mb: 2 }}
//           >
//             {allTimes.map((time, index) => (
//               <MenuItem key={index} value={time}>
//                 {time}
//               </MenuItem>
//             ))}
//           </Select>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Fish</TableCell>
//                   <TableCell align="right">Fish Status</TableCell>
//                   <TableCell align="right">Price</TableCell>
//                   <TableCell align="right">Total</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {orderDetails.items.map((item) => (
//                   <TableRow key={item.id}>
//                     <TableCell>{item.name}</TableCell>
//                     <TableCell align="right">
//                       {item.fishStatus.find(status => status.time === selectedDate)?.status || 'N/A'}
//                     </TableCell>
//                     <TableCell align="right">${item.price.toFixed(2)}</TableCell>
//                     <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
//                   </TableRow>
//                 ))}
//                 <TableRow>
//                   <TableCell colSpan={3} align="right"><strong>Total</strong></TableCell>
//                   <TableCell align="right"><strong>${orderDetails.total.toFixed(2)}</strong></TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Paper>

//       <Paper sx={{ p: 3, mt: 4 }}>
//         <Typography variant="h5" gutterBottom>
//           Order Review
//         </Typography>
//         {isReviewSubmitted ? (
//           <div>
//             <Typography variant="h6" gutterBottom>
//               Your Review:
//             </Typography>
//             <div dangerouslySetInnerHTML={{ __html: review }} />
//           </div>
//         ) : (
//           <div>
//             <ReactQuill
//               theme="snow"
//               value={review}
//               onChange={handleReviewChange}
//               style={{ height: '200px', marginBottom: '50px' }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmitReview}
//               sx={{ mt: 2 }}
//             >
//               Submit Review
//             </Button>
//           </div>
//         )}
//       </Paper>
//     </Container>
//   );
// }