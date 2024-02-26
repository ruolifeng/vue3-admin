<script setup lang="ts">
import {markRaw, nextTick, onActivated, onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import * as echarts from "echarts";

const props = withDefaults(defineProps<{
  width?: string,
  height?: string
  theme?: string
  bgColor?: string,
  title: string,
  subTitle?: string,
  data: number[],
  xAxisData: string[] // x轴数据
}>(), {
  width: '100%',
  height: '380px',
  data: () => []
});
const chartRef = ref();
const state = reactive({
  nvll: ['', null, undefined],// 用于判断饼图实例是否存在
  chart: null as any, // 饼图实例
});
watch(() => [props.data, props.theme], ([data, theme]) => {
// console.log('watch', data)
// nextTick，不然初始化时图表时，元素未绑定到 ref 上
  nextTick(() => {
    initChart();
  });
}, {deep: true});

function initChart() {
  if (state.nvll.indexOf(state.chart) === -1) state.chart.dispose();
  state.chart = markRaw(echarts.init(chartRef.value, props.theme));
  const option = {
    backgroundColor: props.bgColor,
    title: {
      text: props.title,
      subtext: props.subTitle,
      x: 'left'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type:'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: props.xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.data,
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: '#83bff6'},
            {offset: 0.5, color: '#188df0'},
            {offset: 1, color: '#188df0'}
          ])
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  state.chart.setOption(option);
}

// 重置 echarts 图表大小
function echartsResizeFun() {
  state.chart && state.chart.resize();
}

onMounted(() => {
// 监听浏览器窗口大小改变，重置图表大小
  window.addEventListener('resize', echartsResizeFun);
});
// 使用了 <keep-alive> 页面缓存组件，每次从缓存中被重新插入时，重置图表大小
onActivated(() => {
  echartsResizeFun();
});
// 组件销毁前触发
onBeforeUnmount(() => {
  document.removeEventListener('resize', echartsResizeFun);
  if (state.chart) {
    state.chart.dispose();
    state.chart = null;
  }
});
</script>

<template>
  <el-card shadow="hover">
    <div ref="chartRef" :style="{ height: props.height, width: props.width }"></div>
  </el-card>
</template>

<style scoped>

</style>
