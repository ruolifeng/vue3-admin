<script setup lang="ts" name="SystemMenu">
import {getList, deleteMenuById} from "@/api/system/menu";
import {reactive, toRefs, onMounted, ref, defineAsyncComponent} from "vue";
import {notify} from "@/utils/element";

const MenuEdit = defineAsyncComponent(() => import('@/views/system/menu/components/menu-edit.vue'))
const tableListRef = ref();

// 修改菜单ref
const editRef = ref()

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

// 点击行，展开，收起子菜单
function toggleRow(row: SysMenuType) {
  console.log('toggleRow', row)
  tableListRef.value.toggleRowExpansion(row)
}

function handleAdd(id?: string) {
  console.log(id)
  editRef.value.open('add', '新增', {id})
}

async function handleEdit(row: SysMenuType) {
  editRef.value.open('edit', '修改', JSON.parse(JSON.stringify(row)))
}

async function handleDelete(id: string) {
  try {
    state.loading = true
    await deleteMenuById(id)
    notify('删除成功！', {type: "success"})
    await queryData()
  } catch (error) {

  } finally {
    state.loading = false
  }
}
</script>

<template>
  <div class="layout-padding">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="菜单名称">
        <el-input v-model="query.keyWord" placeholder="请输入菜单名称" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button icon="ele-Search" @click="queryData()" type="primary">查询</el-button>
        <el-button icon="ele-Plus" @click="handleAdd()" type="success">新增</el-button>
      </el-form-item>
    </el-form>
    <!--    data接收的数组元素中要有children属性，必须指定唯一标识row-key="id"-->
    <el-table
        class="w100"
        ref="tableListRef"
        v-loading="loading"
        :data="tableList"
        row-key="id"
        border
        stripe
        @row-click="toggleRow"
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
          <el-tag effect="plain" :type="row.type == 1? 'primary':'success'">{{ row.type == '1' ? '菜单' : '按钮' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" header-align="center" align="center"/>
      <el-table-column label="操作" header-align="center" align="center" width="240px">
        <template #default="{row}">
          <el-button @click.stop="handleAdd(row.id)" v-if="row.type != 2" icon="ele-Plus" type="primary" link>新增下级
          </el-button>
          <el-button @click.stop="handleEdit(row)" v-if="row.type != 2" icon="ele-Edit" type="warning" link>修改
          </el-button>
          <el-popconfirm @confirm="handleDelete(row.id)" :title="`确定永久删除【${row.meta?.title}】吗？`">
            <template #reference>
              <el-button @click.stop icon="ele-Delete" type="danger" link>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--    新增编辑和弹出组件-->
    <MenuEdit ref="editRef" @refresh="queryData"></MenuEdit>
  </div>
</template>

<style scoped>

</style>
