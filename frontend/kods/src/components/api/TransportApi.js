import { localhostUrl, baseUrl, headers, getJwtToken } from "./Url";
import axios from "axios";
const getAllTransportURL = baseUrl + "/Transport";
const getTransportByDeliveryStaffURL = baseUrl + "/Transport/DeliveryStaff/";
const getTransportLogURL = baseUrl + "/LogTransport"
const updateTransportStatus = baseUrl + "/Transport/Status/";
// Function to get headers with token
const getHeaders = () => {
  const token = getJwtToken(); // Retrieve the token
  return {
    ...headers,
    'Authorization': `Bearer ${token}`, // Add the token to the headers
  };
};

export async function GetTransportByDeliveryStaffId(id) {
  try {
    const response = await axios.get(`${getTransportByDeliveryStaffURL}/${id}`, { headers: getHeaders() });
    return response;
  } catch (error) {
    console.error("Error fetching Transport:", error);
    return error;
  }
}

export async function updateTransportById(id,data) {
  try {
    const response = await axios.get(`${updateTransportStatus}${id}`, data,{ headers: getHeaders() });
    return response;
  } catch (error) {
    console.error("Error fetching Transport:", error);
    return error;
  }
}



export async function AddTransportLog(data) {
  try {
    const response = await axios.post(`${getTransportLogURL}`, data, { headers: getHeaders() });
    return response;
  } catch (error) {
    console.error("Error adding Transport Log:", error);
    return error;
  }
}
export async function GetAllTransports() {
  try {
    const response = await axios.get(`${getAllTransportURL}`, { headers: getHeaders() });
    const filteredTransports = response.data.filter(transport => transport.transportId !== 0); // Filter out transports with ID = 0
    return filteredTransports; // Return the filtered list
  } catch (error) {
    console.error("Error getting All Transports :", error);
    return error;
  }
}

