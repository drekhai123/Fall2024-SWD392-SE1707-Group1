import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { ListOrders } from "./ListOrders";
import { CreateTransportDialog } from "./CreateTransportDialog";
import { Button } from "primereact/button";
import ConfirmationModal from "./ConfirmationModal";

import axios from "axios";
import { baseUrl, headers, getJwtToken } from "../api/Url";
import { toast } from "react-toastify";

export function Transports() {
  const token = getJwtToken();
  const [transports, setTransports] = useState([])
  const [selectedTransport, setSelectedTransport] = useState()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isOpenTransport, setIsOpenTransport] = useState(false)
  const [deliveryStatus, setDeliveryStatus] = useState({});
  const [orders, setOrders] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);

  useEffect(() => {
    const fetchTransport = async () => {
      const transportResponse = await axios.get(`${baseUrl}/Transport`, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      })
      setTransports(transportResponse.data.filter(transport => transport.transportId !== 0));
    }
    fetchTransport();
  }, []);

  const buttonCreaeTransport = () => (
    <Button
      label="Create Transport"
      severity="info"
      className="text-black !bg-cyan-500 border border-black p-2"
      onClick={() => setShowConfirmDialog(true)}
    />
  )

  const updateTransportStatus = async (transportId) => {
    console.log(`Attempting to update transport status for ID: ${transportId}`);
    try {
      const response = await axios.patch(`${baseUrl}/Transport/Status/${transportId}`, {
        status: "DELIVERING"
      }, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Transport status updated successfully:`, response.data);

      // Refresh the transport list after updating
      const transportResponse = await axios.get(`${baseUrl}/Transport`, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });
      setTransports(transportResponse.data.filter(transport => transport.transportId !== 0));
    } catch (error) {
      console.error("Error updating transport status:", error);
    }
  };

  const handleOrdersFetched = (fetchedOrders) => {
    setOrders(fetchedOrders);
  };

  const confirmStartDelivery = (rowData) => {
    setCurrentRowData(rowData);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (currentRowData) {
      toast.success("Delivery Started Successfully");
      updateTransportStatus(currentRowData.transportId);
      setDeliveryStatus(prev => ({ ...prev, [currentRowData.transportId]: "On the way" }));
    }
    setShowConfirmModal(false);
  };

  return (
    <div>
      <DataTable
        value={transports}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        header={buttonCreaeTransport()}
        paginator
        rows={5}
      >
        <Column field="transportId" header="Transport Id"></Column>
        <Column field="staff.staffName" header="Staff"></Column>
        <Column field="deliveryStaff.staffName" header="Delivery Staff"></Column>
        <Column field="healthCareStaff.staffName" header="Health Care Staff"></Column>
        <Column field="status" header="Status"></Column>
        <Column
          header="View orders"
          body={(rowData) => (
            <Button
              label="Orders"
              severity="info"
              className="text-black !bg-cyan-500 border border-black p-2"
              onClick={() => {
                setSelectedTransport(rowData.transportId); // Set selected transport on click
                setIsOpenTransport(true); // Open the dialog only when clicked
              }}
            ></Button>
          )}
        ></Column>
        <Column
          header="Start Delivery"
          body={(rowData) => {
            const isOnTheWay = deliveryStatus[rowData.transportId] === "On the way";
            const isDelivering = rowData.status === "DELIVERED" || rowData.status === "DELIVERING"; // Check if status is DELIVERING

            return isDelivering || isOnTheWay ? ( // Display "On the way" if status is DELIVERING or already marked as "On the way"
              "On the way"
            ) : (
              <Button
                label="Start Delivery"
                severity="success"
                className="text-black !bg-green-500 border border-black p-2"
                onClick={() => confirmStartDelivery(rowData)} // Call the confirmation function
                disabled={isOnTheWay || isDelivering} // Disable the button if it's already "On the way" or there are no orders
              />
            );
          }}
        />
      </DataTable>
      {
        isOpenTransport && (
          <ListOrders
            visible={isOpenTransport}
            onHide={() => setIsOpenTransport(false)}
            transportId={selectedTransport}
            onOrdersFetched={handleOrdersFetched}
          />
        )
      }
      <ConfirmationModal
        visible={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
      />
      {showConfirmDialog && (
        <CreateTransportDialog
          visible={showConfirmDialog}
          onHide={() => setShowConfirmDialog(false)}
        />
      )}
    </div>
  );

}
