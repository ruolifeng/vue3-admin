import {defineStore} from "pinia";
import {login} from "@/api/auth/login";
import {Session, Local} from "@/utils/storage";
import type {RouteRecordRaw} from "vue-router";


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
        }
    },
})
