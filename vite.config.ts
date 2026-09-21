import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: false,
  },
  base: '/portfolio/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three')) {
            return 'three-vendor';
          }
          if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
            return 'chart-vendor';
          }
          if (id.includes('lucide-react')) {
            return 'lucide-icons';
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})
