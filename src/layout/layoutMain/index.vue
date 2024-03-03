<script setup lang="ts" name="LayoutMain">
import {useViewRoutesStore} from "@/stores/viewRoutes";
import {computed} from "vue";
const viewRoutesStore = useViewRoutesStore();
// 获取要缓存的路由组件name

const cacheRouteNames = computed(() => viewRoutesStore.cacheRouteNames);
</script>

<template>
  <!--  右侧主区域-->
  <el-main class="layout-main">
    <el-scrollbar>
      <div class="layout-main-warp">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <!--            如果需要缓存指定的数据，那么一种方式是使用选项式api的方式指定name属性值，
            将name填写在include中，也可以使用插件，添加插件之后就可以将值写在setup中-->
            <keep-alive :include="cacheRouteNames">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<style scoped>
:deep(.el-scrollbar_view) {
  height: 100%;
}
</style>
