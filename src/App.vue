<script setup lang="ts" name="App">
import {Local} from "@/utils/storage";
import {onMounted} from "vue";
import {useLayoutConfigStore} from "@/stores/layoytConfig";

const layoutConfigStore = useLayoutConfigStore();
onMounted(() => {
  // 获取local中的布局配置数据，更新到pinia状态中
  const layoutConfigState = Local.get('layoutConfig');
  // 如果值非空则更新状态
  if (layoutConfigState) layoutConfigStore.updateState(layoutConfigState)
})
</script>

<template>
  <!--路由组件布局出口-->
  <div class="h100">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
