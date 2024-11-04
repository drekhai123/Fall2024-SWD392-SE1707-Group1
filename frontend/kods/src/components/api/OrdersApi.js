// eslint-disable-next-line
import { baseUrl, headers, getJwtToken } from './Url';
import axios from 'axios'
const getOrderByCustomerIdUrl = baseUrl+'/Orders/customer/'
const getOrderbyOrderIdUrl = baseUrl+'/Orders/'
const getOrderDetailsByOrderIdUrl = baseUrl+'/OrderDetails/Order/'
// const getAllOrderDetailsByCustomerIdURl= baseUrl+'/OrderDetails/'
const postOrderDetailsByOrderIdUrl = baseUrl+'/OrderDetails/'
const postOrdersUrl = baseUrl+'/Orders/'
const updateDeliveryStatusUrl = baseUrl + '/Orders/';

// Function to postOrders
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

// Function to getOrderByCustomerId
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

// Function to getOrderbyOrderId
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

// Function to postOrderDetailsByOrderId
export async function postOrderDetailsByOrderId(orderData) {
    const token = getJwtToken();
    try {
        const response = await axios.post(postOrderDetailsByOrderIdUrl, orderData, {
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

// Function to getOrderDetailsByOrderId
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

// Function to update order status
export async function updateDeliveryStatus(orderId, deliveryStatus) {
    const token = getJwtToken();
    try {
        const response = await axios.put(`${updateDeliveryStatusUrl}${orderId}/status`, { deliveryStatus }, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}

// export async function getAllOrderDetailsByCustomerId(fishProfileId) {
//     const token = getJwtToken();
//     try {
//         const response = await axios.get(getAllOrderDetailsByCustomerIdURl + fishProfileId, {
//             headers: {
//                 ...headers,
//                 'Authorization': `Bearer ${token}`
//             }
//         }); // Send POST request );
//         return await response.data;
//     } catch (error) {
//         console.error('Error fetching fish profiles:', error);
//         throw error;
//     }
// }
