import { VercelResponse } from '@vercel/node';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
        externalResolver: true,
    },
};

export function handleError(error: any, res: VercelResponse) {
    console.error('API Error:', error);
    return res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
} 