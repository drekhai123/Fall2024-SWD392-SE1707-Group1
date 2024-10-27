import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; // Import Button từ MUI

import '../../css/OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'orderDates', headerName: 'Order Dates', width: 150 },
    { field: 'deliveryPrice', headerName: 'Delivery Price', width: 150 },
    {
      field: 'dateShipmentArrived',
      headerName: 'Date Shipment Arrived',
      width: 200,
    },
    {
      field: 'orderStatus',
      headerName: 'Order Status',
      width: 150,
    },
    {
      field: 'feedback',
      headerName: 'Feedback',
      width: 150,
      renderCell: (params) => (
        params.row.feedback ? (
          <span>{params.row.feedback}</span>
        ) : (
          params.row.orderStatus === 'Delivered' ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/feedback/${params.row.id}`)}
            >
              Feedback
            </Button>
          ) : null
        )
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  const fakeData = [
    {
      id: '734538957343',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '12/10/2025',
      orderStatus: 'Delivered',
      feedback: 'Great service!',
    },
    {
      id: '157684956738',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Cancel',
      feedback: '',
    },
    {
      id: '748395647385',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Cancel',
      feedback: '',
    },
    {
      id: '458496847564',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Delivered',
      feedback: 'Very satisfied!',
    },
    {
      id: '564758694657',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Delivered',
      feedback: '',
    },
  ];

  return (
    <div className='order-history-page-container'>
      <p className='order-history-title'>Your Order History</p>
      <div className='list-order-container'>
        <DataGrid
          rows={fakeData}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
};

export default OrderHistoryPage;
