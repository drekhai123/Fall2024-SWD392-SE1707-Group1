import { useState, useEffect } from "react";
import axios from "axios";
import { AddTransport } from './AddTransport';
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { baseUrl,headers, getJwtToken } from "../api/Url";

export function PendingOrders() {
  const [orders, setOrders] = useState([]);
  const [isAddTransport, setIsAddTransport] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getJwtToken();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${baseUrl}/Orders`, {
          headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
          }
        });
        setOrders(response.data.filter(data => data.deliveryStatus === 'PENDING'));
      } catch (err) {
        console.error(err);
        setError("Error fetching orders data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const updateOrderStatus = (order) => {
    const updatedOrder = { deliveryStatus: "PROCESSING", updateAt: Date.now() };
    axios
      .put(`${baseUrl}/Orders/${order.orderId}/status`, updatedOrder)
      .then(() => {
        alert("Update order status success!");
        setOrders(prevOrders =>
          prevOrders.map(o =>
            o.orderId === order.orderId ? { ...o, deliveryStatus: "PROCESSING" } : o
          )
        );
      })
      .catch((err) => {
        alert("Update order failed: " + err);
      });
  };

  return (
    <div>
      <DataTable
        value={orders}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="orderId" header="Order Id" />
        <Column field="senderName" header="Customer" />
        <Column field="createdAt" header="Date" />
        <Column field="deliveryStatus" header="Status" />
        <Column
          header="Action"
          body={(rowData) => {
            return (
              <Button
                label="Update to Processing"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={() => updateOrderStatus(rowData)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>

      {isAddTransport &&
        <AddTransport
          visible={isAddTransport}
          onHide={() => setIsAddTransport(false)}
          order={selectedOrder}
        />
      }
    </div>
  );
}
