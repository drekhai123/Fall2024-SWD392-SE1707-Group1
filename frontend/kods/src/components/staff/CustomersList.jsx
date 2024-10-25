import { useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { OrderListByCustomer } from "./OrderListByCustomerDialog";

export function CustomersList() {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "",
      order_count: 5,
      orders: [
        {
          orderId: 1,
          date: "2021-10-20",
          products: "Fish",
          status: "Pending",
        },
        {
          orderId: 2,
          date: "2021-10-20",
          products: "Fish",
          status: "Pending",
        },
        {
          orderId: 3,
          date: "2021-10-20",
          products: "Fish",
          status: "Pending",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "",
      order_count: 3,
      orders: [
        {
          orderId: 1,
          date: "2021-10-20",
          products: "Fish",
          status: "Pending",
        },
        {
          orderId: 2,
          date: "2021-10-20",
          products: "Fish",
          status: "Pending",
        },
        {
          orderId: 3,
          date: "2021-10-20",
          products: "Fish",
          status: "Pending",
        },
      ],
    },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const confirmOrder = (order) => {
    setSelectedCustomer(order);
    setShowConfirmDialog(true);
  };

  const handleConfirm = (confirmationData) => {
    console.log("Fish edited:", confirmationData);
  };

  return (
    <div>
      <DataTable
        value={customers}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="id" header="Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="order_count" header="Order Count"></Column>
        <Column
          field="id"
          header="Action"
          body={(rowData) => {
            return (
              <Button
                label="View Orders"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={() => confirmOrder(rowData)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>

      {selectedCustomer && (
        <OrderListByCustomer
          customer={selectedCustomer}
          visible={showConfirmDialog}
          onHide={() => setShowConfirmDialog(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
