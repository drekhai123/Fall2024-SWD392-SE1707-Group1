import React from "react";
import { Button } from "@mui/material"; // Keep Material UI Button
import { InputField } from "../../form"; // Import InputField from your form components

const UserProfileForm = ({ onSubmit, methods }) => {
  return (
    <>
      <div>
        <p className="text-4xl font-semibold">Profile</p>
        <p className="text-gray-600 text-lg my-2">
          This is your user profile. You can update your name and email here.
        </p>
        <div className="border-b border-gray-300 my-4"></div>
      </div>
      <div className="max-w-5xl">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {/* User Name Field */}
          <div>
            <label className="block mb-2">Change your user name here</label>
            <InputField
              defaultValue="User Name"
              name="userName"
              label="User Name"
              fullWidth
              rules={{ required: "User name is required" }}
              placeholder="Enter your user name"
              style={{ boxSizing: 'border-box' }}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-2">Change your email here</label>
            <InputField
            defaultValue="Email"
              name="email"
              label="Email"
              fullWidth
              type="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Enter a valid email address",
                },
              }}
              placeholder="Enter your email"
              style={{ boxSizing: 'border-box' }}
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </div>

          {/* Delete Account Button */}
          <div className="mt-4">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete your account?"
                  )
                ) {
                  // Handle account deletion
                }
              }}
            >
              Delete Account
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfileForm;
