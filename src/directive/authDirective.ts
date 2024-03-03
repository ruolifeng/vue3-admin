import type {App} from 'vue';
import {isContainArr} from '@/utils/validate';
import {useAuthStore} from "@/stores/auth";

/**
 * 用户权限指令
 * 1、v-auth="xxx" 单个权限校验
 * 2、v-auths="[xxx, xxx]" 多个权限校验，满足其中一个则显示
 * 3、v-auth-all="[xxx, xxx]" 多个权限验证，全部满足则显示
 *
 * 注意：vue3 有了片段支持以后，组件可能会有多个根节点。当被应用在一个多根节点的组件上时，指令会被忽
 略，并且会抛出一个警告。
 * [Vue warn]: Runtime directive used on component with non-element root node. The
 directives will not function as intended.
 */
export async function authDirective(app: App) {
    const authStore = useAuthStore();
// v-auth="xxx" 单个权限校验
// 第1个参数是指令名，v-permission 使用，而在声明指令名时候不能加 vapp.
    app.directive('auth', {
        mounted(el, binding) {
// 获取用户当前所拥有的所有按钮权限
            const buttonList = authStore.buttonList;
// 如果没有权限, 将元素移除
            if (!buttonList.some((btn: string) => btn === binding.value)) {
                el.parentNode.removeChild(el);
            }
        },
    });
// v-auths="[xxx, xxx]" 多个权限校验，满足其中一个则显示
    app.directive('auths', {
        mounted(el, binding) {
// 获取用户当前所拥有的所有按钮权限
            const buttonList = authStore.buttonList;
// 存在传递过来的其中一个则返回true，说明有权限
            if (!buttonList.some((btn: string) => binding.value.indexOf(btn) != -1)) {
                el.parentNode.removeChild(el);
            }
        },
    });
// v-auth-all="[xxx, xxx]" 多个权限验证，全部满足则显示
    app.directive('auth-all', {
        mounted(el, binding) {
// 获取用户当前所拥有的所有按钮权限
            const buttonList = authStore.buttonList;
            if (!isContainArr(buttonList, binding.value)) el.parentNode.removeChild(el);
        },
    });
}
