import {useAuthStore} from "@/stores/auth";
import {getMenuUserInfo} from "@/api/system/menu";

export async function initBackEndRouters() {
    const authStore = useAuthStore();
    if (!authStore) return false;
    const { data } = await getMenuUserInfo();
    const {userInfo, menuList, buttonList} = data;

    if (!userInfo || !menuList || menuList.length <= 0) return false;
    authStore.setUserInfo(userInfo);
    authStore.setButtonList(buttonList);
    authStore.setMenuList(menuList);
}
