import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import axios from "axios";
import { baseUrl, headers, getJwtToken } from "../api/Url";
import { Health } from "./Health";

export const ListOrders = ({ visible, onHide, transportId }) => {
  const token = getJwtToken();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpenHealth, setIsOpenHealth] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/Orders/transport/${transportId}`, {
          headers: {
            ...headers,
            'Authorization': `Bearer ${token}`,
          },
        });
        setOrdersData(response.data.filter(data => data.deliveryStatus === 'PROCESSING'));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      fetchOrders();
    }
  }, [visible, transportId]);

  const openAddTransportDialog = (rowData) => {
    setSelectedOrder(rowData.orderId);
    setIsOpenHealth(true);
  };

  return (
    <Dialog
      header="List of Orders"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
    >
      {loading ? (
        <div>
          <ProgressSpinner />
        </div>
      ) : (
        <DataTable
          value={ordersData}
          showGridlines
          stripedRows
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="orderId" header="Order ID" />
          <Column field="senderName" header="Sender" />
          <Column field="senderPhoneNumber" header="Sender Phone Number" />
          <Column field="senderAddress" header="Sender Address" />
          <Column field="totalCost" header="Total Costs" />
          <Column
            header="Health Check"
            body={(rowData) => (
              <Button
                label="Check"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={() => openAddTransportDialog(rowData)}
              />
            )}
          />
        </DataTable>
      )}
      {isOpenHealth && selectedOrder && (
        <Health
          visible={isOpenHealth}
          onHide={() => setIsOpenHealth(false)}
          orderId={selectedOrder}
        />
      )}
    </Dialog>
  );
};
