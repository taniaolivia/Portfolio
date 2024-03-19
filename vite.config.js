import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        vue(),
    ],

    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        alias: {
            '@models': new URL('./src/assets/models/', import.meta.url).pathname,
            '@examples': new URL('./src/assets/examples/', import.meta.url).pathname,
        },
    }
});
