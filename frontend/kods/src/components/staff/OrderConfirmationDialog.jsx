import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

const transportOptions = [
  { label: "Truck", value: "Truck" },
  { label: "Ship", value: "Ship" },
  { label: "Airplane", value: "Airplane" },
];

export const OrderConfirmationDialog = ({
  transport,
  visible,
  onHide,
  onConfirm,
}) => {
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);

  const handleConfirm = () => {
    onConfirm({
      tranportId: transport.transportId,
      transportType: selectedTransport,
      deliveryDate,
    });
    onHide(); // Close the modal after confirmation
  };

  return (
    <Dialog
      header="Confirm Order"
      visible={visible}
      style={{ width: "30vw" }}
      footer={
        <div className="flex justify-end gap-2 p-3">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={onHide}
            className="p-button-text text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 p-2"
          />
          <Button
            label="Confirm"
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
        {/* Transport Type Field */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="transportType" className="font-medium text-gray-700">
            Transport Type
          </label>
          <Dropdown
            value={selectedTransport}
            options={transportOptions}
            onChange={(e) => setSelectedTransport(e.value)}
            placeholder="Select a transport type"
            className="w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Delivery Date Field */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="deliveryDate" className="font-medium text-gray-700">
            Delivery Date
          </label>
          <Calendar
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.value)}
            showIcon
            className="w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </Dialog>
  );
};
