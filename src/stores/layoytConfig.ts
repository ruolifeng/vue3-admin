import {defineStore} from "pinia";

export const useLayoutConfigStore = defineStore("layout", {
    state(): LayoutConfigState {
        return {
            isCollapse: false,
            globalTitle: 'vue3-pre-admin'
        }
    },
    getters: {},
    actions: {}
})
