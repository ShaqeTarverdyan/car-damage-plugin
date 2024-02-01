import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: false, // Set to true for production
    lib: {
      entry: 'src/main.tsx',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'effector'],
      output: {
        entryFileNames: 'plugin',
        chunkFileNames: 'plugin.js',
        assetFileNames: 'plugin.css',
      },
    },
  },
});
