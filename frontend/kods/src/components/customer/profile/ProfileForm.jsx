import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { InputField } from "../../form";
import { UpdateCustomer } from "../../api/CustomerApi";
import { GetAccountById, DeleteAccount } from "../../api/AccountApi";
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast'; // Import Toast from primereact
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import primereact styles
import 'primeicons/primeicons.css'; // Import primeicons

const ProfileForm = ({ onSubmit = () => {}, methods }) => {
  const { register, handleSubmit, watch, setValue } = methods;
  const [customer, setCustomer] = useState({
    customerName: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    address: '',
  });
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null); // Create a ref for the Toast component

  const watchedFields = watch(["customerName", "dob", "gender", "phoneNumber", "address"]);

  useEffect(() => {
    const fetchAccountData = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const accountId = user?.accountId;
      const token = sessionStorage.getItem('token');

      if (accountId) {
        try {
          const response = await GetAccountById(accountId, token);
          const fetchedCustomer = response.data.customer;
          setCustomer(fetchedCustomer);

          Object.keys(fetchedCustomer).forEach(key => {
            setValue(key, fetchedCustomer[key]);
          });
        } catch (error) {
          console.error("Error fetching account data:", error);
        }
      }
    };

    fetchAccountData();
  }, [setValue]);

  const handleChange = (field) => (e) => {
    let value = e.target.value;

    // Automatically prepend '+84 ' if the phone number starts with '84'
    if (field === "phoneNumber" && value.startsWith('84') && !value.startsWith('+84 ')) {
      value = `+84 ${value.slice(2)}`;
    }

    setCustomer((prev) => {
      const updatedCustomer = { ...prev, [field]: value };
      console.log('Updated Customer:', updatedCustomer);
      return updatedCustomer;
    });
  };

  const handleFormSubmit = async (e) => {
    if (isCooldown) return;
    try {
      const updatedCustomer = await UpdateCustomer(customer.customerId, {
        customerName: customer.customerName,
        dob: customer.dob,
        gender: customer.gender,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
      });
      onSubmit(updatedCustomer);

      // Show success notification using primereact Toast
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Customer details saved successfully!', life: 3000 });
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 5000);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    handleFormSubmit({ preventDefault: () => {} });
  };

  const handleDeleteConfirm = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accountId = user?.accountId;

    if (!accountId) {
      console.error("No account ID found.");
      return;
    }

    try {
      await DeleteAccount(accountId);
      setDeleteConfirmOpen(false);
      // Optionally, redirect the user or perform other actions after deletion
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <Toast ref={toast} /> {/* Add the Toast component */}
      {customer && (
        <div className="max-w-5xl">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Customer Name Field */}
            <div>
              <label className="block mb-2">Customer Name</label>
              <InputField
                name="customerName"
                fullWidth
                placeholder="Enter your customer name"
                value={customer.customerName || ""}
                onChange={handleChange("customerName")}
              />
            </div>

            {/* Date of Birth Field */}
            <div>
              <label className="block mb-2">Date of Birth</label>
              <InputField
                name="dob"
                type="text"
                fullWidth
                placeholder="Enter your date of birth"
                value={customer?.dob || ""}
                onChange={handleChange("dob")}
                  InputProps={{
                  readOnly: true, // Ensure the field is read-only
                }}
              />
            </div>

            {/* Gender Field as Select Dropdown */}
            <div>
              <FormControl fullWidth>
                <label className="block mb-2">Gender</label>
                <Select
                  {...register("gender")}
                  value={customer.gender || ""}
                  onChange={handleChange("gender")}
                  fullWidth
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Phone Number Field */}
            <div>
            <label className="block mb-2">Phone Number</label>
            <InputField
              name="phoneNumber"
              type="number"
              fullWidth
              placeholder="Enter your phone number"
              value={customer?.phoneNumber || ""}
              onChange={handleChange("phoneNumber")}
            />
          </div>
            {/* Address Field */}
            <div>
              <label className="block mb-2">Address</label>
              <InputField
                {...register("address")}
                name="address"
                fullWidth
                placeholder="Enter your address"
                value={customer.address || ""}
                onChange={handleChange("address")}
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  isCooldown ||
                  !Object.keys(watchedFields).some(key => watchedFields[key] !== customer[key])
                }
              >
                Save Changes
              </Button>
            </div>

            {/* Delete Account Button */}
            <div className="mt-4">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setDeleteConfirmOpen(true)}
              >
                Delete Account
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to save these changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileForm;