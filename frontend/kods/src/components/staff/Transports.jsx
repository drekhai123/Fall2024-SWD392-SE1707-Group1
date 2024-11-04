import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { ListOrders } from "./ListOrders";
import { Button } from "primereact/button";
import { CreateTransportDialog } from "./CreateTransportDialog";
import axios from "axios";
import { baseUrl, headers, getJwtToken } from "../api/Url";

export function Transports() {
  const token = getJwtToken();
  const [transports, setTransports] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isOpenTransport, setIsOpenTransport] = useState(false);

  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const transportResponse = await axios.get(`${baseUrl}/Transport`, {
          headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
          }
        });
        setTransports(transportResponse.data);
      } catch (error) {
        console.error("Error fetching transports:", error);
      }
    };
    fetchTransport();
  }, []);

  const buttonCreaeTransport = () => (
    <Button
      label="Create Transport"
      severity="info"
      className="text-black !bg-cyan-500 border border-black p-2"
      onClick={() => setShowConfirmDialog(true)}
    />
  );

  return (
    <div>
      <DataTable
        value={transports}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        header={buttonCreaeTransport()}
      >
        <Column field="transportId" header="Transport Id" />
        <Column
          header="View orders"
          body={(rowData) => (
            <Button
              label="Orders"
              severity="info"
              className="text-black !bg-cyan-500 border border-black p-2"
              onClick={() => {
                setSelectedTransport(rowData.transportId);
                setIsOpenTransport(true);
              }}
            />
          )}
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
