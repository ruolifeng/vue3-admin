<script setup lang="ts">
import {useRouter} from "vue-router";
import {useFullscreen,useDark} from '@vueuse/core'
import {useLayoutConfigStore} from "@/stores/layoytConfig";
import {storeToRefs} from "pinia";

const store = useLayoutConfigStore();
const {isFullScreen} = storeToRefs(store);
// 切换全屏模式
const {isFullscreen, toggle: toggleFullscreen} = useFullscreen()
const router = useRouter();
const isDark = useDark({
  valueDark: 'dark', // 暗黑模式
  valueLight: '', // 高亮模式
  initialValue: 'dark' // 初始值
})
async function handleFullScreen() {
  await toggleFullscreen();
  isFullScreen.value = isFullscreen.value;
}
function changeDark(_isDark:boolean){
  store.isDark = _isDark;
}
</script>

<template>
  <div class="layout-header-user">
    <div class="layout-header-user-icon" @click="handleFullScreen">
      <SvgIcon name="ele-FullScreen"></SvgIcon>
    </div>
    <div class="layout-header-user-icon">
      <el-switch
          v-model="isDark"
          @click="changeDark"
          inline-prompt
          active-icon="ele-Moon"
          inactive-icon="ele-Sunny"
      />
    </div>
    <div>
      <el-dropdown>
    <span class="el-dropdown-link layout-header-user-icon">
      <el-avatar class="mr5" :size="30" src="https://s11.ax1x.com/2024/02/25/pFaGHsK.png"/>
      independent
      <SvgIcon class="mr5" name="ele-ArrowDown"/>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/')">首页</el-dropdown-item>
            <el-dropdown-item @click="router.push('/404')">404</el-dropdown-item>
            <el-dropdown-item divided @click="router.push('/logoOut')">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>

</style>
