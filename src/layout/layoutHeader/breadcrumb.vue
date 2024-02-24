<script setup lang="ts" name="Breadcrumb">
import SvgIcon from '@/components/svgicon/index.vue'
</script>

<template>
  <div class="layout-header-breadcrumb">
    <!--  收缩图标-->
    <SvgIcon name="ele-Fold" class="layout-header-expand-icon"></SvgIcon>
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
