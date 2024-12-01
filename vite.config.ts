import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = mode === 'production' 
    ? 'https://future-funds-backend.onrender.com'
    : 'http://localhost:5000';

  return {
    plugins: [react()],
    server: {
      port: 3000
    },
    define: {
      'process.env.VITE_API_URL': JSON.stringify(apiUrl)
    }
  };
});
