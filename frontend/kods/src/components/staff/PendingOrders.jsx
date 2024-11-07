import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl, headers, getJwtToken } from "../api/Url";
import { GetAllOrders, getOrderbyOrderId } from "../api/OrdersApi";
import { GetAllTransports } from "../api/TransportApi";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Message } from "primereact/message";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import '../../css/PendingOrders.css';

export function PendingOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const token = getJwtToken();
  const [isOrdersVisible, setIsOrdersVisible] = useState(false);
  const [isTransportDialogVisible, setIsTransportDialogVisible] = useState(false);
  const toast = useRef(null);
  const [transports, setTransports] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [selectedTransportId, setSelectedTransportId] = useState(null);
  const [transportStatus, setTransportStatus] = useState(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await GetAllOrders();
      setOrders(
        response.data.filter((data) => data.deliveryStatus === "PENDING")
      );
    } catch (err) {
      console.error(err);
      setError("Error fetching orders data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = (order) => {
    const updatedOrder = { deliveryStatus: "PROCESSING", updateAt: Date.now() };
    axios.patch(`${baseUrl}/Orders/OrderStatus/${order.orderId}`, updatedOrder, {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Update order status success!', life: 3000 });
        closeOrdersModal();
        fetchOrders(); // Refresh orders
      })
      .catch((err) => {
        setError("Update order failed: " + err);
      });
  };

  const handleAddTransport = (order) => {
    setSelectedOrders(order);
    setIsTransportDialogVisible(true);
  };

  const displayOrders = (orderId) => {
    getOrderbyOrderId(orderId)
      .then(response => {
        setSelectedOrders(response);
        setIsOrdersVisible(true);
      })
      .catch(err => {
        console.error("Error fetching order details:", err);
      });
  };

  const closeOrdersModal = () => {
    setIsOrdersVisible(false);
    setSelectedOrders(null);
  };

  const closeTransportModal = () => {
    setIsTransportDialogVisible(false);
    setSelectedOrders(null);
    setSelectedTransportId(null); // Reset selected transport ID
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return new Date(date).toLocaleString('en-GB', options).replace(',', ''); // Format to DD/mm/YYYY hh:mm:ss
  };

  // Fetch transports from the API
  const fetchTransports = async () => {
    try {
      const response = await GetAllTransports();
      setTransports(response || []); // Assuming response.data contains the transport array

      // Set transport status based on available transports
      if (response && response.length > 0) {
        const freeTransport = response.find(transport => transport.status === 'FREE');
        setTransportStatus(freeTransport ? 'FREE' : 'DELIVERING'); // Set status based on available transport
      } else {
        setTransportStatus('DELIVERING'); // If no transports are available, set to DELIVERING
      }
    } catch (error) {
      console.error("Error fetching transports:", error);
      setTransports([]); // Fallback to empty array on error;
    }
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  // Calculate the current items to display
  const currentItems = (transports || []).slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle transport selection
  const handleTransportSelect = (transportId) => {
    setSelectedTransportId(transportId);
  };

  // Function to update the order with the selected transport ID
  const updateOrderWithTransport = async (transportId) => {
    try {
      const orderId = selectedOrders.orderId; // Replace with your actual order ID
      const updatedOrder = { transportId }; // Create an object with the transport ID

      await axios.patch(`${baseUrl}/Orders/Transport/${orderId}`, updatedOrder, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });

      // Show success message
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Transport updated successfully!', life: 3000 });
      fetchOrders();
      // Close the transport dialog
      closeTransportModal(); // Close the transport dialog after updating
    } catch (error) {
      console.error("Error updating order:", error);
      setError("Error updating order with transport."); // Set error message if update fails
    }
  };

  // Function to handle confirm button click
  const handleConfirmClick = () => {
    console.log("Selected Order:", selectedOrders); // Log the selected order
    if (selectedOrders && selectedOrders.transportId !== null && selectedOrders.transportId !== 0) {
      updateOrderStatus(selectedOrders);
    } else {
      alert("Please select a valid transport before confirming.");
    }
  };

  return (
    <div>
      {isLoading && <p>Loading orders...</p>}
      <Toast ref={toast} />
      <DataTable
        value={orders}
        showGridlines
        stripedRows
        paginator
        rows={5}
        style={{ width: '100%' }} // Set width to 100%
      >
        <Column field="orderId" header="Order Id" />
        <Column field="senderName" header="Customer" />
        <Column
          field="createdAt"
          header="Date"
          body={(rowData) => formatDate(rowData.createdAt)} // Use body to format the date
        />
        <Column field="deliveryStatus" header="Status" />
        <Column
          field="totalCost"
          header="Total Cost"
          body={(rowData) => {
            return `${rowData.totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND`; // Format totalCost with commas and append "VND"
          }}
        />
        <Column
          field="totalWeight"
          header="Total Weight"
          body={(rowData) => {
            return `${rowData.totalWeight.toString()} kg`; // Format totalWeight with commas and append "kg"
          }}
        />
        <Column field="transportId" header="Transport Id" />
        <Column
          header="Add Transport"
          body={(rowData) => {
            return (
              <Button
                label="Transport"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={() => handleAddTransport(rowData)}
              ></Button>
            );
          }}
        ></Column>
        <Column
          header="Delivery Information"
          body={(rowData) => {
            return (
              <Button
                label="Delivery Information"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={() => displayOrders(rowData.orderId)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>

      <Dialog header="Transport Details" visible={isTransportDialogVisible} onHide={closeTransportModal}>
        <div className="card-container">
          {currentItems.length === 0
            ? <p>No transports available</p>
            : currentItems
              .filter(transport => transport.status === 'FREE') // Filter out transports that are not FREE
              .map((transport) => (
                <div
                  key={transport.transportId}
                  className="card"
                  onClick={() => handleTransportSelect(transport.transportId)} // Add click handler
                  style={{ backgroundColor: selectedTransportId === transport.transportId ? '#cf8235' : 'white' }} // Highlight selected card
                >
                  <h3><strong>Transport ID:</strong> {transport.transportId}</h3>
                  <p style={{ color: 'green' }}>
                    <strong>Status:</strong> FREE
                  </p>
                  <p><strong>Delivery Staff Name:</strong> {transport.deliveryStaff.staffName}</p>
                  <p><strong>Healthcare Staff Name:</strong> {transport.healthCareStaff.staffName}</p>
                  <p><strong>Staff Name:</strong> {transport.staff.staffName}</p>
                </div>
              ))}
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(transports.length / itemsPerPage) }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index)} disabled={index === currentPage}>
              {index + 1}
            </button>
          ))}
        </div>
        {/* Confirm Button */}
        <Button
          label="Confirm Transport"
          severity="info"
          className="text-black !bg-cyan-500 border border-black p-2"
          onClick={() => updateOrderWithTransport(selectedTransportId)} // Call the update function with selected transport ID
          disabled={!selectedTransportId} // Disable if transport not chosen
        ></Button>
      </Dialog>

      {error && (
        <Message severity="error" text={error} />
      )}

      <Dialog header="Order Details" visible={isOrdersVisible} onHide={closeOrdersModal}>
        {selectedOrders && (
          <div>
            <p><strong>Order ID:</strong> {selectedOrders.orderId}</p>
            <p><strong>Sender Name:</strong> {selectedOrders.senderName}</p>
            <p><strong>Created At:</strong> {formatDate(selectedOrders.createdAt)}</p>
            <p><strong>Sender Address:</strong> {selectedOrders.senderAddress}</p>
            <p><strong>Recipient Name:</strong> {selectedOrders.recipientName}</p>
            <p><strong>Recipient Phone:</strong> {selectedOrders.recipientPhoneNumber}</p>
            <p><strong>Recipient Address:</strong> {selectedOrders.recipientAddress}</p>
            <p><strong>Recipient Email:</strong> {selectedOrders.recipientEmail}</p>
            <p><strong>Payment Method:</strong> {selectedOrders.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {selectedOrders.paymentStatus}</p>
            <p><strong>Delivery Status:</strong> {selectedOrders.deliveryStatus}</p>
            <p><strong>Total Cost:</strong> {selectedOrders.totalCost} VND</p>
            <p><strong>Total Weight:</strong> {selectedOrders.totalWeight} kg</p>

            <Button
              label="Confirm Delivery"
              icon="pi pi-check"
              severity="success"
              className="mt-4" // Add margin-top for spacing
              onClick={handleConfirmClick} // Call the update function with selected order
              disabled={selectedOrders.transportId === 0} // Disable if transportId is 0
            />
          </div>
        )}
      </Dialog>
    </div>
  );
}
