import axios from 'axios'

const publicInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
})

const fileUploadInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export { fileUploadInstance ,publicInstance }