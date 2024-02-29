<script setup lang="ts" name="SystemRole">
import {getPageList, deleteRoleById} from "@/api/system/role";

import {reactive, toRefs, onMounted, nextTick, defineAsyncComponent, ref} from "vue";
import {notify} from "@/utils/element";

const RoleEdit = defineAsyncComponent(()=> import('@/views/system/role/components/role-edit.vue'))
// 定义状态
const state = reactive({
  loading: false,
  page: {
    current: 1, // 当前页
    size: 20, // 每页显示条数
    total: 0 // 总记录数
  } as PageType,
  query: {
    name: ''// 角色名称
  } as SysRoleQuery,
  tableList: [] as SysRoleType[]
});

const {loading, page, query, tableList} = toRefs(state);
const editRef = ref();
onMounted(() => {
  queryData()
});

/**
 * 查询列表数据
 */
async function queryData() {
  try {
    state.loading = true;
    const {current, size} = state.page;
    const {data} = await getPageList(state.query, current, size);
    state.tableList = []; // 清空之前的数据
    await nextTick(() => {
      state.tableList = data.records;
      state.page.total = data.total;
    });
  } catch (e) {
    console.error(e);
  } finally {
    state.loading = false;
  }
}

/**
 * 分配权限
 */
function handlePermission(row: SysRoleType) {
  console.log('分配权限', row);
}

/**
 * 编辑
 */
function handleEdit(row: SysRoleType) {
  editRef.value.open('edit', '修改', row)
}

/**
 * 删除
 */
async function handleDelete(id: string) {
  try {
    state.loading = true;
    await deleteRoleById(id);
    notify('删除成功', {type: 'success'});
    await queryData();
  }catch (e){
    console.log(e)
  }finally {
    state.loading = false;
  }
}

/**
 * 新增
 */
function handleAdd() {
  editRef.value.open('add', '新增');
}

/**
 * 点击查询
 */
function handleQuery(){
  // 将页码设置为第一页
  state.page.current = 1;
  queryData();
}
</script>

<template>
  <div class="layout-padding">
    <RoleEdit ref="editRef" @refresh="queryData"></RoleEdit>
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="query.name" maxlength="30" placeholder="请输入角色名称" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button icon="ele-Search" @click="handleQuery()" type="primary">查询</el-button>
        <el-button icon="ele-Plus" @click="handleAdd()" type="success">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
        class="w100"
        v-loading="loading"
        ref="tableListRef"
        :data="tableList"
        border
        stripe>
        <el-table-column type="index" width="60" align="center" label="序号"/>
        <el-table-column align="center" label="角色名称" prop="roleName"/>
        <el-table-column align="center" label="角色代码" prop="roleCode"/>
        <el-table-column align="center" label="角色状态">
          <template #default="{row}">
            <el-tag :type="row.status? 'success':'danger'">{{ row.status? '启用':'禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标记" prop="remark"/>
        <el-table-column fixed="right" align="center" label="操作" width="270">
          <template #default="{row}">
            <el-button @click.stop="handlePermission(row)" type="success" size="small" icon="ele-Check" link>分配权限</el-button>
            <el-button @click.stop="handleEdit(row)" type="primary" size="small" icon="ele-Edit" link>编辑</el-button>
            <el-popconfirm @confirm="handleDelete(row.id)" :title="`确定永久删除【${row.roleName}】吗？`">
              <template #reference>
                <el-button @click.top icon="ele-Delete" type="danger" size="small" link>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>

<!--    分页-->
    <m-paging :page="page" @pageChange="queryData"/>
  </div>
</template>

<style scoped>

</style>
