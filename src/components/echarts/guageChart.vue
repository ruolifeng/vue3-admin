<script setup lang="ts">
import {markRaw, nextTick, onActivated, onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import * as echarts from "echarts";

interface lives {
  province: string,
  city: string,
  adcode: string,
  weather: string,
  temperature: string,
  winddirection: string,
  windpower: string,
  humidity: string,
  reporttime: string,
  temperature_float: string,
  humidity_float: string,
  newDate:string
}

const props = withDefaults(defineProps<{
  width?: string;
  height?: string;
  theme?: string;
  bgColor?: string;
  title?: string;
  data: lives[]; // 数据
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
// 绘制图表选项
  const option = {
    backgroundColor: props.bgColor,
    title: {
      text: props.data[1] +'🥱'+ props.data[0].city+'→'+props.data[0].weather,
      subtext:'数据来自高德地图',
      x: 'left',
    },
    series: [
      { // 仪表盘效果
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        splitNumber: 12,
        itemStyle: {
          color: '#FFAB91'
        },
        progress: {
          show: true,
          width: 30
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 30
          }
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          distance: -20,
          color: '#999',
          fontSize: 20
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          fontSize: 60,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'inherit'
        },
        data: [
          {
            value: parseInt(props.data[0].temperature)
          }
        ]
      },
      { // 下方数字效果
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        itemStyle: {
          color: '#FD7347'
        },
        progress: {
          show: true,
          width: 8
        },
        // data: [
        //   {
        //     value: 1
        //   }
        // ]
      }
    ]
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
    <div ref="chartRef" :style="{height: props.height, width: props.width}"></div>
  </el-card>
</template>
<style lang="scss" scoped>
</style>
