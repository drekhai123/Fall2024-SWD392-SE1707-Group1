/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from "react";
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";

import '../../css/OrderHistoryPage.css';
import {getJwtToken} from "../api/Url";

const OrderHistoryPage = () => {
  const columns = [
    { field: 'orderId', headerName: 'Order ID', width: 150 },
    { field: 'senderName', headerName: 'Sender name', width: 250 },
    { field: 'recipientName', headerName: 'Recipient name', width: 250 },
    {
      field: 'totalWeight',
      headerName: 'Total weight',
      width: 150,
    },
    {
      field: 'totalCost',
      headerName: 'Total cost',
      width: 150,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
    },
    {
      field: 'distance',
      headerName: 'Distance',
      width: 150,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 150,
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      width: 150,
    },
    {
      field: 'deliveryStatus',
      headerName: 'Delivery Status',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleViewOrder(params.row)}
          className="view-all-button"
        >
          Xem tất cả
        </button>
      ),
    },
  ];
  const token = getJwtToken();
  const userLogin = JSON.parse(sessionStorage.getItem("user"))
  const [listOrder, setListOrder] = useState([]);
  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    getOrderByCustomer();
  }, []);

  const getOrderByCustomer = useCallback(async () => {
    try {
      const list = await axios.get(
        `https://kdosdreapiservice.azurewebsites.net/api/Orders/customer/${userLogin?.customer?.customerId}`, {
        headers: {

          'Authorization': `Bearer ${token}`
        }
      }
      );
      setListOrder(list?.data);
    } catch (error) {
      console.error("Error fetching distance data:", error);
    }
  }, []);

  const handleViewOrder = (order) => {
    
  };

  
  return (
    <div className='order-history-page-container'>
      <p className='order-history-title'>Your Order History</p>
      <div className='list-order-container'>
        <DataGrid
          rows={listOrder}
          columns={columns}
          getRowId={(row) => row.orderId}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
};

export default OrderHistoryPage;
