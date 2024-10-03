import { DataGrid } from '@mui/x-data-grid';

import '../../css/OrderHistoryPage.css';

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
];

const OrderHistoryPage = () => {
  const paginationModel = { page: 0, pageSize: 5 };
  const fakeData = [
    {
      id: '734538957343',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '12/10/2025',
      orderStatus: 'Deliveried',
    },
    {
      id: '157684956738',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Cancel',
    },
    {
      id: '748395647385',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Deliveried',
    },
    {
      id: '458496847564',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Deliveried',
    },
    {
      id: '564758694657',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Deliveried',
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
