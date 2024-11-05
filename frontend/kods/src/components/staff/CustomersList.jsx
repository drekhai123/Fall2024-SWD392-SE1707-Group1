import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, headers, getJwtToken } from "../api/Url";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { OrderListByCustomer } from "./OrderListByCustomerDialog";

export function CustomersList() {
  const token = getJwtToken();
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Customer`, {
          headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
          }
        });
        setCustomers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const confirmOrder = async (order) => {
    setSelectedCustomer(order);
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`${baseUrl}/Orders/customer/${order.customerId}`, {
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
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
        paginator
        rows={5}
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
                onClick={() => confirmOrder(rowData)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>

      {selectedCustomer && (
        <OrderListByCustomer
          orders={orders}
          visible={showConfirmDialog}
          onHide={() => setShowConfirmDialog(false)}
          loading={loading} // Pass loading state to the dialog
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
