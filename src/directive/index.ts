import type { App } from 'vue';
// 引入所有要注册的全局指令：权限指令
import { authDirective } from '@/directive/authDirective';
/**
 * 导出指令方法：v-xxx
 * @methods authDirective 用户权限指令，用法：v-auth
 */
export function directive(app: App) {
// 用户权限指令
    authDirective(app);
// 其他自定义指令
}
