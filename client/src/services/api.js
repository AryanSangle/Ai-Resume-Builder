import axios from 'axios';



const getBaseUrl = () => {
    
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    
    if (import.meta.env.DEV) {
        return 'http://localhost:8000';
    }
    
    return '';
};

const api = axios.create({
    baseURL: getBaseUrl(),
});

export const generateResume = async (formData) => {
    const response = await api.post('/api/generate', formData);
    return response.data;
};

export default api;
