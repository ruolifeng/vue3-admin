import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from "vue-router";

// 扩展路由表中meta属性
declare module 'vue-router' {
    interface RouteMeta {
        title?: string; // 菜单标题
        icon?: string; // 菜单图标
        linkTo?: string; // 外链地址
        cache?: boolean; // 是否缓存，将值放在<keep-alive include="xxx">中
        hidden?: boolean; // 是否在左侧菜单中隐藏，true是隐藏
        inBreadcrumb?: boolean; // 是否显示在面包屑中，默认是true
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
                path: '/home',
                name: 'Home',
                component: () => import('@/views/home/index.vue'),
                // 在 Vue Router 中，meta 属性是一个非常有用的特性，它可以让你为路由对象添加一些额外的自定义数据。这些数据可以在路由守卫或者组件内部访问，以便进行一些自定义的操作或者决策
                meta: {
                    title: '首页',
                    icon: 'ele-HomeFilled',
                    cache: false,
                    hidden: false
                }
            },
            {
                path: '/system',
                name: 'System',
                redirect: '/system/menu',
                meta: {
                    title: '系统管理',
                    icon: 'ele-Setting'
                },
                children: [
                    {
                        path: 'menu',
                        name: 'SystemMenu',
                        component: () => import('@/views/system/menu/index.vue'),
                        meta: {
                            title: '菜单管理',
                            icon: 'ele-Menu',
                            cache: true,
                            hidden: false
                        }
                    },
                    {
                        path: 'role',
                        name: 'SystemRole',
                        component: () => import('@/views/system/role/index.vue'),
                        meta: {
                            title: '角色管理',
                            icon: 'ele-Bowl',
                            cache: true,
                            hidden: false
                        }
                    },
                    {
                        path: 'user',
                        name: 'SystemUser',
                        component: () => import('@/views/system/user/index.vue'),
                        meta: {
                            title: '用户管理',
                            icon: 'ele-Dish',
                            cache: true,
                            hidden: false
                        }
                    }
                ]
            },
            {
                path: '/goods',
                name: 'Goods',
                redirect: '/goods/list',
                meta: {
                    title: '商品',
                    icon: 'ele-Goods'
                },
                children: [
                    {
                        path: 'list',
                        name: 'SystemList',
                        component: () => import('@/views/goods/list.vue'),
                        meta: {
                            title: '商品列表',
                            icon: 'ele-Operation',
                            cache: true,
                            hidden: false
                        }
                    },
                    {
                        path: 'category',
                        name: 'SystemCategory',
                        component: () => import('@/views/goods/category/index.vue'),
                        meta: {
                            title: '商品分类',
                            icon: 'ele-GoodsFilled',
                            cache: true,
                            hidden: false
                        }
                    }
                ]
            },
            {
                path: '/author',
                name: 'Author',
                component: () => import('@/views/author/index.vue'),
                meta: {
                    title: '作者主页',
                    icon: 'ele-Link',
                    linkTo: 'https://rlfit.cn'
                }
            },
            // 注意，这个通配符路由应该放在所有路由配置的最后，因为 Vue Router 会按照路由配置的顺序来匹配路由，一旦找到匹配的路由，就会停止搜索。所以，如果你把通配符路由放在其他路由之前，那么所有的路径都会被它匹配，而其他的路由就永远不会被匹配到。
            {
                path: '/:pathMatch(.*)*',
                name: 'NotFind',
                component: () => import('@/views/404/index.vue'),
                meta: {
                    title: '404',
                    icon: 'ele-Warning',
                    hidden: true,
                    cache: true
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
