import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  optimizeDeps: {
    include: ['@mysten/dapp-kit']
  },
  server: {
    port: 5175,
    strictPort: true,
    hmr: {
      port: 5175
    }
  }
});