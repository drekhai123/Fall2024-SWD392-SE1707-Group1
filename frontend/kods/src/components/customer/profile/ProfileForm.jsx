import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { InputField } from "../../form";
import { UpdateAccount } from "../../api/AccountApi";

const UserProfileForm = ({ onSubmit, methods }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const { formState: { isDirty } } = methods;

  const handleOpen = (data) => {
    setFormData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await UpdateAccount(formData.id, formData);
      onSubmit(formData);
    } catch (error) {
      console.error("Failed to update account:", error);
    }
    handleClose();
  };

  const handleSubmit = (data) => {
    console.log("Updated form data:", data);
    handleOpen(data);
  };

  const handleDeleteConfirm = () => {
    console.log("Account deleted");
    setDeleteConfirmOpen(false);
  };

  return (
    <>
      <div>
        <p className="text-4xl font-semibold">Profile</p>
        <p className="text-gray-600 text-lg my-2">
          This is your user profile. You can update your name, email here.
        </p>
        <div className="border-b border-gray-300 my-4"></div>
      </div>
      <div className="max-w-5xl">
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
          {/* User Name Field */}
          <div>
            <label className="block mb-2">UserName</label>
            <InputField
              defaultValue="userName"
              name="userName"
              label="User Name"
              fullWidth
              style={{ boxSizing: 'border-box' }}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-2">Email</label>
            <InputField
              defaultValue="email"
              name="email"
              label="Email"
              fullWidth
              type="email"
              rules={{
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Enter a valid email address",
                },
              }}
              placeholder="Enter your email"
              style={{ boxSizing: 'border-box' }}
            />
          </div>

          {/* Avatar Field */}
          {/* <div>
            <label className="block mb-2">Change your avatar here</label>
            <InputField
              defaultValue="avatar"
              name="avatar"
              label="Avatar"
              fullWidth
              placeholder="Enter your avatar URL"
              style={{ boxSizing: 'border-box' }}
            />
          </div> */}

          {/* Submit Button */}
          {isDirty && (
            <div>
              <Button type="button" variant="contained" color="primary" onClick={methods.handleSubmit(handleSubmit)}>
                Save Changes
              </Button>
            </div>
          )}

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

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to save these changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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

export default UserProfileForm;
