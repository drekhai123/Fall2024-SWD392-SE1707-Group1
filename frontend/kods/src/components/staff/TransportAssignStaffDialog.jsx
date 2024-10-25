import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const transportOptions = [
  { label: "User 1", value: "user" },
  { label: "Shipper 1", value: "shipper1" },
  { label: "Shipper 2", value: "shipper2" },
];

export const TransportAssignStaffDialog = ({
  order,
  visible,
  onHide,
  onConfirm,
}) => {
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleConfirm = () => {
    onConfirm({
      orderId: order.orderId,
      selectedStaff: selectedStaff,
    });
    onHide();
  };

  return (
    <Dialog
      header="Assign Delivery Staff"
      visible={visible}
      style={{ width: "30vw" }}
      footer={
        <div className="flex justify-end gap-2 p-3">
          <Button
            label="Assign Staff"
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
          <label htmlFor="transportType" className="font-medium text-gray-700">
            Delivery Staff
          </label>
          <Dropdown
            value={selectedStaff}
            options={transportOptions}
            onChange={(e) => setSelectedStaff(e.value)}
            placeholder="Select a staff"
            className="w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </Dialog>
  );
};
