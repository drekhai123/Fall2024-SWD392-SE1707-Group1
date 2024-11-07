import { toast } from "react-toastify";
import { baseUrl, headers, getJwtToken } from "./Url";
import axios from "axios";
const getAllStaffURL = baseUrl + "/Staff";

const getHeaders = () => {
  const token = getJwtToken(); // Retrieve the token
  return {
    ...headers,
    'Authorization': `Bearer ${token}`, // Add the token to the headers
  };
};
export async function checkStaffAccountIdExists(accountId) {
  // Function to check if the accountId exists in the database
  const response = await axios.get(`${getAllStaffURL}/StaffAccount/${accountId}`, { headers: getHeaders() });
  if (response.data !== null) {
    toast('Staff account already exists.');
  }
}
export async function UpdateStaff(id, data) {
  try {
    const response = await axios.put(`${getAllStaffURL}/${id}`, data, { headers: getHeaders() }); // Use the getHeaders function
    return response;
  } catch (error) {
    console.error("Error fetching Staff:", error);
    throw error; // Throw error to be handled in the calling function
  }
}
export async function GetAllStaff() {
  try {
    const response = await axios.get(`${getAllStaffURL}`, { headers: getHeaders() }); // Use the getHeaders function
    return response;
  } catch (error) {
    console.error("Error fetching Staff:", error);
    throw error; // Throw error to be handled in the calling function
  }
}
export async function GetStaffByAccountId(id) {
  try {
    const response = await axios.get(`${getAllStaffURL}/StaffAccount/${id}`, { headers: getHeaders() }); // Use the getHeaders function
    return response;
  } catch (error) {
    console.error("Error fetching Staff:", error);
    throw error; // Throw error to be handled in the calling function
  }
}

// export async function GetAllStaffs() {
//   var allStaff = null;
//   await axios
//     .get(getAllStaffURL, { headers: getHeaders() })
//     .then((response) => {
//       allStaff = response.data;
//     })
//     .catch((error) => {
//       console.error(error);
//       alert("Error fetching Staff data");
//     });
//   return allStaff;
// }
// Function to create a new staff member
export async function createNewStaff(staffData) {
  try {
    const response = await axios.post(getAllStaffURL, staffData, { headers: getHeaders() });
    return response.data; // Assuming the API returns the created staff data
  } catch (error) {
    console.error('Error creating new staff:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
}
