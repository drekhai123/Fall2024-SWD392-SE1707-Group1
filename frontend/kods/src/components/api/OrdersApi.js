// eslint-disable-next-line
import { baseUrl, headers, getJwtToken } from './Url';
import axios from 'axios'
const getOrderByCustomerIdUrl = baseUrl+'/Orders/customer/'
const getOrderbyOrderIdUrl = baseUrl+'/Orders/'
const getOrderDetailsByOrderIdUrl = baseUrl+'/OrderDetails/Order/'
const postOrdersUrl = baseUrl+'/Orders/'



export async function postOrders(orderData) {
    const token = getJwtToken();
    try {
        const response = await axios.post(postOrdersUrl, orderData, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request ););
        return await response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

export async function getOrderByCustomerId(customerId) {
    const token = getJwtToken();

    try {
        const response = await axios.get(getOrderByCustomerIdUrl + customerId, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request);
        return await response.data;
    } catch (error) {
        console.error('Error fetching fish profiles:', error);
        throw error;
    }
}
export async function getOrderbyOrderId(orderId) {
    const token = getJwtToken();
    try {
        const response = await axios.get(getOrderbyOrderIdUrl + orderId, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request ););
        return await response.data;
    } catch (error) {
        console.error('Error fetching fish profiles:', error);
        throw error;
    }
}

export async function getOrderDetailsByOrderId(orderId) {
    const token = getJwtToken();
    try {
        const response = await axios.get(getOrderDetailsByOrderIdUrl + orderId, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request );
        return await response.data;
    } catch (error) {
        console.error('Error fetching fish profiles:', error);
        throw error;
    }
}
