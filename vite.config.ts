import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  server: {
    host: 'localhost',
    port: 5500,
    open: true
  },
  resolve: {
    alias: [
      {find: '@api', replacement:'/src/api'},
      {find: '@assets', replacement:'/src/assets'},
      {find: '@components', replacement:'/src/components'},
      {find: '@hooks', replacement:'/src/hooks'},
      {find: '@pages', replacement:'/src/pages'},
      {find: '@store', replacement:'/src/store'},
      {find: '@styles', replacement:'/src/styles'}
    ]
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(`http://localhost:8001/api/v1`)
  },
})
