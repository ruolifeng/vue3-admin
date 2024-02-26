<script setup lang="ts" name="Home">
import {defineAsyncComponent} from "vue";

const StatisticsData = defineAsyncComponent(() => import('@/views/home/components/statisticsDatta.vue'));
</script>

<template>
  <div>
    <StatisticsData></StatisticsData>
  </div>
</template>

<style scoped>

</style>
