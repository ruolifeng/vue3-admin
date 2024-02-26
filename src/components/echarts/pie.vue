<script setup lang="ts">
import * as echarts from 'echarts';
import {ref, markRaw, onMounted, reactive, watch, nextTick} from 'vue'

// 通过使用ref可以在组件中访问和操作元素
const chartRef = ref();
// 由于onMounted 只会在挂载的时候执行一次，所以会导致图表二次加载的时候无法正常显示，所以使用Watch
onMounted(() => {
  initChart();
})

const state = reactive({
  chart: null as any, // 图表实例
  null: ['', null, undefined], // 用于判断是否存在实例
})

interface DataType {
  name: string;
  value: any;
}

const props = withDefaults(defineProps<{
  width?: string,
  height?: string,
  theme?: string
  background?: string,
  title: string,
  subtitle: string,
  data: DataType[]
}>(), {
  width: '100%',
  height: '380px',
  data: () => []
});

function initChart() {
  // 实例存在则销毁
  if (state.null.indexOf(state.chart) === -1) state.chart.dispose
  // 参数一：容器ref值
  // 参数二：指定主题
  // markRaw Marks an object so that it will never be converted to a proxy. Returns the object itself. 转换成非响应式对象
  //  state.chart = markRaw(echarts.init(chartRef.value, props.theme));
  state.chart = markRaw(echarts.init(chartRef.value, props.theme));
  const option = {
    backgroundColor: props.background,
    title: {
      text: props.title,
      subtext: props.subtitle,
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        name: '单位：元',
        type: 'pie',
        radius: '60%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  state.chart.setOption(option);

}
</script>

<template>
  <el-card shadow="hover">
    <!--    <div ref="chartRef" style="height: 380px; width: 100%"></div>-->
    <div ref="chartRef" style="height: 380px; width: 100%"></div>
  </el-card>
</template>

<style scoped>

</style>
