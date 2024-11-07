import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";
import { headers, getJwtToken } from "../api/Url";
import { GetAllStaff } from "../api/StaffApi";
import { GetAllDeliveryStaff } from "../api/DeliveryStaffApi";
import { GetAllHealthCareStaff } from "../api/HealthcareStaffApi";
import { GetAllTransports } from "../api/TransportApi";
import { toast } from "react-toastify";

export const CreateTransportDialog = ({ visible, onHide, setTransports }) => {
  const token = getJwtToken();
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [deliveryStaff, setDeliveryStaff] = useState([]);
  const [selectedDeliveryStaff, setSelectedDeliveryStaff] = useState(null);
  const [healthCareStaff, setHealthCareStaff] = useState([]);
  const [selectedHealthCareStaff, setSelectedHealthCareStaff] = useState(null);

  // Fetch all transports
  const fetchTransports = async () => {
    try {
      const response = await GetAllTransports();
      console.log("Fetched transports:", response); // Debugging line
      setTransports(response.data || []); // Assuming response.data contains the transports
    } catch (error) {
      console.error("Error fetching transports:", error);
    }
  };

  const handleConfirm = async () => {
    // Validate selections
    if (!selectedHealthCareStaff || !selectedDeliveryStaff || !selectedStaff) {
      toast.error("Please select healthcare staff, delivery staff, and general staff before proceeding.");
      return; // Exit the function if any selection is missing
    }

    const transportData = {
      status: "DELIVERING", // or whatever initial status you want
      deliveryStaffId: selectedDeliveryStaff,
      healthCareStaffId: selectedHealthCareStaff,
      staffId: selectedStaff
    };

    try {
      await axios.post("https://kdosdreapiservice.azurewebsites.net/api/Transport", transportData, {
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`
        }
      });

      await Promise.all([
        axios.patch(`https://kdosdreapiservice.azurewebsites.net/api/Staff/Status/${selectedStaff}`, { staffStatus: "OCCUPIED" }, { headers: { 'Authorization': `Bearer ${token}` } }),
        axios.patch(`https://kdosdreapiservice.azurewebsites.net/api/DeliveryStaff/Status/${selectedDeliveryStaff}`, { staffStatus: "OCCUPIED" }, { headers: { 'Authorization': `Bearer ${token}` } }),
        axios.patch(`https://kdosdreapiservice.azurewebsites.net/api/HealthCareStaff/Status/${selectedHealthCareStaff}`, { staffStatus: "OCCUPIED" }, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      // Reload staff lists and transports
      await Promise.all([
        fetchDeliveryStaff(),
        fetchHealthCareStaff(),
        fetchStaff(),
        fetchTransports() // Ensure this is called
      ]);

      toast.success("Transport assigned successfully");
      onHide(); // Close the dialog after successful assignment
    } catch (error) {
      console.error("Error during transport assignment:", error);
      toast.error("Error creating transport. Please try again.");
    }
  };

  // Fetch Delivery Staff
  const fetchDeliveryStaff = async () => {
    try {
      const deliveryStaffResponse = await GetAllDeliveryStaff();
      const deliveryStaffList = deliveryStaffResponse.data
        .filter(staff => staff.staffId !== 0 && staff.staffStatus !== "OCCUPIED")
        .map(staff => ({
          label: staff.staffName,
          value: staff.staffId,
          staffStatus: staff.staffStatus
        }));
      setDeliveryStaff(deliveryStaffList);
    } catch (error) {
      console.error("Error fetching delivery staff:", error);
    }
  };

  // Use Effect for Delivery Staff
  useEffect(() => {
    fetchDeliveryStaff();
  }, []);

  // Fetch Health Care Staff
  const fetchHealthCareStaff = async () => {
    try {
      const healthStaffResponse = await GetAllHealthCareStaff();
      const healthStaffList = healthStaffResponse.data
        .filter(staff => staff.staffId !== 0 && staff.staffStatus !== "OCCUPIED")
        .map(staff => ({
          label: staff.staffName,
          value: staff.staffId,
          staffStatus: staff.staffStatus
        }));
      setHealthCareStaff(healthStaffList);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  // Use Effect for Health Care Staff
  useEffect(() => {
    fetchHealthCareStaff();
  }, []);

  // Fetch Staff
  const fetchStaff = async () => {
    try {
      const staffResponse = await GetAllStaff();
      const staffList = staffResponse.data
        .filter(staff => staff.staffId !== 0 && staff.staffStatus !== "OCCUPIED")
        .map(staff => ({
          label: staff.staffName,
          value: staff.staffId,
          staffStatus: staff.staffStatus
        }));
      setStaff(staffList);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };
  //
  useEffect(() => {
    fetchStaff();
  }, []);

  const itemTemplateDeliveryStaff = (deliveryStaff) => {
    return (
      <div>
        <strong>{deliveryStaff.value}</strong> - {deliveryStaff.label} - <p style={{ color: deliveryStaff.staffStatus === "FREE" ? "green" : "red" }}>{deliveryStaff.staffStatus}</p>
      </div>
    );
  };
  const itemTemplateStaff = (staff) => {
    return (
      <div>
        <strong>{staff.value}</strong> - {staff.label} - <p style={{ color: staff.staffStatus === "FREE" ? "green" : "red" }}>{staff.staffStatus}</p>
      </div>
    );
  };
  const itemTemplateHealthCareStaffS = (healthCareStaff) => {
    return (
      <div>
        <strong>{healthCareStaff.value}</strong> - {healthCareStaff.label} - <p style={{ color: healthCareStaff.staffStatus === "FREE" ? "green" : "red" }}>{healthCareStaff.staffStatus}</p>
      </div>
    );
  };

  return (
    <Dialog
      header="Assign Delivery Staff"
      visible={visible}
      style={{ width: "40vw" }}
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
      <div className="p-4">
        <label htmlFor="healthCareStaff" className="font-medium text-gray-700 mb-2">
          Health Care Staff
        </label>
        <Dropdown
          itemTemplate={itemTemplateHealthCareStaffS}
          value={selectedHealthCareStaff}
          options={healthCareStaff}
          onChange={(e) => setSelectedHealthCareStaff(e.value)}
          placeholder="Select a health care staff"
          className="w-full border border-gray-300 rounded-md mb-4"
        />
        <label htmlFor="deliveryStaff" className="font-medium text-gray-700 mb-2">
          Delivery Staff
        </label>
        <Dropdown
          itemTemplate={itemTemplateDeliveryStaff}
          value={selectedDeliveryStaff}
          options={deliveryStaff}
          onChange={(e) => setSelectedDeliveryStaff(e.value)}
          placeholder="Select a delivery staff"
          className="w-full border border-gray-300 rounded-md mb-4"
        />

        <label htmlFor="staff" className="font-medium text-gray-700 mb-2">
          Staff
        </label>
        <Dropdown
          itemTemplate={itemTemplateStaff}
          value={selectedStaff}
          options={staff}
          onChange={(e) => setSelectedStaff(e.value)}
          placeholder="Select a staff"
          className="w-full border border-gray-300 rounded-md"
        />
      </div>
    </Dialog>
  );
};
