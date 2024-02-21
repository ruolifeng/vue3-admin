<script setup lang='ts'>
import {ref, resolveComponent} from 'vue';

// 使用h函数来直接操作dom，在没有第props参数的时候可以直接省略第二个参数，直接写元素体内容，参数三也可以直接写函数
import {h} from 'vue'

// const render = () => h('div', {class: 'bar', innerHTML: '这是h函数'})
// const render2 = () => h(resolveComponent('el-icon'),
//     {color: 'red'}, () => h(resolveComponent('ele-Plus')))
// 如果要让标签中的内容动态加载成组件则需要使用resolveDirective函数

const props = withDefaults(defineProps<{
  color?: string, // 图标颜色
  name?: string,  // 名称
  size?: number | string   // 大小
}>(), {
  name: '',
  color: '',
  size: 18
})
const render = () => {
  if (props.name?.startsWith('ele-')) {
    return h(resolveComponent('el-icon'),
        {color: props.color, size: props.size},
        () => h(resolveComponent(props.name)));
  } else {
    return h('i');
  }
}
</script>
<template>
  <render/>
</template>
<style scoped></style>
