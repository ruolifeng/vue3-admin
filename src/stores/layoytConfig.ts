import {defineStore} from "pinia";
import {Local} from "@/utils/storage";
import {nextTick} from "vue";

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
    actions: {
        // 更新状态
        updateState(state: LayoutConfigState) {
            // 将状态进行更新。只要对象中存在匹配的值就会将对应的值进行更新
            this.$patch(state);
        }
    }
})


nextTick(() => {
    const layoutConfig = useLayoutConfigStore();
    layoutConfig.$subscribe((mutation, state) => {
        Local.set('layoutConfig', state);
    })
})
