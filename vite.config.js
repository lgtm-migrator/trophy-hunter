import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

import { resolve } from 'path';

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/api': {
        target: `https://localhost:${PORT}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  root: resolve(__dirname, 'src/app'),
  base: './',
  build: {
    target: 'esnext',
    outDir: resolve(__dirname, 'dist/overwolf/build'),
    emptyOutDir: true,
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
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
