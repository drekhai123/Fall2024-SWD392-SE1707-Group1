import React from "react";

import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const OrderListByCustomer = ({
  orders,
  visible,
  onHide,
}) => {

  return (
    <Dialog
      header="Confirm Order"
      visible={visible}
      style={{ width: "60vw" }}
      footer={<div className="flex justify-end gap-2 p-3"></div>}
      onHide={onHide}
    >
      <div className="space-y-4 p-8">
        <DataTable
          value={orders}
          showGridlines
          stripedRows
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="orderId" header="Order ID"></Column>
          <Column field="date" header="Date"></Column>
          <Column field="products" header="Products"></Column>
          <Column field="status" header="Status"></Column>
        </DataTable>
      </div>
    </Dialog>
  );
};
