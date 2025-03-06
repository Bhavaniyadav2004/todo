import axios from 'axios';

const API_BASE_URL = 'http://localhost:5005/api';  // make sure this is correct

export const login = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, formData);
        return response.data;
    } catch (error) {
        console.error('Login request failed:', error);
        throw error;
    }
};
