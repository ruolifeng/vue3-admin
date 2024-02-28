<script setup lang="ts">

// props声明的类型不能以外部文件的方式导入
const props = withDefaults(defineProps<{
  page: {
    current: number,
    size: number,
    total: number
  },
  small?: boolean, // 是否显示小页码
  background?: boolean,
  layout?: string,
  always?: boolean, // 0条数据的时候是否显示分页
  pageCount?: number // 最多展示多少个页码按钮
}>(), {
  small: false,
  background: true,
  layout: "prev, pager, next, total, jumper, sizes",
  always: false,
  pageCount: 7
})

const emit = defineEmits(['pageChange'])
</script>

<template>
  <div>
    <el-row v-show="page.total || always" justify="end" class="mt20">
      <el-pagination
          v-model:page-size="props.page.size"
          v-model:current-page="props.page.current"
          :page-sizes="[10, 20, 50, 100]"
          :small="props.small"
          :background="props.background"
          :layout="props.layout"
          :total="props.page.total"
          :page-count=props.pageCount
          class="mt-4"
          @size-change="emit('pageChange')"
          @current-change="emit('pageChange')"
      />
    </el-row>
  </div>
</template>

<style scoped>

</style>
