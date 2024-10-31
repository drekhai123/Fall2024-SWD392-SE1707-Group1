import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { TransportAssignStaffDialog } from "./TransportAssignStaffDialog";
import { Button } from "primereact/button";

import axios from "axios";
import { baseUrl } from "../api/Url";

export function Transports() {
  const [transports, setTransports] = useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Orders`);
        setTransports(response.data.filter(data => data.deliveryStatus === 'PROCESSING'));
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);
  const [selectedTranport, setSelectedTransport] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const confirmTransport = (transport) => {
    setSelectedTransport(transport);
    setShowConfirmDialog(true);
  };

  const handleConfirm = (confirmationData) => {
  };

  return (
    <div>
      <DataTable
        value={transports}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="transportId" header="Transport Id"></Column>
        <Column field="orderId" header="Order Id"></Column>
        <Column field="deliveryStatus" header="Status"></Column>
        <Column field="delivery_staff" header="Delivery Staff"></Column>
        <Column
          field="transportId"
          header="Action"
          body={(rowData) => {
            return (
              <Button
                label="Assign Staff"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={() => confirmTransport(rowData)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>

      {selectedTranport && (
        <TransportAssignStaffDialog
          transport={selectedTranport}
          visible={showConfirmDialog}
          onHide={() => setShowConfirmDialog(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
