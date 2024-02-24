<script setup lang="ts" name="LayoutHeader">
import {defineAsyncComponent} from "vue";

const Breadcrumb = defineAsyncComponent(() => import('@/layout/layoutHeader/breadcrumb.vue'))
const UserDropdown = defineAsyncComponent(() => import('@/layout/layoutHeader/UserDropdown.vue'))
</script>

<template>
  <!--  右侧头部区域-->
  <div>
    <el-header class="layout-header">
      <div class="layout-header-index">
        <!--        面包屑-->
        <Breadcrumb></Breadcrumb>
        <!--        右侧下拉菜单-->
        <UserDropdown></UserDropdown>
      </div>
    </el-header>
  </div>
</template>

<style scoped>

</style>
