import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const resolve = (dir: string) => {
  return path.resolve(__dirname, dir);
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      pages: resolve('./src/pages'),
      components: resolve('./src/components'),
      assets: resolve('./src/assets'),
      stores: resolve('./src/stores'),
      utils: resolve('./src/utils'),
    },
  },
});
