<script setup lang="ts" name="LayoutAside">
import SvgIcon from '@/components/svgicon/index.vue'
</script>

<template>
  <el-scrollbar class="custom-scrollbar">
    <el-menu
        router
        :default-active="$route.path"
        background-color="translate"
        :default-openeds="['/system']"
    >
      <el-menu-item index="/home">
        <SvgIcon name="ele-HomeFilled"></SvgIcon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="/system">
        <template #title>
          <SvgIcon name="ele-Setting"></SvgIcon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/menu">
          <template #title>
            <SvgIcon name="ele-Menu"></SvgIcon>
            <span>菜单管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/system/role">
          <template #title>
            <SvgIcon name="ele-Bowl"></SvgIcon>
            <span>角色管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/system/user">
          <template #title>
            <SvgIcon name="ele-Dish"></SvgIcon>
            <span>用户管理</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/goods">
        <template #title>
          <SvgIcon name="ele-Goods"></SvgIcon>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/list">
          <template #title>
            <SvgIcon name="ele-Operation"></SvgIcon>
            <span>商品列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/goods/category">
          <template #title>
            <SvgIcon name="ele-GoodsFilled"></SvgIcon>
            <span>商品分类</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/author">
        <SvgIcon name="ele-Link"></SvgIcon>
        <span>作者官网</span>
      </el-menu-item>
      <el-menu-item index="/404">
        <SvgIcon name="ele-Warning"></SvgIcon>
        <span>404</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>

</style>
