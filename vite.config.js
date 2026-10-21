import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Each site is pinned to its own port so all ten can run side by side.
 *
 * `base` stays at '/' because the app uses BrowserRouter — clean URLs need
 * absolute asset paths so that /pricing resolves /assets/... rather than
 * /pricing/assets/... . Serve a production build with `npm run preview`,
 * which applies the SPA fallback; opening dist/index.html straight off disk
 * will not route.
 */
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5213,
    open: true
  },
  preview: {
    port: 5213
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
