import { baseUrl, headers } from './Url'
import axios from 'axios'

const addFishProfileURL = baseUrl + '/FishProfile/' // URL for adding fish profiles
const updateFishProfileURL = baseUrl + '/FishProfile/' // URL for updating fish profiles
const deleteFishProfileURL = baseUrl + '/FishProfile/' // URL for deleting fish profiles
const getFishProfileURL = baseUrl + '/FishProfile/Customer/' // URL for getting fish profiles by customer ID
const searchProfileURL = baseUrl + '/FishProfile/'
// Function to add a fish profile
export async function addFishProfile(fish) {
    try {
        const response = await axios.post(addFishProfileURL, fish); // Send POST request
        return await response.data; // Return the added fish profile data
    } catch (error) {
        console.error('Error adding fish profile:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}
export async function findProfileByName(id,name) {
    try {
        const response = await axios.get(searchProfileURL+`${id}/search?name=${name}`); // Send POST request
        return response; // Return the added fish profile data
    } catch (error) {
        console.error('Error adding fish profile:', error);
        return error; // Rethrow the error for handling in the calling function
    }
}

// Function to update a fish profile
export async function updateFishProfile(id,fish) {
    try {
        const response = await axios.put(updateFishProfileURL + id,fish,headers)// Send PUT request
        return await response.data; // Return the updated fish profile data
    } catch (error) {
        console.error('Error updating fish profile:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to delete a fish profile
export async function deleteFishProfile(id) {
    try {
        await axios.delete(deleteFishProfileURL + id); // Send DELETE request
    } catch (error) {
        console.error('Error deleting fish profile:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}

// Function to get fish profiles by customer ID
export async function getFishProfilebyCustomerid(id) {
    try {
        const response = await axios.get(getFishProfileURL + id);
        return await response.data; // Return the fish profiles
    } catch (error) {
        console.error('Error fetching fish profiles:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
}
