import React from "react";
import { Button } from "@mui/material";
import { InputField, SelectField } from "../../form";

const CustomerForm = ({ customerData, onSubmit, methods }) => {
  return (
    <>
      <div>
        <p className="text-4xl font-semibold">Customer Information</p>
        <p className="text-gray-600 text-lg my-2">
          Update your customer information here.
        </p>
        <div className="border-b border-gray-300 my-4"></div>
      </div>
      <div className="max-w-5xl">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {/* Customer Name Field */}
          <div>
            <label className="block mb-2">Customer Name</label>
            <InputField
              name="customerName"
              label="Customer Name"
              fullWidth
              isHidden
              rules={{ required: "Customer name is required" }}
              placeholder="Enter your customer name"
            />
          </div>

          {/* Age Field */}
          <div>
            <label className="block mb-2">Age</label>
            <InputField
              name="age"
              label="Age"
              type="number"
              isHidden
              fullWidth
              rules={{
                required: "Age is required",
                min: { value: 1, message: "Age must be at least 1" },
              }}
              placeholder="Enter your age"
            />
          </div>

          {/* Gender Field */}
          <div>
            <SelectField
              name="gender"
              label="Gender"
              fullWidth
              isHidden
              rules={{ required: "Gender is required" }}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block mb-2">Phone Number</label>
            <InputField
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              isHidden
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "Enter a valid phone number",
                },
              }}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address Field */}
          <div>
            <label className="block mb-2">Address</label>
            <InputField
              name="address"
              label="Address"
              fullWidth
              isHidden
              rules={{ required: "Address is required" }}
              placeholder="Enter your address"
            />
          </div>

          {/* Created At Field (Read-Only) */}
          <div>
            <label className="block mb-2">Created At</label>
            <InputField
              name="createdAt"
              label="Created At"
              fullWidth
              readOnly
              isHidden
            />
          </div>

          {/* Updated At Field (Read-Only) */}
          <div>
            <label className="block mb-2">Updated At</label>
            <InputField
              name="updatedAt"
              label="Updated At"
              fullWidth
              readOnly
              isHidden
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerForm;
