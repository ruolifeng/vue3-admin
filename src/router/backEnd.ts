import {useAuthStore} from "@/stores/auth";
import {getMenuUserInfo} from "@/api/system/menu";
import type {RouteComponent} from "vue-router";

export async function initBackEndRouters() {
    const authStore = useAuthStore();
    if (!authStore) return false;
    const { data } = await getMenuUserInfo();
    const {userInfo, menuList, buttonList} = data;

    if (!userInfo || !menuList || menuList.length <= 0) return false;
    authStore.setUserInfo(userInfo);
    authStore.setButtonList(buttonList);
    authStore.setMenuList(menuList);

    // 将文件中的组件全部一起导入
    const modules:Record<string, RouteComponent> =
        import.meta.glob(['@/views/**/*.vue', '!@/views/**/components/**.vue']); // 匹配views目录下面的所有.vue文件，同时排除所有的子组件
    // 将匹配出来的组件前缀去除，和后端查询出来的数据进行匹配
    const viewsModules:Record<string, RouteComponent> =
        Object.keys(modules).reduce((prevObj, currKey) =>
            Object.assign(prevObj, {[currKey.replace(/\/src\/views|..\/views/, '')]: modules[currKey]}), {});

}
