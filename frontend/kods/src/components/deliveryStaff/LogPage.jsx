import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../../css/CustomDataTable.css'
import '../../css/DeliveryStaffLog.css'
import { AddTransportLog, GetTransportByDeliveryStaffId } from '../api/TransportApi';
import LoadingScreen from "../../utils/LoadingScreen";
import { Divider } from "primereact/divider";

export default function LogPage({ userData }) {
  const [transport, setTransport] = useState();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const columns = [
    { field: 'customerId', headerName: 'Customer ID', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'orderId', headerName: 'Order ID', width: 150, sortable: true, align: 'center', headerAlign: 'center' },
    { field: 'senderAddress', headerName: 'From', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'recipientAddress', headerName: 'To', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'createdAt', headerName: 'Date Added', width: 180, sortable: true, align: 'center', headerAlign: 'center' },
  ];
  const [formData, setFormData] = useState({
    time: new Date,
    location: "",
    transportId: "",
    customerId: "",
  });
  const handleRowSelection = (newSelection) => {
    const selectedRow = transport.find((row) => row.orderId === newSelection.id);
    console.log(selectedRow)
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
              console.log('Address:', data.display_name);
              setFormData({
                ...formData,
                location: data.display_name
              });
              if (order !== null) {
                setFormData({
                  ...formData,
                  time: new Date,
                  transportId: order.transportId,
                  customerId: order.customerId,
                })
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

  const handleDateChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      time: e.value,
    }));
  };

  const handleSubmit = async () => {
    // Add form submission logic here
    console.log("Form Data:", formData);
    const response = await AddTransportLog(formData)
    if (response.status === 201) {
      toast.success("Log Added!")
    }
    else if (response.status > 400) {
      toast.error("Error: ", response.status)
    }
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
                onChange={handleDateChange}
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
              <label htmlFor="transportId">Transport ID</label>
              <InputNumber
                id="transportId"
                name="transportId"
                value={formData.transportId}
                onChange={(e) => setFormData((prevData) => ({ ...prevData, transportId: e.value }))}
                placeholder="Enter Transport ID"
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
                onChange={(e) => setFormData((prevData) => ({ ...prevData, customerId: e.value }))}
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
        <div style={{ height: 400, width: '100%', margin: '0 auto'}}>
          <DataGrid
            rows={transport}
            columns={columns}
            getRowId={(row) => row.orderId} // `orderId` is unique for each row
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onRowClick={(e) => handleRowSelection(e)}
            checkboxSelection={false}
            disableColumnMenu
          />
        </div>
      </div>
    </>
  )
}
