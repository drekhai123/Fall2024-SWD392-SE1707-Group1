
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { baseUrl, headers, getJwtToken } from "../api/Url";
import { Calendar } from 'primereact/calendar';
import LoadingScreen from "../../utils/LoadingScreen";

export function PendingOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);
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
  }, [update]);
  const updateOrderStatus = (order) => {
    const updatedOrder = { deliveryStatus: "PROCESSING", updateAt: Date.now() };
    axios
      .put(`${baseUrl}/Orders/${order.orderId}/status`, updatedOrder, {
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        setUpdate(!update)
        alert("Update order status success!");
      })
      .catch((err) => {
        alert("Update order failed: " + err);
      });
  };
  // Pagingation
  const [first, setFirst] = useState(0); // Track the first row for controlled pagination
  const [rows, setRows] = useState(5); // Number of rows per page

  const onPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  //
  // Date Picker
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    if (startDate && endDate) {
      const filtered = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [startDate, endDate, orders]);
  //

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <div className="date-filter-container bg-blue-100 p-6 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Filter Orders by Date</h2>
        <div className="date-filter flex items-center gap-4">
          <div className="flex flex-col items-start">
            <label className="text-sm font-medium text-blue-700 mb-1">Start Date</label>
            <Calendar
              value={startDate}
              onChange={(e) => setStartDate(e.value)}
              placeholder="Select Start Date"
              className="p-2 border border-blue-300 rounded-md w-full"
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-sm font-medium text-blue-700 mb-1">End Date</label>
            <Calendar
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
              placeholder="Select End Date"
              className="p-2 border border-blue-300 rounded-md w-full"
            />
          </div>
          <div className="self-end ml-auto">
            <button
              onClick={() => { setStartDate(null); setEndDate(null); }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>
      <DataTable
        value={filteredOrders}
        paginator
        rows={rows}
        first={first}
        onPage={onPage}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="orderId" header="Order Id"></Column>
        <Column field="senderName" header="Customer"></Column>
        <Column field="createdAt" header="Date"></Column>
        <Column field="deliveryStatus" header="Status"></Column>
        <Column
          header="Action"
          body={(rowData) => {
            return (
              <Button
                label="Update Status"
                severity="warning"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={() => updateOrderStatus(rowData)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>
    </div>
  );
}
