import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { toast } from "react-toastify";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../../css/DeliveryStaffTransport.css'
import '../../css/DeliveryStaffLog.css'
import { AddTransportLog, GetTransportByDeliveryStaffId } from '../api/TransportApi';
import LoadingScreen from "../../utils/LoadingScreen";
import { Divider } from "primereact/divider";

export default function LogPage({ userData }) {
  const [transport, setTransport] = useState();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    time: new Date,
    location: "",
    transportId: "",
    customerId: "",
  });
  // Geolocation API 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(response => response.json())
            .then(data => {console.log('Address:', data.display_name);
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

  const handleSubmit = async() => {
    // Add form submission logic here
    console.log("Form Data:", formData);
    const response = await AddTransportLog(formData)
    if(response.status < 400){
      toast.success("Log Added!")
    }
    else if(response.status > 400){
      toast.error("Error: ", response.status)
    }
  };

  // Pagingation
  const [first, setFirst] = useState(0); // Track the first row for controlled pagination
  const [rows, setRows] = useState(5); // Number of rows per page
  const onPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
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
                id="time"
                value={formData.time}
                onChange={handleDateChange}
                showTime
                showSeconds
                showIcon
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
              label="Submit"
              className="p-button-info mt-3"
              onClick={handleSubmit}
            />
          </div>
        </Card>
        <Divider />
        <DataTable
          selectionMode="single" selection={order}
          onSelectionChange={(e) => setOrder(e.value)} dataKey="orderId"
          scrollable
          resizableColumns
          paginator
          rows={rows}
          first={first}
          onPage={onPage}
          value={transport} tableStyle={{ minWidth: '50rem' }}>
          <Column
            header="Customer ID"
            field="customerId"
            frozen
          >
          </Column>
          <Column field="orderId" sortable header="Order Id"></Column>
          <Column field="senderAddress" header="From"></Column>
          <Column field="recipientAddress" header="To"></Column>
          <Column field="createdAt" sortable header="Date Added"></Column>
        </DataTable>
      </div>
    </>
  )
}
