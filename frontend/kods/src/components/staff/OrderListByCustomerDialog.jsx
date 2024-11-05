import React from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";

export const OrderListByCustomer = ({
  orders,
  visible,
  onHide,
  loading
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
        {loading ? (
          <div className="flex justify-center items-center">
            <ProgressSpinner /> {/* Loading spinner */}
          </div>
        ) : (
          <DataTable
            value={orders}
            showGridlines
            stripedRows
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="orderId" header="Order ID"></Column>
            <Column field="senderName" header="Sender"></Column>
            <Column field="senderPhoneNumber" header="Sender PhoneNumber"></Column>
            <Column field="senderAddress" header="Sender Address"></Column>
            <Column field="totalCost" header="Total Costs"></Column>
          </DataTable>
        )}
      </div>
    </Dialog>
  );
};
