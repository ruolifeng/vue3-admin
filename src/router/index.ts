import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    // 获取的是vite.config.ts中的环境变量的值
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: []
})

export default router
