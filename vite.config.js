import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { resolve } from 'path';

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `https://localhost:${PORT}`,
        changeOrigin: true,
        secure: false,
      },
      '/build': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/build/, ''),
      },
    },
  },
  root: resolve(__dirname, 'src/app'),
  base: './',
  build: {
    target: 'esnext',
    outDir: resolve(__dirname, 'dist/overwolf'),
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'src/app/background.html'),
        'not-supported': resolve(__dirname, 'src/app/not-supported.html'),
        notification: resolve(__dirname, 'src/app/notification.html'),
        'second-screen': resolve(__dirname, 'src/app/second-screen.html'),
        main: resolve(__dirname, 'src/app/index.html'),
      },
    },
  },
});
