import { baseUrl, headers, getJwtToken } from "./Url";
import axios from "axios";
const getAllPaymentsURL = baseUrl + "/VNPay";

// Function to get headers with token
const getHeaders = () => {
  const token = getJwtToken(); // Retrieve the token
  return {
    ...headers,
    'Authorization': `Bearer ${token}`, // Add the token to the headers
  };
};
export async function GetAllPayments() {
  try {
    const response = await axios.get(`${getAllPaymentsURL}`, { headers: getHeaders() }); // Use the getHeaders function
    return response;
  } catch (error) {
    console.error("Error fetching Delivery Staff:", error);
    throw error; // Throw error to be handled in the calling function
  }
}