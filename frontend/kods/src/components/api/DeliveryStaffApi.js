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
export async function checkAccountIdExists(accountId) {
  try {
    // Function to check if the accountId exists in the database
    const response = await axios.get(`${getAllDeliveryStaffURL}/${accountId}`, { headers: getHeaders() });
    return response.data.exists; // Assuming the API returns { exists: true/false }
  } catch (error) {
    console.error('Error checking account existence:', error);
    return false; // Default to false if the request fails
  }
}
// Function to create a new delivery staff member
export const createNewDeliveryStaff = async (deliveryStaffData) => {
  const response = await axios.post(getAllDeliveryStaffURL, deliveryStaffData, { headers: getHeaders() })
  if (!response.ok) {
    throw new Error('Failed to create delivery staff');
  }
  return await response.json();
};
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
