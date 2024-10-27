import { baseUrl, headers } from './Url'
import axios from 'axios'

const addFeedbackURL = baseUrl + '/api/FeedBack/' // URL for adding feedback
const updateFeedbackURL = baseUrl + '/api/FeedBack/' // URL for updating feedback
const deleteFeedbackURL = baseUrl + '/api/FeedBack/' // URL for deleting feedback
const getFeedbackURL = baseUrl + '/api/FeedBack/' // URL for getting feedback by ID
const getFeedbackByCustomerURL = baseUrl + '/api/FeedBack/customer/' // URL for getting feedback by customer ID
const getFeedbackByOrderURL = baseUrl + '/api/FeedBack/order/' // URL for getting feedback by order ID

// Function to add feedback
export async function addFeedback(feedback) {
    try {
        const response = await axios.post(addFeedbackURL, feedback); // Send POST request
        return response.data; // Return the added feedback data
    } catch (error) {
        console.error('Error adding feedback:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to update feedback
export async function updateFeedback(id, feedback) {
    try {
        const response = await axios.put(updateFeedbackURL + id, feedback, headers); // Send PUT request
        return response.data; // Return the updated feedback data
    } catch (error) {
        console.error('Error updating feedback:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to delete feedback
export async function deleteFeedback(id) {
    try {
        await axios.delete(deleteFeedbackURL + id); // Send DELETE request
    } catch (error) {
        console.error('Error deleting feedback:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to get feedback by ID
export async function getFeedbackById(id) {
    try {
        const response = await axios.get(getFeedbackURL + id);
        return response.data; // Return the feedback
    } catch (error) {
        console.error('Error fetching feedback:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to get feedback by customer ID
export async function getFeedbackByCustomerId(customerId) {
    try {
        const response = await axios.get(getFeedbackByCustomerURL + customerId);
        return response.data; // Return the feedback
    } catch (error) {
        console.error('Error fetching feedback by customer ID:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to get feedback by order ID
export async function getFeedbackByOrderId(orderId) {
    try {
        const response = await axios.get(getFeedbackByOrderURL + orderId);
        return response.data; // Return the feedback
    } catch (error) {
        console.error('Error fetching feedback by order ID:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}
