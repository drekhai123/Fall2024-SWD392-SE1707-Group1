// eslint-disable-next-line
import { baseUrl,localhostUrl,headers } from './Url'
import axios from 'axios'
const getOrderByCustomerIdUrl = baseUrl+'/Orders/customer/'
const getOrderbyOrderIdUrl = baseUrl+'/Orders/'
const getOrderDetailsByOrderIdUrl = baseUrl+'/OrderDetails/Order/'


export async function getOrderByCustomerId(customerId) {
    try {
        const response = await axios.get(getOrderByCustomerIdUrl + customerId);
        return await response.data;
    } catch (error) {
        console.error('Error fetching fish profiles:', error);
        throw error;
    }
}
export async function getOrderbyOrderId(orderId) {
    try {
        const response = await axios.get(getOrderbyOrderIdUrl + orderId);
        return await response.data;
    } catch (error) {
        console.error('Error fetching fish profiles:', error);
        throw error;
    }
}

export async function getOrderDetailsByOrderId(orderId) {
    try {
        const response = await axios.get(getOrderDetailsByOrderIdUrl + orderId);
        return await response.data;
    } catch (error) {
        console.error('Error fetching fish profiles:', error);
        throw error;
    }
}
