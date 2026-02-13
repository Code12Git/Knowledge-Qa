import axios from 'axios';

// Axios instance for general API requests

const API_URL = import.meta.env.VITE_ENVIRONMENT === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:8000';

const publicInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios instance for file uploads
const fileUploadInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export { publicInstance, fileUploadInstance };