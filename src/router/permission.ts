import router from "@/router/index";
import {useAuthStore} from "@/stores/auth";
import {initBackEndRouters} from "@/router/backEnd";

const whitRoute = ['/login']
// 路由前置在跳转到目标地址之前被调用
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // 获取存储的访问令牌
    const hasToken = authStore.accessToken;
    // 判断是否存在令牌
    if (hasToken){
        // 存在令牌
        if (to.path === '/login'){
            return next({path: '/'});
        }else {
            // 获取用户菜单权限
            if (!authStore.userInfo || authStore.menuList.length <=0 ){
                // 后端控制路由
                await initBackEndRouters();
                return next({path: to.path, query: to.query});
            }else {
                return next();
            }
        }
    }else {
        // 不存在
        if (whitRoute.indexOf(to.path) !==-1){
            return next();
        }else {
            return next(`/login?redirect=${to.path}`);
        }
    }
})
