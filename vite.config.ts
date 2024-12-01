import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: mode === 'production' 
            ? 'https://future-funds-backend.onrender.com'
            : 'http://localhost:5000',
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
});
