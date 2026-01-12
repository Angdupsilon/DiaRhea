import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';

// Plugin to remove import maps during production build
const removeImportMaps = (): Plugin => {
  return {
    name: 'remove-import-maps',
    transformIndexHtml(html) {
      // Remove import maps during build (they're only needed for preview)
      if (process.env.NODE_ENV === 'production') {
        return html.replace(/<script type="importmap"[^>]*>[\s\S]*?<\/script>/gi, '');
      }
      return html;
    },
  };
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), removeImportMaps()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
