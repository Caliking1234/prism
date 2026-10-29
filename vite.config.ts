/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // `npm run dev:netlify` serves the function on the same origin; plain `npm run dev` proxies to it.
    proxy: { '/api': 'http://localhost:8888' }
  },
  test: { environment: 'node' }
});
