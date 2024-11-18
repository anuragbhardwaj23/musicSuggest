import axios from 'axios';

// Use relative paths, the proxy will forward the request to the backend
const API = 'http://localhost:5000/login';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API}/login`, credentials, {
      withCredentials: true,  // Allow cookies if necessary for authentication
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
