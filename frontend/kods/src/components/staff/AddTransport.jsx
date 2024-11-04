import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";
import { baseUrl, headers, getJwtToken } from "../api/Url";

export const AddTransport = ({
  visible,
  onHide,
  order
}) => {
  const token = getJwtToken();
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [transports, setTransports] = useState([]);

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

    if (visible) {
      fetchTransport();
    }
  }, [visible]);

  const handleConfirm = async () => {
    if (!selectedTransport) {
      alert("Please select a transport.");
      return;
    }
    const updatedOrder = {
      ...order,
      transportId: selectedTransport,
      deliveryStatus: "PROCESSING"
    };

    try {
      await axios.put(`${baseUrl}/Orders/${order.orderId}`, updatedOrder, {
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`
        }
      });
      alert("Transport added successfully!");
      onHide();
    } catch (error) {
      console.error("Error updating order with transport:", error);
      alert("Failed to add transport to order.");
    }
  };

  return (
    <Dialog
      header="Add Transport"
      visible={visible}
      style={{ width: "30vw" }}
      footer={
        <div className="flex justify-end gap-2 p-3">
          <Button
            label="Add"
            icon="pi pi-check"
            onClick={handleConfirm}
            className="bg-cyan-500 text-white hover:bg-cyan-600 border border-cyan-500 hover:border-cyan-600 p-2"
            autoFocus
          />
        </div>
      }
      onHide={onHide}
    >
      <div className="space-y-4 p-8">
        <div className="flex flex-col space-y-1">
          <label htmlFor="transportId" className="font-medium text-gray-700">
            Transport ID
          </label>
          <Dropdown
            id="transportId"
            value={selectedTransport}
            options={transports.map(t => ({ label: t.transportId, value: t.transportId }))}
            onChange={(e) => setSelectedTransport(e.value)}
            placeholder="Select a transport"
            className="w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </Dialog>
  );
};
