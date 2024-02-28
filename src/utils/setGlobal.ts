// 导入ui图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type {App} from 'vue'

// 自定义全局图标组件
import SvgIcon from '@/components/svgicon/index.vue'
import Global from '@/components/global/paging.vue'

/**
 * 全局注册图标
 * @param app
 */
export function useUI(app: App) {
    // 使用图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(`ele-${key}`, component)
    }
    app.component('SvgIcon', SvgIcon);

    // 注册全局分页组件
    app.component('MPaging', Global)
}
