import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const healthFish = [
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" },
];

export const UpdateHealthDialog = ({ fish, visible, onHide, onConfirm }) => {
  const [selectedHealthFish, setSelectedHealthFish] = useState(null);
  const [note, setNote] = useState("");

  const handleConfirm = () => {
    onConfirm({
      fishId: fish.id,
      healthFish: selectedHealthFish,
      note,
    });
    onHide(); // Close the modal after confirmation
  };

  return (
    <Dialog
      header="Update Fish Health"
      visible={visible}
      style={{ width: "30vw" }}
      footer={
        <div className="flex justify-end gap-2 p-3">
          <Button
            label="Update Health Status"
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
            Health Status
          </label>
          <Dropdown
            value={selectedHealthFish}
            options={healthFish}
            onChange={(e) => setSelectedHealthFish(e.value)}
            placeholder="Select a health status"
            className="w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="note" className="font-medium text-gray-700">
            Notes
          </label>
          <InputText
            id="note"
            value={note}
            onChange={(e) => setNote(e.value)}
            showIcon
            className="w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </Dialog>
  );
};
