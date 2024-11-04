import { toast } from "react-toastify";
import { baseUrl, headers, getJwtToken } from "./Url";
import axios from "axios";
const getAllDeliveryStaffURL = baseUrl + "/DeliveryStaff";

// Function to get headers with token
const getHeaders = () => {
  const token = getJwtToken(); // Retrieve the token
  return {
    ...headers,
    'Authorization': `Bearer ${token}`, // Add the token to the headers
  };
};
export async function checkDeliveryStaffAccountIdExists(accountId) {
  // Function to check if the accountId exists in the database
  const response = await axios.get(`${getAllDeliveryStaffURL}/DeliveryStaffAccount/${accountId}`, { headers: getHeaders() });
  if (response.data !== null) {
    toast('Delivery staff account already exists.');
  }
}

export async function createNewDeliveryStaff(deliveryStaffData) {
  try {
    const response = await axios.post(getAllDeliveryStaffURL, deliveryStaffData, { headers: getHeaders() });
    return response.data; // Assuming the API returns the created staff data
  } catch (error) {
    console.error('Error creating new staff:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
}
// Function to get all delivery staff members
export const getAllDeliveryStaff = async () => {
  const response = await axios.get(getAllDeliveryStaffURL, { headers: getHeaders() });
  return response.data;
};
// Function to get a delivery staff member by ID
export const getDeliveryStaffById = async (id) => {
  const response = await axios.get(`${getAllDeliveryStaffURL}/${id}`, { headers: getHeaders() });
  return response.data;
};
