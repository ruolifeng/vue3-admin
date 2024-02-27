<script setup lang="ts" name="SystemMenu">
import {getList} from "@/api/system/menu";
import {reactive, toRefs, onMounted} from "vue";

const state = reactive({
  loading: false,
  query: {
    keyWord: ''
  } as SysMenuQuery,
  tableList: [] as SysMenuType[]
})
onMounted(() => {
  queryData();
})
const {tableList, query, loading} = {...toRefs(state)}

async function queryData() {
  try {
    loading.value = true
    const {data} = await getList(query.value)
    state.tableList = data
  } catch (error) {
  } finally {
    state.loading = false
  }
}
</script>

<template>
  <div>
    <!--    data接收的数组元素中要有children属性，必须指定唯一标识row-key="id"-->
    <el-table
        ref="tableListRef"
        v-loading="loading"
        :data="tableList"
        row-key="id"
        border
        stripe
    >
      <el-table-column prop="meta.title" label="菜单名称" header-align="center" align="left" show-overflow-tooltip>
        <!--        默认插槽，上面的内容将会失效，以默认插槽中的为主，数组中的每一个对象都会传递给我我们叫做row-->
        <template #default="{row}">
          <SvgIcon :name="row.meta?.icon ||''"></SvgIcon>
          <span class="ml10">{{ row.meta?.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路由地址" header-align="center" align="left" show-overflow-tooltip/>
      <el-table-column prop="component" label="组件路径" header-align="center" align="left" show-overflow-tooltip/>
      <el-table-column prop="code" label="权限标识" header-align="center" align="left" show-overflow-tooltip/>
      <el-table-column prop="type" label="类型" header-align="center" align="center">
        <template #default="{row}">
          <el-tag effect="plain" :type="row.type == 1? '':'success'">{{ row.type == '1' ? '菜单' : '按钮' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" header-align="center" align="center"/>
      <el-table-column label="操作" header-align="center" align="center">

      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>
