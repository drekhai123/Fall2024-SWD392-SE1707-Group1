import { toast } from "react-toastify";
import { baseUrl, headers, getJwtToken } from "./Url";
import axios from "axios";
const getAllHealthCareStaffURL = baseUrl + "/HealthCareStaff";
const healthStatusURL = baseUrl + "/HealthStatus";

// Function to get headers with token
const getHeaders = () => {
  const token = getJwtToken(); // Retrieve the token
  return {
    ...headers,
    'Authorization': `Bearer ${token}`, // Add the token to the headers
  };
};
// export async function checkDeliveryStaffAccountIdExists(accountId) {
//   // Function to check if the accountId exists in the database
//   const response = await axios.get(`${getAllDeliveryStaffURL}/DeliveryStaffAccount/${accountId}`, { headers: getHeaders() });
//   if (response.data !== null) {
//     toast('Delivery staff account already exists.');
//   }
// }

export async function createNewHealthCareStaff(healthCareStaffData) {
  try {
    const response = await axios.post(getAllHealthCareStaffURL, healthCareStaffData, { headers: getHeaders() });
    return response.data; // Assuming the API returns the created staff data
  } catch (error) {
    console.error('Error creating new staff:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
}
export async function GetAllHealthCareStaff() {
  try {
    const response = await axios.get(`${getAllHealthCareStaffURL}`, { headers: getHeaders() }); // Use the getHeaders function
    return response;
  } catch (error) {
    console.error("Error fetching HealthCare Staff:", error);
    throw error; // Throw error to be handled in the calling function
  }
}


// Function to get a delivery staff member by ID
export const getHealthCareStaffById = async (id) => {
  const response = await axios.get(`${getAllHealthCareStaffURL}/${id}`, { headers: getHeaders() });
  return response.data;
};
export async function UpdateHealthCareStaff(id, data) {
  try {
    const response = await axios.put(`${getAllHealthCareStaffURL}/${id}`, data, { headers: getHeaders() }); // Use the getHeaders function
    return response;
  } catch (error) {
    console.error("Error fetching HealthCare Staff:", error);
    throw error; // Throw error to be handled in the calling function
  }
}

export async function createHealthStatus(healthStatusData) {
  try {
    const response = await axios.post(healthStatusURL, healthStatusData, { headers: getHeaders() });
    return response.data; // Assuming the API returns the created health status data
  } catch (error) {
    console.error('Error creating health status:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
}


