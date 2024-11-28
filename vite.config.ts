import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false
        }
      }
    },
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      sourcemap: true,
      emptyOutDir: true
    }
  };
});
