import { baseUrl, headers, getJwtToken } from './Url';
import axios from 'axios'

const addFeedbackURL = baseUrl + '/FeedBack/' // URL for adding feedback
const updateFeedbackURL = baseUrl + '/FeedBack/' // URL for updating feedback
const deleteFeedbackURL = baseUrl + '/FeedBack/' // URL for deleting feedback
const getFeedbackURL = baseUrl + '/FeedBack/' // URL for getting feedback by ID
const getFeedbackByCustomerURL = baseUrl + '/FeedBack/customer/' // URL for getting feedback by customer ID
const getFeedbackByOrderURL = baseUrl + '/FeedBack/order/' // URL for getting feedback by order ID

// Function to add feedback
export async function addFeedback(feedback) {
    const token = getJwtToken();
    try {
        const response = await axios.post(addFeedbackURL, feedback, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request );); // Send POST request
        return await response.data; // Return the added feedback data
    } catch (error) {
        console.error('Error adding feedback:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to update feedback
export async function updateFeedback(id, feedback) {
    const token = getJwtToken();
    try {
        const response = await axios.put(updateFeedbackURL + id, feedback, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request );); // Send PUT request
        return response.data; // Return the updated feedback data
    } catch (error) {
        console.error('Error updating feedback:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to delete feedback
export async function deleteFeedback(feedbackId) {
    const token = getJwtToken();
    try {
        await axios.delete(deleteFeedbackURL + feedbackId, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request );); // Send DELETE request
        console.log(`Feedback with ID ${feedbackId} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting feedback:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to get feedback by ID
export async function getFeedbackById(id) {
    const token = getJwtToken();
    try {
        const response = await axios.get(getFeedbackURL + id, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request ););
        return response.data; // Return the feedback
    } catch (error) {
        console.error('Error fetching feedback:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to get feedback by customer ID
export async function getFeedbackByCustomerId(customerId) {
    const token = getJwtToken();
    try {
        const response = await axios.get(getFeedbackByCustomerURL + customerId, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request ););
        return response.data; // Return the feedback
    } catch (error) {
        console.error('Error fetching feedback by customer ID:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to get feedback by order ID
export async function getFeedbackByOrderId(orderId) {
    const token = getJwtToken();
    try {
        const response = await axios.get(getFeedbackByOrderURL + orderId, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request ););
        return response.data; // Return the feedback
    } catch (error) {
        console.error('Error fetching feedback by order ID:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}
