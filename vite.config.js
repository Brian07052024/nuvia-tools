import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['img/*.png', 'svg/**/*'],
      manifest: false, // Usamos el manifest.json estático
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webm,jpg,jpeg,gif}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: false // Deshabilitado en desarrollo
      }
    })
  ],
  
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
