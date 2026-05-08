import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  //base: "/nowa-ts/preview/",  // Use base path for while deploying the project the SSR.
  plugins: [react()],
  define: {
    'process.env': {},
  },
  build: {
    chunkSizeWarningLimit: 50000,
    
  },
  server: {
    host: true,
  },
   css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api', 'import'],
      },
    },
  }
});
