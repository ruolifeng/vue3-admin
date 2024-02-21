<script setup lang="ts">
import {defineAsyncComponent} from "vue";

const Logo = defineAsyncComponent(() => import('@/layout/layoutAside/logo.vue'))
</script>

<template>
  <!--  左边菜单栏-->
  <div class="h100">
    <el-aside class="layout-aside layout-aside-menu-200">
      <logo></logo>
    </el-aside>
  </div>
</template>

<style scoped>

</style>
