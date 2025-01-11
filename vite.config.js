import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 3030, // Porta do front-end
    proxy: {
      '/api/cluster': {
        target: 'http://localhost:8082', // Porta do back-end
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cluster/, '/api/cluster'), // Mantém o caminho para o Spring Boot
      },
    },
  },
  preview: {
    port: 3030,
  },
});