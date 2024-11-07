import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { ListOrders } from "./ListOrders";
import { CreateTransportDialog } from "./CreateTransportDialog";
import { Button } from "primereact/button";

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
      const response = await axios.put(`${baseUrl}/Transport/${transportId}`, {
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
            return (
              <Button
                label={isOnTheWay ? "On the way" : "Start Delivery"}
                severity="success"
                className="text-black !bg-green-500 border border-black p-2"
                onClick={() => {
                  if (!isOnTheWay) {
                    toast.success("Delivery Started Successfully");
                    updateTransportStatus(rowData.transportId);
                    setDeliveryStatus(prev => ({ ...prev, [rowData.transportId]: "On the way" }));
                  }
                }}
                disabled={isOnTheWay} // Disable the button if it's already "On the way"
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
          />
        )
      }
      {showConfirmDialog && (
        <CreateTransportDialog
          visible={showConfirmDialog}
          onHide={() => setShowConfirmDialog(false)}
        />
      )}
    </div>
  );

}
