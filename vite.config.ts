import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
const resolve = (dir:string):string => {
  return fileURLToPath(new URL(`./${dir}`, import.meta.url))
}
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': resolve('src'),
    }
  },
  server: {
    host: 'localhost',
    port: 8081
    // proxy: {
    //   '/api': {
    //     target: 'localhost:3000/api',  //'http://121.37.10.32:3000/api',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // }
  }
});
