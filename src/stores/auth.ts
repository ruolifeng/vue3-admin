import {defineStore} from "pinia";
import {login} from "@/api/auth/login";
import {Session, Local} from "@/utils/storage";


export const Key = {
    rememberKey: 'isRemember',
    accessTokenKey: 'accessToken'
}
export const useAuthStore = defineStore('auth', {
    state:() : AuthState => {
        return {
            rememberData: Local.get(Key.rememberKey),
            accessToken: Session.get(Key.accessTokenKey)
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
        }
    },
})
