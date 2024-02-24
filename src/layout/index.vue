<script setup lang="ts" name="Layout">
import {defineAsyncComponent} from "vue";
// import LayoutAside from '@/layout/layoutAside/index.vue'
// import LayoutHeader from '@/layout/layoutHeader/index.vue'
// import LayoutMain from '@/layout/layoutMain/index.vue'


// 异步导入组件，哪一个组件快先加载哪一个
const LayoutAside = defineAsyncComponent(() => import('@/layout/layoutAside/index.vue'))
const LayoutHeader = defineAsyncComponent(() => import('@/layout/layoutHeader/index.vue'))
const LayoutMain = defineAsyncComponent(() => import('@/layout/layoutMain/index.vue'))
</script>

<template>
  <!--参考：https://element-plus.org/zh-CN/component/container.html-->
  <el-container class="layout-container">
    <LayoutAside></LayoutAside>
    <el-container direction="vertical">
      <LayoutHeader></LayoutHeader>
      <layout-main></layout-main>
    </el-container>
  </el-container>
</template>

<style>

</style>
