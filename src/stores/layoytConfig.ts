import {defineStore} from "pinia";

export const useLayoutConfigStore = defineStore("layout", {
    state(): LayoutConfigState {
        return {
            isCollapse: false,
            globalTitle: 'vue3-pre-admin',
            isFullScreen: false, // 是否是全屏
            isDark: true // 是否是黑暗模式
        }
    },
    getters: {},
    actions: {}
})
