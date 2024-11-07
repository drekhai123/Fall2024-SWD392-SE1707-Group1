// eslint-disable-next-line
import { baseUrl, headers, getJwtToken } from './Url';
import axios from 'axios'
const getOrderByCustomerIdUrl = baseUrl + '/Orders/customer/'
const getOrderbyOrderIdUrl = baseUrl + '/Orders/'
const getOrderDetailsByOrderIdUrl = baseUrl + '/OrderDetails/Order/'
const deleteOrderDetailsByIdUrl = baseUrl + '/OrderDetails/'

// const getAllOrderDetailsByCustomerIdURl= baseUrl+'/OrderDetails/'
const postOrderDetailsByOrderIdUrl = baseUrl + '/OrderDetails/'
const postOrdersUrl = baseUrl + '/Orders/'
const updateDeliveryStatusUrl = baseUrl + '/Orders/';
const getAllOrdersUrl = baseUrl + '/Orders/';
const updateOrderStatusUrl = baseUrl + '/Orders/OrderStatus/';
const updatePaymentStatusUrl = baseUrl + '/Orders/PaymentStatus/';

const getHeaders = () => {
    const token = getJwtToken(); // Retrieve the token
    return {
        ...headers,
        'Authorization': `Bearer ${token}`, // Add the token to the headers
    };
};
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
export async function GetAllOrders() {
    try {
        const response = await axios.get(`${getAllOrdersUrl}`, { headers: getHeaders() }); // Use the getHeaders function
        return response;
    } catch (error) {
        console.error("Error fetching Orders:", error);
        throw error; // Throw error to be handled in the calling function
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
// export async function updateDeliveryStatus(orderId, deliveryStatus) {
//     const token = getJwtToken();
//     try {
//         const response = await axios.put(`${updateDeliveryStatusUrl}${orderId}/status`, { deliveryStatus }, {
//             headers: {
//                 ...headers,
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return await response.data;
//     } catch (error) {
//         console.error('Error updating order status:', error);
//         throw error;
//     }
// }

export async function getAllOrderDetails(token) {
    try {
        const response = await axios.get(`${baseUrl}/OrderDetails`, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
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

// Function to deleteOrderDetailsById
export async function deleteOrderDetailsById(detailsId) {
    const token = getJwtToken();
    try {
        const response = await axios.delete(`${deleteOrderDetailsByIdUrl}${detailsId}`, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting order details:', error);
        throw error;
    }
}

// Function to update order status using PATCH

export async function updateOrderStatus(orderId,deliveryStatus) {
    const token = getJwtToken();
    try {
        const response = await axios.patch(`${updateOrderStatusUrl}${orderId}`,deliveryStatus, {

            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data; // Return the response data directly
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}

export async function updatePaymentStatus(id,data) {
    const token = getJwtToken();
    try {
        const response = await axios.patch(`${updatePaymentStatusUrl}${id}`,data, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error deleting order details:', error);
        throw error;
    }
}


