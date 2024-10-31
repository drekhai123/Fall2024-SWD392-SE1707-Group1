// eslint-disable-next-line
import { baseUrl,localhostUrl,headers } from './Url'
import axios from 'axios'
const getAllCustomerURL = baseUrl+'/Customer'

export async function GetAllCustomers() {
    var allCustomers = null
    await axios.get(getAllCustomerURL,headers)
    .then(response =>{allCustomers = response.data;})
    .catch(error => {
      console.error(error)
      alert('Error fetching Customer data')
    })
  return allCustomers
}
export async function AddNewCustomer(data) {
  var customer = null
  await axios.post(getAllCustomerURL,data,headers)
  .then(response =>{customer = response.data;})
  .catch(error => {
    console.error("Error fetching Customer:", error);
    // alert('Error fetching Customer data')
  })
return customer
}
export async function GetCustomerById(id) {
  var customer = null
  try {
    const response = await axios.get(`${getAllCustomerURL}/${id}`, headers);
    customer = response.data;
    return customer;
  } catch (error) {
    console.error("Error fetching Customer:", error);
    throw error;
  }
}

export async function UpdateCustomer(id, Customer) {
  try {
    const response = await axios.put(
      `${getAllCustomerURL}/${id}`,
      Customer,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error updating Customer:", error);
    throw error;
  }
}