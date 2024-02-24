<script setup lang="ts">

</script>

<template>
  <!--  右侧主区域-->
  <el-main class="layout-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style scoped>

</style>
