import { localhostUrl, baseUrl, headers, getJwtToken } from "./Url";
import axios from "axios";
const getAllTransportURL = baseUrl + "/Transport";
const getTransportByDeliveryStaffURL = baseUrl + "/Transport/DeliveryStaff/";

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
  