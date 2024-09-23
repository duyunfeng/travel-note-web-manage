import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost',
    port: 8080
    // proxy: {
    //   '/api': {
    //     target: 'localhost:3000/api',  //'http://121.37.10.32:3000/api',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // }
  }
});
