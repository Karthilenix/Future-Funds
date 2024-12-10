export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || 'https://future-funds-backend.onrender.com',
    endpoints: {
        auth: {
            login: '/api/auth/login',
            register: '/api/auth/register',
        },
        stocks: {
            list: '/api/stocks',
            sell: '/api/stocks/sell',
            buy: '/api/stocks/buy',
        }
    }
};
