import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    return {
        // base: 'rlf',
        // 开发环境有效的端口号，生产环境下无效
        server: {
            port: 8888, // 端口号
            open: true, // 启动项目自动打开浏览器访问
            host: 'localhost', // 若指定0.0.0.0则开放所有ip访问
            // 配置代理解决跨域问题，这里在key使用环境变量的时候需要使用[]，并且下面value的时候不需要使用
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_APP_SERVICE_URL,
                    changeOrigin: true,
                    rewrite(path) {
                        return path.replace(new RegExp(`^${env.VITE_APP_BASE_API}/`), '')
                    },
                }
            }
        },
        plugins: [
            vue(),
            vueSetupExtend(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        }
    }
})
