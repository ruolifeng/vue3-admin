<script setup lang="ts" name="Home">
import {defineAsyncComponent} from "vue";

const StatisticsData = defineAsyncComponent(() => import('@/views/home/components/statisticsDatta.vue'));
</script>

<template>
  <div>
    <StatisticsData></StatisticsData>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="11" :lg="9" class="mb15">
        <el-card shadow="hover">
          分类销售统计
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="13" :lg="15" class="mb15">
        <el-card shadow="hover">
          近30天销售趋势
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="13" :lg="15" class="mb15">
        <el-card shadow="hover">
          会员消费Top10
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="11" :lg="9" class="mb15">
        <el-card shadow="hover">
          气温仪表盘 ℃
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>
