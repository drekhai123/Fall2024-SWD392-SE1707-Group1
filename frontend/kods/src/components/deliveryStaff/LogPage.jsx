import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { toast } from "react-toastify";
import '../../css/CustomDataTable.css'
import '../../css/DeliveryStaffLog.css'
import { AddTransportLog, GetTransportByDeliveryStaffId } from '../api/TransportApi';
import LoadingScreen from "../../utils/LoadingScreen";
import { Divider } from "primereact/divider";
import { styled } from "@mui/material";

export default function LogPage({ userData, selectOrder }) {
  const [transport, setTransport] = useState();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const [formData, setFormData] = useState({
    time: new Date,
    location: "",
    transportId: "",
    customerId: "",
  });

  const BoldHeaderDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      fontSize: '1.3rem',
    },
    '& .MuiDataGrid-row': {
      fontSize: '1rem',

    }
  });

  const columns = [
    { field: 'orderId', headerName: 'Order ID', headerClassName: 'bold-header', width: 150 },
    { field: 'senderAddress', headerName: 'From', headerClassName: 'bold-header', width: 200 },
    { field: 'recipientAddress', headerName: 'To', headerClassName: 'bold-header', width: 200 },
    { field: 'createdAt', headerName: 'Date Added', headerClassName: 'bold-header', width: 150 },
  ];
  const handleRowSelection = (newSelection) => {
    const selectedRow = transport.find((row) => row.orderId === newSelection.id);
    setOrder(selectedRow);
  };
  // Geolocation API 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(response => response.json())
            .then(data => {
              if (order !== null) {
                setFormData({
                  location: data.display_name,
                  customerId: order.customerId,
                  orderId: order.orderId,
                  time: new Date,
                  transportId: order.transportId,
                })
              }else if(selectOrder!=null){
                setFormData({
                  location: data.display_name,
                  time: new Date,
                  transportId: selectOrder.transportId,
                  customerId: selectOrder.customerId,
                  orderId: selectOrder.orderId
                })
              }else{
                setFormData({ 
                  time: new Date,
                  location: "",
                  transportId: "",
                  customerId: "",})
              }
            })
            .catch(error => console.error('Error:', error));
        },
        (err) => {
          toast.error(err)
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, [order]);

  useEffect(() => {
    const getTransport = async () => {
      setLoading(true)
      if (userData !== null) {
        const response = await GetTransportByDeliveryStaffId(userData.deliveryStaff.staffId);
        if (response.status === 200) {
          setTransport(response.data.orders)
          if (transport === null) {
            toast.info("There Are No Transport For Today", { autoClose: 2000 }); // Show toast for 2 seconds
            setTransport([])
          }
        } else {
          toast.error("Error Getting transport, Plz refresh the page or Login again!", { autoClose: 2000 }); // Show toast for 2 seconds
          console.log("Error fetching transport:", response);
        }
      }
      setLoading(false)
    }
    getTransport()
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Add form submission logic here
    const response = await AddTransportLog(formData)
    if (response.status === 201 ) {
      toast.success("Log Added!")
    }
    else if (response.status > 400) {
      toast.error("Error: ", response.status)
    }
    setLoading(false);
  };

  // Pagingation
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  //

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="create-entry-form">
        <Card title="Add Transport Log" className="p-shadow-5" style={{ width: "100%" }}>
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="time">Time</label>
              <Calendar
                disabled
                id="time"
                value={formData.time}
                showTime
                showSeconds
                placeholder="Select time"
              />
            </div>
            <div className="p-field">
              <label htmlFor="location">Location</label>
              <InputText
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                style={{ width: "100%", padding: "10px" }}
              />
            </div>
            <div className="p-field">
              <label htmlFor="orderId">Order ID</label>
              <InputNumber
                id="orderId"
                name="orderId"
                value={formData.orderId}
                placeholder="Enter Order ID"
                style={{ width: "100%", padding: "10px" }}
                disabled
              />
            </div>

            <div className="p-field">
              <label htmlFor="customerId">Customer ID</label>
              <InputNumber
                id="customerId"
                name="customerId"
                value={formData.customerId}
                placeholder="Enter Customer ID"
                style={{ width: "100%", padding: "10px" }}
                disabled
              />
            </div>
            <Button
              disabled={order ? false : true}
              label="Submit"
              className="p-button-info mt-3"
              onClick={handleSubmit}
            />
          </div>
        </Card>
        <Divider />
        <div style={{ height: 400, width: '100%', margin: '0 auto' }}>
          <BoldHeaderDataGrid
            rows={transport}
            columns={columns}
            getRowId={(row) => row.orderId} // `orderId` is unique for each row
            pageSize={pageSize}
            pagination
            page={page}
            checkboxSelection={false}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onRowClick={(newSelection) => handleRowSelection(newSelection)}
          />
        </div>
      </div>
    </>
  )
}
