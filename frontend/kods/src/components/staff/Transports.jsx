import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { CheckHealStatusDialog } from "./CheckHealthStatusDialog"
import { CreateTransportDialog } from "./CreateTransportDialog";
import { Button } from "primereact/button";

import axios from "axios";
import { baseUrl, headers, getJwtToken } from "../api/Url";

export function Transports() {
  const token = getJwtToken();
  const [transports, setTransports] = useState([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [staff, setStaff] = useState()
  const [isOpenHealthDialog, setIdOpenHealDialog] = useState(false)
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userId = user.accountId;
  const ordersResponse = null;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const transportResponse = await axios.get(`${baseUrl}/Transport`, {
          headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
          }
        });
        const orders = await ordersResponse.data.filter(data => data.deliveryStatus === 'PROCESSING')

        // Fetch all delivery staff
        const deliveryStaffResponse = await axios.get(`${baseUrl}/DeliveryStaff`, {
          headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
          }
        });
        const deliveryStaffList = await deliveryStaffResponse.data;
        const simplifiedOrders = await Promise.all(
          orders.map(async (order) => {
            const transportResponse = await axios.get(`${baseUrl}/Transport/${order.transportId}`, {
              headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
              }
            });
            const transport = await transportResponse.data;
            const deliveryStaff = deliveryStaffList.find(
              (delivery) => delivery.staffId === transport.deliveryStaffId
            );
            // if (true) {
            return {
              orderId: order.orderId,
              deliveryStatus: order.deliveryStatus,
              transportId: transport.transportId,
              delivery_staff: deliveryStaff?.staffName,
              deliveryStaffId: deliveryStaff?.staffId
            };
            // }
            // else {
            //   return null;
            // }
          })
        );
        setTransports(simplifiedOrders)
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);
  console.log(transports)
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

      >
        <Column field="transportId" header="Transport Id"></Column>
        <Column field="orderId" header="Order Id"></Column>
        <Column field="deliveryStatus" header="Status"></Column>
        <Column field="delivery_staff" header="Delivery Staff"></Column>
        <Column
          header="Check health"
          body={() => {
            return (
              <Button
                label="Health"
                severity="info"
                className="text-black !bg-cyan-500 border border-black p-2"
                onClick={setIdOpenHealDialog(true)}
              ></Button>
            );
          }}
        ></Column>
      </DataTable>
      {
        isOpenHealthDialog && (
          <CheckHealStatusDialog
            visible={isOpenHealthDialog}
            onHide={() => setIdOpenHealDialog(false)}
            staff={staff}
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
