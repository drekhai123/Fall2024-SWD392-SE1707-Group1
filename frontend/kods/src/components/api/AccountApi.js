import { localhostUrl, baseUrl, headers, getJwtToken } from "./Url";
import axios from "axios";

const baseAccount = baseUrl + "/Account";
const localhostAccount = localhostUrl + "/Account";
const verifyAccount = baseAccount + "/AddVerification";

// Function to get headers with token
const getHeaders = () => {
  const token = getJwtToken(); // Retrieve the token
  return {
    ...headers,
    'Authorization': `Bearer ${token}`, // Add the token to the headers
  };
};

export async function GetAccountById(id) {
  try {
    const response = await axios.get(`${baseAccount}/${id}`, { headers: getHeaders() });
    return response;
  } catch (error) {
    console.error("Error fetching Account:", error);
    throw error;
  }
}

export async function ToggleAccountBannedStatus(id, bannedStatus) {
  try {
    const response = await axios.patch(`${localhostAccount}/ToggleBanned/${id}`, { banned: bannedStatus }, { headers: getHeaders() });
    return response;
  } catch (error) {
    console.log(localhostAccount);
    console.error("Error toggling banned status:", error);
    throw error; // Ensure the error is thrown to be caught in the calling function
  }
}
export async function GetAllAccount() {
  try {
    const response = await axios.get(`${baseAccount}`, { headers: getHeaders() }); // Use the getHeaders function
    return response;
  } catch (error) {
    console.error("Error fetching Account:", error);
    throw error; // Throw error to be handled in the calling function
  }
}

export async function AddNewAccount(data) {
  try {
    const response = await axios.post(`${baseAccount}/AddCustomer`, data, { headers: getHeaders() });
    return response;
  } catch (error) {
    console.error("Error adding Account:", error);
    throw error;
  }
}

export async function VerifyAccount(id) {
  try {
    const response = await axios.post(`${verifyAccount}/${id}`, headers);
    return response;
  } catch (error) {
    console.error("Error Sending Verification Account:", error);
    throw error;
  }
}

export async function UpdateAccount(id, Account) {
  try {
    const response = await axios.put(`${baseAccount}/${id}`, Account, headers);
    return response;
  } catch (error) {
    console.error("Error updating Account:", error);
    throw error;
  }
}

export async function DeleteAccount(id) {
  try {
    const response = await axios.delete(`${baseAccount}/${id}`, headers);
    return response;
  } catch (error) {
    console.error("Error deleting Account:", error);
    throw error;
  }
}
