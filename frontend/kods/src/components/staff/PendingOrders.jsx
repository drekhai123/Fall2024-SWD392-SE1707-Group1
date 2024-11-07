import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AddTransport } from "./AddTransport";
import { baseUrl, headers, getJwtToken } from "../api/Url";
import { GetAllOrders, getOrderbyOrderId } from "../api/OrdersApi";
import { GetAllTransports } from "../api/TransportApi";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Message } from "primereact/message";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

export function PendingOrders() {
  const [orders, setOrders] = useState([]);
  const [isAddTransport, setIsAddTransport] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
    axios.put(`${baseUrl}/Orders/${order.orderId}/status`, updatedOrder, {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Update order status success!', life: 3000 });

        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.orderId === order.orderId
              ? { ...o, deliveryStatus: "PROCESSING", confirmed: true }
              : o
          )
        );

        closeOrdersModal();
        fetchOrders();
      })
      .catch((err) => {
        setError("Update order failed: " + err);
      });
  };

  const handleAddTransport = (order) => {
    setSelectedOrder(order);
    setIsTransportDialogVisible(true);
  };

  function displayOrders(orderId) {
    getOrderbyOrderId(orderId)
      .then(response => {
        setSelectedOrders(response);
        setIsOrdersVisible(true);
      })
      .catch(err => {
        console.error("Error fetching order details:", err);
      });
  }

  const closeOrdersModal = () => {
    setIsOrdersVisible(false);
    setSelectedOrders(null);
  };

  const closeTransportModal = () => {
    setIsTransportDialogVisible(false);
    setSelectedOrder(null);
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return new Date(date).toLocaleString('en-GB', options).replace(',', ''); // Format to DD/mm/YYYY hh:mm:ss
  };

  // Fetch transports from the API
  const fetchTransports = async () => {
    try {
      const response = await GetAllTransports();
      setTransports(response.data || []); // Assuming response.data contains the transport array
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
          {currentItems.map((transport) => (
            <div key={transport.transportId} className="card">
              <h3>Transport ID: {transport.transportId}</h3>
              <p>Status: {transport.status === 'FREE' ? 'Free' : 'Not Free'}</p>
              <p>Delivery Staff Name: {transport.deliveryStaff.staffName}</p>
              <p>Healthcare Staff Name: {transport.healthCareStaff.staffName}</p>
              <p>Staff Name: {transport.staff.staffName}</p>
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

            <Button
              label="Confirm Delivery"
              icon="pi pi-check"
              severity="success"
              className="mt-4" // Add margin-top for spacing
              onClick={() => updateOrderStatus(selectedOrders)} // Call the update function with selected order
              disabled={selectedOrders.deliveryStatus !== "PENDING"} // Disable if not pending
            />
          </div>
        )}
      </Dialog>
    </div>
  );
}
