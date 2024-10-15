// eslint-disable-next-line
import { baseUrl,localhostUrl,headers } from './Url'
import axios from 'axios'
const getAllCustomerURL = baseUrl+'/Customer'

export async function GetAllCustomers() {
    var allCustomers = null
    await axios.get(getAllCustomerURL,headers)
    .then(response =>{allCustomers = response.data;
    console.log(allCustomers)})
    .catch(error => {
      console.error(error)
      alert('Error fetching Customer data')
    })
  return allCustomers
}
