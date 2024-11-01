import { baseUrl, headers,getJtwToken } from "./Url";
import axios from "axios";
const baseAccount = baseUrl + "/Account";
const verifyAccount = baseAccount + "/AddVerification"
export async function GetAccountById(id) {
  try {
    const response = await axios.get(`${baseAccount}/${id}`, headers);
    return response;
  } catch (error) {
    console.error("Error fetching Account:", error);
    throw error;
  }
}

export async function GetAllAccount() {
  const token = getJtwToken();
  try {
    console.log(token)
    const response = await axios.get(`${baseAccount}`, 
      {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
    return response;
  } catch (error) {
    console.error("Error fetching Account:", error);
    throw error;
  }
}

export async function AddNewAccount(data) {
  try {
    const response = await axios.post(`${baseAccount}/AddCustomer`, data, headers);
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
