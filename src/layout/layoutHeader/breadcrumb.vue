<script setup lang="ts" name="Breadcrumb">
import {useLayoutConfigStore} from "@/stores/layoytConfig";
import {storeToRefs} from "pinia";
// 如果直接使用这个useRoute的话只会在页面刷新的时候加载一次路由
// 当路由信息发生变化时获取路由信息
import {
  onBeforeRouteUpdate,
  type RouteLocationMatched,
  type RouteLocationNormalized,
  type RouteRecordNormalized,
  useRoute,
  useRouter
} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute();
const router = useRouter();
const store = useLayoutConfigStore();
const {isCollapse} = storeToRefs(store);
const breadCrumbList = ref<RouteRecordNormalized[]>([])
// 用于第一次加载路由时触发
onMounted(() => {
  getBreadCrumb(route)
})
// 用于在路由更新时触发，第n+1次
onBeforeRouteUpdate((to) => {
  getBreadCrumb(to);
})

function getBreadCrumb(to: RouteLocationNormalized) {
  // 配置过滤条件
  breadCrumbList.value = to.matched.filter((item) => item.meta && item.meta.isBreadcrumb !== false && item.meta.title);
}

// 实现点击标题路由跳转
function handleLink(_route: RouteLocationMatched) {
  const {redirect, path} = _route;
  if (redirect) router.push(<string>redirect)
  else router.push(path)
}
</script>

<template>
  <div class="layout-header-breadcrumb">
    <!--  收缩图标-->
    <SvgIcon @click="isCollapse = !isCollapse" :name="isCollapse?'ele-Expand':'ele-Fold'"
             class="layout-header-expand-icon"></SvgIcon>
    <!--  面包屑-->
    <el-breadcrumb separator=">>">
      <el-breadcrumb-item v-for="(item,index) in breadCrumbList" :key="item.path">
        <span v-if="index === breadCrumbList.length - 1" class="flex-center">
          <SvgIcon v-if="item.meta.icon" :name="item.meta.icon" :size="14" style="margin-right: 5px"></SvgIcon>
          {{ item.meta.title }}
        </span>
        <a class="flex-center" @click.prevent="handleLink(item)" v-else>
          <SvgIcon v-if="item.meta.icon" :name="item.meta.icon" :size="14" style="margin-right: 5px"></SvgIcon>
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>

</style>
