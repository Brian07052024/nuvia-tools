import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Configuración de build para producción
  build: {
    outDir: 'dist',
    sourcemap: false, // No exponer código fuente en producción
    rollupOptions: {
      output: {
        // Code splitting para mejor performance
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('html-to-image')) {
              return 'export-utils';
            }
            return 'vendor';
          }
        },
      },
    },
    // Optimización de chunks
    chunkSizeWarningLimit: 1000,
  },
  
  // Optimización de servidor de desarrollo
  server: {
    port: 5173,
    open: true,
  },
  
  // Preview server
  preview: {
    port: 4173,
  },
})
