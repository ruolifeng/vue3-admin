<script setup lang="ts" name="Breadcrumb">
import SvgIcon from '@/components/svgicon/index.vue'
import {useLayoutConfigStore} from "@/stores/layoytConfig";
import {storeToRefs} from "pinia";

const store = useLayoutConfigStore();
const {isCollapse} = storeToRefs(store);
</script>

<template>
  <div class="layout-header-breadcrumb">
    <!--  收缩图标-->
    <SvgIcon @click="isCollapse = !isCollapse" :name="isCollapse?'ele-Expand':'ele-Fold'"
             class="layout-header-expand-icon"></SvgIcon>
    <!--  面包屑-->
    <el-breadcrumb separator=">>">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/category' }">分类</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/category/product' }">商品</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>

</style>
