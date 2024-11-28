export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || '/api',
    endpoints: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
        },
        stocks: {
            list: '/stocks',
            sell: '/stocks/sell',
            buy: '/stocks/buy',
        }
    }
};
