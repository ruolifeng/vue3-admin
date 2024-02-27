<script setup lang="ts" name="Home">
import {defineAsyncComponent, computed} from "vue";
import {getCategoryData, getLast30DaysSaleData} from "@/api/home";
import {onMounted, reactive} from "vue";
import {useLayoutConfigStore} from "@/stores/layoytConfig";
import {getTopData} from "@/api/home";
import {getAir} from "@/api/home";

const state = reactive({
  category: {
    loading: false,
    data: [],
  },
  last30Days: {
    loading: false,
    xAxisData: [] as string[],
    data: [] as any[]
  },
  memberTop: {
    loading: false,
    xAxisData: [] as string[],
    data: [] as any[]
  },
  airTemperature: {
    loading: false,
    data: [] as any[]
  }
});
const layoutConfig = useLayoutConfigStore();
onMounted(() => {
  loadCategoryData();
  loadLast30DaysSaleData();
  loadTopData();
  loadAirTemperature();
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

/**
 * 查询会员消费top10
 */
async function loadTopData() {
  try {
    state.memberTop.loading = true;
    const {data} = await getTopData();
    // 不要直接赋值，需要先清空数据，但是直接赋值[]的话会导致在刷新页面之后无法渲染处新数据
    state.memberTop.xAxisData.length = 0;
    state.memberTop.data.length = 0;
    //   将姓名和数据分别拿出来
    data.forEach((item: any) => {
      state.memberTop.xAxisData.push(item.name);
      state.memberTop.data.push(item.consumeMoney);
    })
  } catch (error) {

  } finally {
    state.memberTop.loading = false;
  }
}

// 获取天气信息

async function loadAirTemperature() {
  try {
    state.airTemperature.loading = true;
    const {lives} = await getAir();
    state.airTemperature.data = lives;
    // 时间格式化
    const date = new Date(state.airTemperature.data[0].reporttime);
    const newData = date.toLocaleDateString();
    state.airTemperature.data.push(newData);
  } catch (error) {

  } finally {
    state.airTemperature.loading = false;
  }
}

const StatisticsData = defineAsyncComponent(() => import('@/views/home/components/statisticsDatta.vue'));
const Pie = defineAsyncComponent(() => import('@/components/echarts/pie.vue'));
const LineChart = defineAsyncComponent(() => import('@/components/echarts/lineChart.vue'));
const BarCart = defineAsyncComponent(() => import('@/components/echarts/barChart.vue'));
const GuageChart = defineAsyncComponent(() => import('@/components/echarts/guageChart.vue'));
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
      <el-col v-loading="state.memberTop.loading" :xs="24" :sm="24" :md="13" :lg="15" class="mb15">
        <!--        会员消费top10-->
        <BarCart width="100%"
                 height="380px"
                 title="会员消费TOP10"
                 :theme="theme"
                 :bgColor="backgroundColor"
                 :data="state.memberTop.data"
                 :xAxisData="state.memberTop.xAxisData"
        >
        </BarCart>
      </el-col>
      <el-col v-loading="state.airTemperature.loading" :xs="24" :sm="24" :md="11" :lg="9" class="mb15">
        <GuageChart width="100%"
                    height="380px"
                    title="仪表盘"
                    :theme="theme"
                    :bgColor="backgroundColor"
                    :data=state.airTemperature.data
        ></GuageChart>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>
