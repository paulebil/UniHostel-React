// src/utils/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // adjust this to your backend URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});



// Attach token to every request if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
