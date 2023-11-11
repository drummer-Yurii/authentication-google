import { defineConfig } from 'vite';
import dns from 'dns';
import vue from '@vitejs/plugin-vue';

dns.setDefaultResultOrder('verbatim');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 3000,
  },
});