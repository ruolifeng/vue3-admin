import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    // base: 'rlf',
    // 开发环境有效的端口号，生产环境下无效
    server: {
        port: 8888, // 端口号
        open: true, // 启动项目自动打开浏览器访问
        host: 'localhost' // 若指定0.0.0.0则开放所有ip访问
    },
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
