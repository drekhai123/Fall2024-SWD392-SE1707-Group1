import { baseUrl, headers, getJwtToken } from './Url';
import axios from 'axios';

const addFishProfileURL = baseUrl + '/FishProfile/'; // URL for adding fish profiles
const updateFishProfileURL = baseUrl + '/FishProfile/'; // URL for updating fish profiles
const deleteFishProfileURL = baseUrl + '/FishProfile/'; // URL for deleting fish profiles
const getFishProfileURL = baseUrl + '/FishProfile/Customer/'; // URL for getting fish profiles by customer ID
const searchProfileURL = baseUrl + '/FishProfile/';


// Function to add a fish profile
export async function addFishProfile(fish) {
    const token = getJwtToken();
    try {
        const response = await axios.post(addFishProfileURL, fish, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send POST request
        return response.data; // Return the added fish profile data
    } catch (error) {
        console.error('Error adding fish profile:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to find a profile by name
export async function findProfileByName(id, name) {
    const token = getJwtToken();
    try {
        const response = await axios.get(`${searchProfileURL}${id}/search?name=${name}`, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send GET request
        return response; // Return the found fish profile data
    } catch (error) {
        console.error('Error finding fish profile:', error);
        return error; // Return the error for handling in the calling function
    }
}

// Function to update a fish profile
export async function updateFishProfile(id, fish) {
    const token = getJwtToken();
    try {
        const response = await axios.put(`${updateFishProfileURL}${id}`, fish, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send PUT request
        return response.data; // Return the updated fish profile data
    } catch (error) {
        console.error('Error updating fish profile:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to delete a fish profile
export async function deleteFishProfile(id) {
    const token = getJwtToken();
    try {
        await axios.delete(`${deleteFishProfileURL}${id}`, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        }); // Send DELETE request
    } catch (error) {
        console.error('Error deleting fish profile:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to get fish profiles by customer ID
export async function getFishProfileByCustomerId(id) {
    const token = getJwtToken();
    try {
        const response = await axios.get(`${getFishProfileURL}${id}`, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching fish profiles:', error);
        throw error;
    }
}
