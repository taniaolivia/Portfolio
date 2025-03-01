import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        vue(),
    ],
    /*server: {
        proxy: {
            '/textures': {
            target: 'https://d1y03iejmbtlm3.cloudfront.net/portfolio',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/textures/, ''),
            },
        },
    },*/
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        alias: {
            '@models': new URL('./src/assets/models/', import.meta.url).pathname,
            '@examples': new URL('./src/assets/examples/', import.meta.url).pathname,
            '@fonts': new URL('./src/assets/fonts/', import.meta.url).pathname,
            '@img': new URL('./src/assets/datas/', import.meta.url).pathname,
        },
    }
});
