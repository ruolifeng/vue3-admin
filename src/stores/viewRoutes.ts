import {useAuthStore} from "@/stores/auth";

/**
 * 将动态路由保存到pinia状态中
 */
function setDynamicRoutes() {
// 存储动态路由
    const authStore = useAuthStore();
    authStore.setMenuList(dynamicRoutes[0].children);
}

// 视图路由状态
declare interface ViewRoutesState {
    cacheRouteNames: string[]; // 要缓存路由的name
}

import {defineStore} from 'pinia';
import {dynamicRoutes} from "@/router";

/**
 * 管理路由组件
 */
export const useViewRoutesStore = defineStore('viewRoutes', {
    state: (): ViewRoutesState => {
        return {
            cacheRouteNames: [], // 要缓存的组件name
        }
    },
    actions: {
// 更新状态
        async setCacheRouteNames(data: string[]) {
            this.cacheRouteNames = data;
        },
    }
});
