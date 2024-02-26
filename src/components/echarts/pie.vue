<script lang="ts" setup>
import * as echarts from "echarts";
import {
  ref, reactive, markRaw, onMounted, onBeforeUnmount, watch, nextTick, onActivated
} from "vue";

const props = withDefaults(defineProps<{
  width?: string,
  height?: string,
  theme?: string,
  background?: string,
  title: string,
  subtitle: string,
  data: any[]
}>(), {
  width: '100%',
  height: '380px',
  data: () => []
});
// 图表渲染ref
const chartRef = ref();
const state = reactive({
  nvll: ['', null, undefined],// 用于判断饼图实例是否存在
  chart: null as any, // 饼图实例
});
// 不要少了中括号`[ ]`
watch(() => [props.data, props.theme], ([data, theme]) => {
// console.log('watch', data)
// nextTick，不然初始化时图表时，元素未绑定到 ref 上
  nextTick(() => {
    initChart();
  });
}, {deep: true});
// 初始化图表
function initChart () {
// 实例存在则移除
  if (state.nvll.indexOf(state.chart) === -1) state.chart.dispose();
// 初始化echarts实例，参数2：黑暗主题 'drak'
// 要使用 `markRaw` 返回该对象本身，而不是转为代理对象返回。防止 echarts 有些功能失效(如：
state.chart = markRaw(echarts.init(chartRef.value, props.theme));
// 绘制图表选项
const option = {
  backgroundColor: props.background,
  title: {
    text: props.title,
    subtext: props.subtitle, // 小标题
    x: 'left',
  },
  tooltip: {
    trigger: 'item' // 图表块，鼠标放上云显示详情
  },
  series: [
    {
      type: 'pie', // 饼状图
      name: '单位：元', //鼠标放上去显示文字
      radius: '60%',
      top: 20,
// 图饼展示数据
      data: props.data,
      emphasis: {
        itemStyle: { // 图形样式
          shadowBlur: 10, // 图形阴影的模糊大小
          shadowOffsetX: 0, // 阴影水平方向上的偏移距离
          shadowColor: 'rgba(0, 0, 0, 0.5)' //阴影颜色
        }
      }
    }
  ]
};
// const {chartRef} = useEcharts({props, option})
// 设置图表选项
  state.chart.setOption(option);
}
// 重置 echarts 图表大小
function echartsResizeFun () {
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
