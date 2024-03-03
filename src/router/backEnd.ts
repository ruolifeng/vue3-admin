import {useAuthStore} from "@/stores/auth";
import {getMenuUserInfo} from "@/api/system/menu";
import type {RouteComponent, RouteRecordRaw} from "vue-router";
import router, {defaultRoutes, dynamicRoutes} from "@/router/index";

// 将文件中的组件全部一起导入
const modules:Record<string, RouteComponent> =
    import.meta.glob(['@/views/**/*.vue', '!@/views/**/components/**.vue']); // 匹配views目录下面的所有.vue文件，同时排除所有的子组件
// 将匹配出来的组件前缀去除，和后端查询出来的数据进行匹配
const viewsModules:Record<string, RouteComponent> =
    Object.keys(modules).reduce((prevObj, currKey) =>
        Object.assign(prevObj, {[currKey.replace(/\/src\/views|..\/views/, '')]: modules[currKey]}), {});
export async function initBackEndRouters() {
    const authStore = useAuthStore();
    if (!authStore) return false;
    const { data } = await getMenuUserInfo();
    const {userInfo, menuList, buttonList} = data;

    if (!userInfo || !menuList || menuList.length <= 0) return false;
    authStore.setUserInfo(userInfo);
    authStore.setButtonList(buttonList);
    // authStore.setMenuList(menuList);
    // console.log(menuList)
    // 将目标路由替换
    dynamicRoutes[0].children = dynamicImportComponent(menuList);
    authStore.setMenuList(dynamicRoutes[0].children)
    // console.log(dynamicRoutes[0].children)
    addRouteHandle()
}
export function dynamicImportComponent(dynamicRoutes: RouteRecordRaw[]): RouteRecordRaw[] {
    if (!dynamicRoutes || dynamicRoutes.length <= 0) return [];
    return dynamicRoutes.map((route) => {
// 存在 component 值，则查找对应动态导入组件方法
        const { component } = route;
        if (component) route.component = viewsModules[`${component}`] || viewsModules[`/${component}`];
        route.children && dynamicImportComponent(route.children);
        return route;
    });
}

export function addRouteHandle() {
    // 将静态配置的默认路由和子路由进行合并，防止之前的合并失效出现全屏404的现象
    const layoutRouteChildren = [...dynamicRoutes[0].children || [], ...defaultRoutes]
    // 将合并之后的路由配置到子路由中
    dynamicRoutes[0].children = layoutRouteChildren;
    // console.log(dynamicRoutes)
    // 动态加载路由，将路由注册
    dynamicRoutes.forEach((route)=>{
        // console.log(dynamicRoutes)
        router.addRoute(route);
    })
}
