import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { TransportAssignStaffDialog } from "./TransportAssignStaffDialog";
import { Button } from "primereact/button";

export function Transports() {
  const transports = [
    {
      transportId: 1,
      orderId: 1,
      status: "Pending",
      delivery_staff: "John Doe",
    },
    {
      transportId: 2,
      orderId: 2,
      status: "Pending",
      delivery_staff: "Jane Doe",
    },
    {
      transportId: 3,
      orderId: 3,
      status: "Pending",
      delivery_staff: "John Smith",
    },
  ];

  const [selectedTranport, setSelectedTransport] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const confirmTransport = (transport) => {
    setSelectedTransport(transport);
    setShowConfirmDialog(true);
  };

  const handleConfirm = (confirmationData) => {
    console.log("Transport confirmed:", confirmationData);
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
        <Column field="status" header="Status"></Column>
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
