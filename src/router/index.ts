import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from "vue-router";

// 扩展路由表中meta属性
declare module 'vue-router' {
    interface RouteMeta {
        title?: string; // 菜单标题
        icon?: string; // 菜单图标
        linkTo?: string; // 外链地址
        cache?: boolean; // 是否缓存，将值放在<keep-alive>中
        hidden?: boolean; // 是否在左侧菜单中显示
        inBreadcrumb?: boolean; // 是否显示在面包屑中，默认是true
        // todo 2024年2月22日22:23:43
        isAuth?: boolean;
        transitionName?: string;
    }
}
/**
 * 配置路由表数组（单独抽取：后端动态加载）
 */
export const dynamicRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'ele-HomeFilled'
                }
            },
        ]
    }
]

const router = createRouter({
    // 获取的是vite.config.ts中的环境变量的值
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: dynamicRoutes
})

export default router
