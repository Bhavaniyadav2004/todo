// import axios from "axios";
// const API_BASE_URL = 'http://localhost:5005/api';
//   // Adjust based on your backend config

// const getAuthHeader = () => {
//     const token = localStorage.getItem('token');
//     return token ? { Authorization: `Bearer ${token}` } : {};
// };

// export const signup = async (userData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/User`, userData);
//         return response;
//     } catch (error) {
//         console.log(error)
//         throw error.response ? error.response.data : error.message;
//     }
// };

// export const login = async (credentials) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/User/login`, credentials);
//         const { token } = response.data;
//         localStorage.setItem('token', token);
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error.message;
//     }
// };

// export const fetchTasks = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/task`, {
//             headers: getAuthHeader(),
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error.message;
//     }
// };

// export const addTask = async (taskData) => {
//     const token = localStorage.getItem('token');  // Fetch token from localStorage
//     if (!token) {
//         throw new Error('No token found, please login again');
//     }

//     const response = await axios.post(`${API_BASE_URL}/Task`, taskData, {
//         headers: {
//             Authorization: `Bearer ${token}`   // Attach token to request
//         }
//     });

//     return response.data;
// };


// export const deleteTask = async (taskId) => {
//     try {
//         await axios.delete(`${API_BASE_URL}/Task/${taskId}`, {
//             headers: getAuthHeader(),
//         });
        
//     } catch (error) {
//         throw error.response ? error.response.data : error.message;
//     }
// };
