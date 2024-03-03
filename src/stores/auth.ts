import {defineStore} from "pinia";
import {login} from "@/api/auth/login";
import {Session, Local} from "@/utils/storage";
import type {RouteRecordRaw} from "vue-router";
import {logout} from "@/api/auth";


export const Key = {
    rememberKey: 'isRemember',
    accessTokenKey: 'accessToken',
    userInfoKey: 'userInfo'
}
export const useAuthStore = defineStore('auth', {
    state:() : AuthState<RouteRecordRaw> => {
        return {
            rememberData: Local.get(Key.rememberKey),
            accessToken: Session.get(Key.accessTokenKey),
            userInfo: Local.get(Key.userInfoKey),
            buttonList: [],
            menuList: []
        }
    },
    actions: {
        userLogin(loginData: LoginData) {
            return new Promise((resolve, reject) => {
                login(loginData).then((res: any) => {
                    const {data} = res;
                    const {access_token} = data;
                    this.accessToken = access_token;
                    Session.set(Key.accessTokenKey, access_token)
                    resolve(res);
                }).catch((error: Error) => {
                    reject(error);
                })
            })
        },
        setRememberPwd(data?: LoginData){
            this.rememberData = data;
            if (data) Local.set(Key.rememberKey,data);
            else Local.remove(Key.rememberKey);
        },
        setUserInfo (data: UserInfo) {
            this.userInfo = data;
            Session.set(Key.userInfoKey, data);
        },
        setButtonList (data: string[]) {
            this.buttonList = data;
        },
        setMenuList (data = [] as RouteRecordRaw[]) {
            this.menuList = data;
        },
        // 退出系统
        userLogout() {
            return new Promise((resolve, reject) => {
                logout().then((res:any) => {
// 重置状态
                    this.resetUserState();
// 重新加载当前页，需认证页面会去登录页
                    window.location.reload();
                    resolve(res);
                }).catch((error: Error)=> {
                    reject(error);
                })
            });
        },
        // 重置用户状态
        resetUserState() {
            this.menuList = [];
            this.accessToken = undefined;
            this.userInfo = undefined;
// 移除保存的数据
            Session.remove(Key.accessTokenKey);
            Session.remove(Key.userInfoKey);
        },
    }
})
