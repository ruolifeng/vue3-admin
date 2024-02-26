<script setup lang="ts" name="Statistics">
import {getStatistics} from "@/api/home";
import {reactive, onMounted} from "vue";

/**
 * 将静态数据转换成响应式数据
 */
const state = reactive({
  loading: false,
  statisticsData: {
    totalIncomeMoney: 0,
    totalOrderNum: 0,
    totalReturnedMoney: 0,
    totalSaleMoney: 0
  }
})
onMounted(() => {
  console.log('////')
  loadStatistics();
})

async function loadStatistics() {
  try {
    state.loading = true;
    const {data} = await getStatistics()
    state.statisticsData = data;
  } catch (error) {

  } finally {
    state.loading = false;
  }
}
</script>

<template>
  <div>
    {{ state.statisticsData }}
  </div>
</template>

<style scoped>

</style>
