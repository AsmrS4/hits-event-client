import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';
import { globalConst } from 'vite-plugin-global-const';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    globalConst({
      API_URL : `http://localhost:8001/api/v1`
    }),
  ],
  server: {
    host: 'localhost',
    port: 5500,
    open: true
  },
  resolve: {
    alias: [
      {find: '@api', replacement:'/src/api'},
      {find: '@app', replacement:'/src/app'},
      {find: '@assets', replacement:'/src/assets'},
      {find: '@models', replacement:'/src/models'},
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

})
