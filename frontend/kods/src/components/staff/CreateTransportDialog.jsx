import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";
import { baseUrl, headers, getJwtToken } from "../api/Url";

export const CreateTransportDialog = ({ visible, onHide }) => {
  const token = getJwtToken();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDeliveryStaff, setSelectedDeliveryStaff] = useState(null);
  const [deliveryStaff, setDeliveryStaff] = useState([]);
  const [staff, setStaff] = useState([]);

  const handleConfirm = async () => {
    const transportData = {
      status: "PROCESSING",
      deliveryStaffId: selectedDeliveryStaff,
      healthCareStaffId: selectedDeliveryStaff,
      staffId: selectedStaff,
    };
    try {
      await axios.post(`${baseUrl}/Transport`, transportData, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });
      onHide(); // Close the dialog after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDeliveryStaff = async () => {
      try {
        const deliveryStaffResponse = await axios.get(`${baseUrl}/DeliveryStaff`, {
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
        });
        const deliveryStaffList = deliveryStaffResponse.data.map((staff) => ({
          label: staff.staffName,
          value: staff.staffId,
        }));
        setDeliveryStaff(deliveryStaffList);
      } catch (error) {
        console.error("Error fetching delivery staff:", error);
      }
    };
    fetchDeliveryStaff();
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staffResponse = await axios.get(`${baseUrl}/Staff`, {
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
        });
        const staffList = staffResponse.data.map((staff) => ({
          label: staff.staffName,
          value: staff.staffId,
        }));
        setStaff(staffList);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };
    fetchStaff();
  }, []);

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
          <label htmlFor="deliveryStaff" className="font-medium text-gray-700">
            Delivery Staff
          </label>
          <Dropdown
            value={selectedDeliveryStaff}
            options={deliveryStaff}
            onChange={(e) => setSelectedDeliveryStaff(e.value)}
            placeholder="Select a delivery staff"
            className="w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="space-y-4 p-8">
        <div className="flex flex-col space-y-1">
          <label htmlFor="staff" className="font-medium text-gray-700">
            Staff
          </label>
          <Dropdown
            value={selectedStaff}
            options={staff}
            onChange={(e) => setSelectedStaff(e.value)}
            placeholder="Select a staff"
            className="w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </Dialog>
  );
};
