<script setup lang="ts" name="Home">
import {defineAsyncComponent, computed} from "vue";
import {getCategoryData, getLast30DaysSaleData} from "@/api/home";
import {onMounted, reactive} from "vue";
import {useLayoutConfigStore} from "@/stores/layoytConfig";

const state = reactive({
  category: {
    loading: false,
    data: [],
  },
  last30Days: {
    loading: false,
    xAxisData: [] as string[],
    data: [] as any[]
  }
});
const layoutConfig = useLayoutConfigStore();
onMounted(() => {
  loadCategoryData();
  loadLast30DaysSaleData();
})
// 图表主题 'dark' 暗黑
const theme = computed(() => layoutConfig.isDark ? 'dark' : '');
// 图表背景色
const backgroundColor = computed(() => layoutConfig.isDark ? 'transparent' : '');

/**
 * 查询分类销售数据
 */
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

async function loadLast30DaysSaleData() {
  try {
    state.last30Days.loading = true;
    const {data} = await getLast30DaysSaleData();
    const {last30Days, orderNumList, rechargeMoneyList, returnMoneyList, saleMoneyList} = data;
    // x轴数据
    state.last30Days.xAxisData = last30Days;
    // 每种类型的近三十天y轴数据
    state.last30Days.data = [
      {typeName: '订单数', list: orderNumList},
      {typeName: '销售额', list: saleMoneyList},
      {typeName: '退款额', list: returnMoneyList},
      {typeName: '充值额', list: rechargeMoneyList},
    ];
  } catch (error) {

  } finally {
    state.last30Days.loading = false;
  }
}

const StatisticsData = defineAsyncComponent(() => import('@/views/home/components/statisticsDatta.vue'));
const Pie = defineAsyncComponent(() => import('@/components/echarts/pie.vue'));
const LineChart = defineAsyncComponent(() => import('@/components/echarts/lineChart.vue'));
</script>

<template>
  <div>
    <StatisticsData></StatisticsData>
    <el-row :gutter="15">
      <el-col v-loading="state.category.loading" :xs="24" :sm="24" :md="11" :lg="9" class="mb15">
        <!--        统计饼图-->
        <Pie title="分类销售统计"
             subtitle="每种商品分类的近三十天销售数据"
             :data='state.category.data'
             :theme='theme'
             :background='backgroundColor'
        ></Pie>
      </el-col>
      <el-col v-loading="state.last30Days.loading" :xs="24" :sm="24" :md="13" :lg="15" class="mb15">
        <LineChart width="100%"
                   height="380px"
                   title="近30天销售趋势"
                   :theme="theme"
                   :bgColor="backgroundColor"
                   :data="state.last30Days.data"
                   :xAxisData="state.last30Days.xAxisData"
        ></LineChart>
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
