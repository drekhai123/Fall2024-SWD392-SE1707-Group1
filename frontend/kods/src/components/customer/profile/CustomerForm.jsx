// import React, { useEffect, useState } from "react";
// import { Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import { InputField } from "../../form";
// import { UpdateCustomer } from "../../api/CustomerApi";

// const CustomerForm = ({ customerData, onSubmit, methods }) => {
//   const [customer, setCustomer] = useState(customerData);
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     setCustomer(customerData);
//   }, [customerData]);

  // const handleChange = (field) => (e) => {
  //   let value = e.target.value;

  //   // Automatically prepend '+84 ' if the phone number starts with '84'
  //   if (field === "phoneNumber" && value.startsWith('84') && !value.startsWith('+84 ')) {
  //     value = `+84 ${value.slice(2)}`;
  //   }

  //   setCustomer((prev) => {
  //     const updatedCustomer = { ...prev, [field]: value };
  //     console.log('Updated Customer:', updatedCustomer);
  //     return updatedCustomer;
  //   });
  // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Submitting Customer:', customer);
//     try {
//       const updatedCustomer = await UpdateCustomer(customer.customerId, {
//         customerName: customer.customerName,
//         dob: customer.dob,
//         gender: customer.gender,
//         phoneNumber: customer.phoneNumber,
//         address: customer.address,
//       });
//       console.log('Customer updated successfully:', updatedCustomer);
//       onSubmit(updatedCustomer);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error updating customer:', error);
//     }
//   };

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   // const handleMenuClose = (value) => {
//   //   setCustomer((prev) => ({ ...prev, gender: value }));
//   //   setAnchorEl(null);
//   // };

//   return (
//     <>
//       <div>
//         <p className="text-4xl font-semibold">Customer Information</p>
//         <p className="text-gray-600 text-lg my-2">
//           Update your customer information here.
//         </p>
//         <div className="border-b border-gray-300 my-4"></div>
//       </div>
//       <div className="max-w-5xl">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Customer Name Field */}
//           <div>
//             <label className="block mb-2">Customer Name</label>
//             <InputField
//               name="customerName"
//               fullWidth
//               placeholder="Enter your customer name"
//               value={customer?.customerName || ""}
//               onChange={handleChange("customerName")}
//             />
//           </div>

//           {/* Date of Birth Field */}
//           <div>
//             <label className="block mb-2">Date of Birth</label>
//             <InputField
//               name="dob"
//               type="date"
//               fullWidth
//               placeholder="Enter your date of birth"
//               value={customer?.dob || ""}
//               onChange={handleChange("dob")}
//             />
//           </div>

//           {/* Gender Field as Select Dropdown */}
//           <div>
//             <FormControl fullWidth>
//             <label className="block mb-2">Gender</label>
//               <Select
//                 value={customer?.gender || ""}
//                 onChange={handleChange("gender")}
//                 fullWidth
//               >
//                 <MenuItem value="Male">Male</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//                 <MenuItem value="Others">Others</MenuItem>
//               </Select>
//             </FormControl>
//           </div>

//           {/* Phone Number Field */}
          // <div>
          //   <label className="block mb-2">Phone Number</label>
          //   <InputField
          //     name="phoneNumber"
          //     type="tel"
          //     fullWidth
          //     rules={{
          //       pattern: {
          //         value: /^(\+?0\d{9}|\+?84\d{9})$/,
          //         message: "Enter a valid phone number starting with 0 or +84 and having 10 or 11 digits",
          //       },
          //     }}
          //     placeholder="Enter your phone number"
          //     value={customer?.phoneNumber || ""}
          //     onChange={handleChange("phoneNumber")}
          //   />
          // </div>

//           {/* Address Field */}
//           <div>
//             <label className="block mb-2">Address</label>
//             <InputField
//               name="address"
//               fullWidth
//               rules={{ required: "Address is required" }}
//               placeholder="Enter your address"
//               value={customer?.address || ""}
//               onChange={handleChange("address")}
//             />
//           </div>

//           {/* Submit Button */}
//           <div>
//             <Button type="submit" variant="contained" color="primary">
//               Save Changes
//             </Button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default CustomerForm;
