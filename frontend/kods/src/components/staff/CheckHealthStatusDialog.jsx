import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { baseUrl, headers, getJwtToken } from "../api/Url";

export const CheckHealStatusDialog = ({
  visible,
  onHide,
  staffId
}) => {
  const token = getJwtToken()

  const healthStatusData = axios.get(`${baseUrl}/HealthStatus`, {
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`
    }
  });  
  console.log(healthStatusData.data)
  return (
    <Dialog
      header="Assign Delivery Staff"
      visible={visible}
      style={{ width: "30vw" }}
      onHide={onHide}
    >
    <DataTable
        value={[]}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="customerId" header="Id"></Column>
        <Column field="customerName" header="Name"></Column>
        <Column field="account.email" header="Email"></Column>
        <Column
          field="id"
          header="Action"
          body={(rowData) => {
            return (
              <Button
                label="View Orders"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                // onClick={() => confirmOrder(rowData)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>
    </Dialog>
  );
};
