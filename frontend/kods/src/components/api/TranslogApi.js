import { baseUrl, headers, getJwtToken } from './Url';
import axios from 'axios';

const logTransportBaseURL = baseUrl + '/LogTransport/';

export async function getLogTransport(transport) {
    const token = getJwtToken();
    try {
        const response = await axios.post(logTransportBaseURL, transport, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error logging transport:', error);
        throw error;
    }
}

export async function fetchLogTransportById(logTransportId) {
    const token = getJwtToken();
    try {
        const response = await axios.get(`${logTransportBaseURL}${logTransportId}`, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching log transport by ID:', error);
        throw error;
    }
}

export async function fetchLogTransportByCustomerId(customerId) {
    const token = getJwtToken();
    try {
        const response = await axios.get(`${logTransportBaseURL}customer/${customerId}`, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching log transport by customer ID:', error);
        throw error;
    }
}

export async function fetchLogTransportByTransportId(transportId) {
    const token = getJwtToken();
    try {
        const response = await axios.get(`${logTransportBaseURL}transport/${transportId}`, {
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching log transport by transport ID:', error);
        throw error;
    }
}
