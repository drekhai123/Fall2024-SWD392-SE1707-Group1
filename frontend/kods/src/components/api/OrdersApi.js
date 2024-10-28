// eslint-disable-next-line
import { baseUrl,localhostUrl,headers } from './Url'
import axios from 'axios'
const getOrderByCustomerIdUrl = baseUrl+'/Orders/customer/'

export async function getOrderByCustomerId(customerId) {
    try {
        const response = await axios.get(getOrderByCustomerIdUrl + customerId);
        return await response.data;
    } catch (error) {
        console.error('Error fetching fish profiles:', error);
        throw error;
    }
}