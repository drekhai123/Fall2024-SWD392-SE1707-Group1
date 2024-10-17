import { localhostUrl, baseUrl, headers } from "./Url";
import axios from "axios";
const baseAccount = baseUrl + "/Account";
export async function GetAccountById(id) {
  try {
    const response = await axios.get(`${baseAccount}/${id}`, headers);
    return response;
  } catch (error) {
    console.error("Error fetching Account:", error);
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
