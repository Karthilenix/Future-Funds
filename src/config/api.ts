export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || 'https://future-funds-backend.onrender.com',
    endpoints: {
        stocks: '/api/stocks',
        auth: '/api/auth'
    }
};
