// eslint-disable-next-line
import { baseUrl, localhostUrl, headers, getJwtToken } from './Url';
import axios from 'axios';

const getAllCustomerURL = baseUrl + '/Customer';
// Function to get headers with token
const getHeaders = () => {
  const token = getJwtToken(); // Retrieve the token
  return {
    ...headers,
    'Authorization': `Bearer ${token}`, // Add the token to the headers
  };
};

// export async function GetAllCustomers() {
//   var allCustomers = null;

//   await axios.get(getAllCustomerURL, { headers: getHeaders() })
//     .then(response => { allCustomers = response.data; })
//     .catch(error => {
//       console.error(error);
//       alert('Error fetching Customer data');
//     });
//   return allCustomers;
// }
export async function GetAllCustomers() {
  try {
    const response = await axios.get(`${getAllCustomerURL}`, { headers: getHeaders() }); // Use the getHeaders function
    return response;
  } catch (error) {
    console.error("Error fetching Customer:", error);
    throw error; // Throw error to be handled in the calling function
  }
}
export async function UpdateCustomer(id, data) {
  try {
    const response = await axios.put(`${getAllCustomerURL}/${id}`, data, { headers: getHeaders() }); // Use the getHeaders function
    return response;
  } catch (error) {
    console.error("Error fetching Customer:", error);
    throw error; // Throw error to be handled in the calling function
  }
}
export async function AddNewCustomer(data) {

  var customer = null;
  await axios.post(getAllCustomerURL, data, { headers: getHeaders() })
    .then(response => { customer = response.data; })
    .catch(error => {
      console.error("Error fetching Customer:", error);
      // alert('Error fetching Customer data')
    });
  return customer;

}

export async function GetCustomerById(id) {
  var customer = null;
  try {
    const response = await axios.get(`${getAllCustomerURL}/${id}`, { headers: getHeaders() });
    customer = response.data;
    return customer;
  } catch (error) {
    console.error("Error fetching Customer:", error);
    throw error;
  }
}

// export async function UpdateCustomer(id, customerData) {
//   try {
//     const response = await axios.put(
//       `${getAllCustomerURL}/${id}`,
//       customerData,
//       { headers: getHeaders() }
//     );
//     return await response.data;
//   } catch (error) {
//     console.error("Error updating Customer:", error);
//     throw error;
//   }
// }