<script setup lang="ts" name="LayoutIndex">
import {defineAsyncComponent} from "vue";
import {useLayoutConfigStore} from "@/stores/layoytConfig";

const store = useLayoutConfigStore();
const Logo = defineAsyncComponent(() => import('@/layout/layoutAside/logo.vue'))
const asideMenu = defineAsyncComponent(() => import('@/layout/layoutAside/asideMenu.vue'))
</script>

<template>
  <!--  左边菜单栏-->
  <div class="h100">
    <el-aside class="layout-aside" :class="store.isCollapse?'layout-aside-menu-60':'layout-aside-menu-200'">
      <logo></logo>
      <asideMenu></asideMenu>
    </el-aside>
  </div>
</template>

<style scoped>

</style>
