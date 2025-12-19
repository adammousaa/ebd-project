import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    include: ['**/*.jsx', '**/*.js'], // ADD THIS: Process both .js and .jsx files
  })],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    },
    host: true,
    open: false
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  preview: {
    port: 3001
  },
  // ADD THIS SECTION FOR JSX SUPPORT IN .JS FILES
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})