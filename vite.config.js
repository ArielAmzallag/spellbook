// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [vue(), vueJsx(), viteCommonjs()],
  test: {
    // Place your Vitest configurations here
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'], // Optional setup file
  },
});
