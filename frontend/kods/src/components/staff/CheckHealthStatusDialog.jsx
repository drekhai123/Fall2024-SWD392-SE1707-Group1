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
  const [staffHealthStatus, setStaffHealthStatus] = useState([]);

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {

        const [healthStatusRes, orderDetailsRes, deliveriesRes, transportsRes] = await Promise.all([
          axios.get(`${baseUrl}/HealthStatus`, {
            headers: {
              ...headers,
              'Authorization': `Bearer ${token}`
            }
          }),
          axios.get(`${baseUrl}/OrderDetails`, {
            headers: {
              ...headers,
              'Authorization': `Bearer ${token}`
            }
          }),
          axios.get(`${baseUrl}/Orders`, {
            headers: {
              ...headers,
              'Authorization': `Bearer ${token}`
            }
          }),
          axios.get(`${baseUrl}/Transport`, {
            headers: {
              ...headers,
              'Authorization': `Bearer ${token}`
            }
          })
        ]);

        const healthStatus = healthStatusRes.data;
        const orderDetails = orderDetailsRes.data;
        const deliveries = deliveriesRes.data;
        const transports = transportsRes.data;

        // Build a map of OrderDetailsId to deliveryId
        const orderDetailsToDeliveryMap = {};
        orderDetails.forEach(detail => {
          orderDetailsToDeliveryMap[detail.orderDetailsId] = detail.deliveryId;
        });

        // Build a map of deliveryId to transportId
        const deliveryToTransportMap = {};
        deliveries.forEach(delivery => {
          deliveryToTransportMap[delivery.deliveryId] = delivery.transportId;
        });

        // Build a map of transportId to staffId
        const transportToStaffMap = {};
        transports.forEach(transport => {
          transportToStaffMap[transport.transportId] = transport.staffId;
        });

        // Filter healthStatus entries where staffId matches targetStaffId
        const filteredHealthStatus = healthStatus.filter(status => {
          const deliveryId = orderDetailsToDeliveryMap[status.orderDetailsId];
          const transportId = deliveryToTransportMap[deliveryId];
          return transportToStaffMap[transportId] === staffId;
        });

        setStaffHealthStatus(filteredHealthStatus);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchHealthStatus();
  }, [token, staffId]);
  console.log(staffHealthStatus)
  return (
    <Dialog
      header="Health check"
      visible={visible}
      style={{ width: "70vw" }}
      onHide={onHide}
    >
      <DataTable
        value={[]}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="healthStatusId" header="Id"></Column>
        <Column field="date" header="Date"></Column>
        <Column field="notes" header="Note"></Column>
        <Column field="oxygenLevel" header="Oxygen Level"></Column>
        <Column field="phLevel" header="Php Level"></Column>
        <Column field="status" header="Status"></Column>
        <Column field="temperature" header="Temperatuer"></Column>
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
