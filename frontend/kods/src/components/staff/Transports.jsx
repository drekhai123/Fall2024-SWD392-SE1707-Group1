import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { ListOrders } from "./ListOrders";
import { CreateTransportDialog } from "./CreateTransportDialog";
import { Button } from "primereact/button";

import axios from "axios";
import { baseUrl, headers, getJwtToken } from "../api/Url";

export function Transports() {
  const token = getJwtToken();
  const [transports, setTransports] = useState([])
  const [selectedTransport, setSelectedTransport] = useState()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isOpenTransport, setIsOpenTransport] = useState(false)
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
