<script setup lang="ts" name="Home">
import {defineAsyncComponent, ref} from "vue";
import {getCategoryData} from "@/api/home";
import {onMounted, reactive} from "vue";

const state = reactive({
  category: {
    loading: false,
    data: [],
  }
})
onMounted(() => {
  loadCategoryData();
})

async function loadCategoryData() {
  try {
    state.category.loading = true;
    const {data} = await getCategoryData();
    state.category.data = data;
  } catch (error) {

  } finally {
    state.category.loading = false;
  }
}

const StatisticsData = defineAsyncComponent(() => import('@/views/home/components/statisticsDatta.vue'));
const Pie = defineAsyncComponent(() => import('@/components/echarts/pie.vue'));
</script>

<template>
  <div>
    <StatisticsData></StatisticsData>
    <el-row :gutter="15">
      <el-col v-loading="state.category.loading" :xs="24" :sm="24" :md="11" :lg="9" class="mb15">
        <!--        统计饼图-->
        <Pie title="分类销售统计"
             subtitle="每种商品分类的近三十天销售数据"
             :data="state.category.data"
        ></Pie>
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
