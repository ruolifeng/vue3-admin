<script lang="ts" setup>

import {computed, markRaw, nextTick, onActivated, onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import * as echarts from "echarts";

interface Series {
  typeName: string;
  list: number[];
}

const props = withDefaults(defineProps<{
  width?: string,
  height?: string
  theme?: string
  bgColor?: string,
  title: string,
  subTitle?: string,
  data: Series[],
  xAxisData: string[] // x轴数据
}>(), {
  width: '100%',
  height: '380px',
  data: () => []
})
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

// 计算获取数值
const legend = computed(() => props.data.map(item => item.typeName));
const series = computed(() => props.data.map(item => ({
  name: item.typeName,
  type: 'line',
  smooth: 0.5,
  emphasis: {
    focus: 'series'
  },
  data: item.list,
})));

function initChart() {
  if (state.nvll.indexOf(state.chart) === -1) state.chart.dispose();
  state.chart = markRaw(echarts.init(chartRef.value, props.theme));
  const option = {
    backgroundColor: props.bgColor,
    title: {
      text: props.title
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legend.value,
      right: '50px'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: series.value
  }
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
<style></style>
