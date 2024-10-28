import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";

export function PendingOrders() {
  const pendingOrders = [
    {
      orderId: 1,
      customerName: "John Doe",
      date: "2021-10-20",
      status: "Pending",
    },
    {
      orderId: 2,
      customerName: "Jane Doe",
      date: "2021-10-21",
      status: "Pending",
    },
    {
      orderId: 3,
      customerName: "John Smith",
      date: "2021-10-22",
      status: "Pending",
    },
  ];

  const [orders, setOrders] = useState(pendingOrders);

  const updateOrderStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: "Processing" } : order
      )
    );
  };

  return (
    <div>
      <DataTable
        value={orders}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="orderId" header="Order Id"></Column>
        <Column field="customerName" header="Customer"></Column>
        <Column field="date" header="Date"></Column>
        <Column field="status" header="Status"></Column>
        <Column
          header="Action"
          body={(rowData) => {
            return (
              <Button
                label="Update to Processing"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={() => updateOrderStatus(rowData.orderId)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>
    </div>
  );
}
