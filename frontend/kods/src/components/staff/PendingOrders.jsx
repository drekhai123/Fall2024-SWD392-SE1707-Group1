import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { OrderConfirmationDialog } from "./OrderConfirmationDialog";

export function PendingOrders() {
  const pendingOrders = [
    {
      orderId: 1,
      customerName: "John Doe",
      product: "Fish",
      date: "2021-10-20",
    },
    {
      orderId: 2,
      customerName: "Jane Doe",
      product: "Fish",
      date: "2021-10-20",
    },
    {
      orderId: 3,
      customerName: "John Smith",
      product: "Fish",
      date: "2021-10-20",
    },
  ];

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const confirmOrder = (order) => {
    setSelectedOrder(order);
    setShowConfirmDialog(true);
  };

  const handleConfirm = (confirmationData) => {
    console.log("Order confirmed:", confirmationData);
  };

  return (
    <div>
      <DataTable
        value={pendingOrders}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="orderId" header="Order Id"></Column>
        <Column field="customerName" header="Customer"></Column>
        <Column field="product" header="Products"></Column>
        <Column field="date" header="Date"></Column>
        <Column
          field="orderId"
          header="Action"
          body={(rowData) => {
            return (
              <Button
                label="Confirm Order"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={() => confirmOrder(rowData)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>

      {selectedOrder && (
        <OrderConfirmationDialog
          order={selectedOrder}
          visible={showConfirmDialog}
          onHide={() => setShowConfirmDialog(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
