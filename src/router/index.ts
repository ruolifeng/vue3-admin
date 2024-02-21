import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from "vue-router";

/**
 * 配置路由表数组（单独抽取：后端动态加载）
 */
export const dynamicRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/layout/index.vue')
    }
]

const router = createRouter({
    // 获取的是vite.config.ts中的环境变量的值
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: dynamicRoutes
})

export default router
