<script setup lang="ts" name="GoodsCategory">
import useTablePage from '@/hooks/useTablePage';
import { getPageList, deleteRoleById } from '@/api/goods/category/list';
import CategoryEdit from "@/views/goods/components/categoryEdit.vue";
const {
  editRef, tableListRef,
  loading, query, page, tableList,
  queryData,
  handleQuery,
  handleDelete,
  handleAdd,
  handleEdit,
} = useTablePage<GoodsCategoryType, GoodsCategoryQuery>({getPageList,deleteRoleById});
</script>
<template>
    <div class="layout-padding">
      <!-- 条件查询 -->
      <el-form :inline="true" :model="query" label-width="80px" label-suffix=":" >
        <el-form-item label="分类名称">
          <el-input v-model="query.name" placeholder="请输入分类名称" clearable
                    maxlength="30"/>
        </el-form-item>
        <el-form-item>
          <el-button icon="ele-Search" type="primary" @click="handleQuery()">查询</el-button>
          <el-button icon="ele-Plus" type="success" @click="handleAdd()" >新增分类</el-button>
        </el-form-item>
      </el-form>
      <el-table ref="tableListRef" v-loading="loading" :data="tableList" border stripe>
        <el-table-column header-align="center" align="left" prop="name" label="分类名称" >
        </el-table-column>
        <el-table-column align="center" prop="status" label="分类状态" >
          <template #default="{row}">
            <el-tag :type="row.status ? 'success': 'warning'">{{ row.status ? '启用': '停用'
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sort" label="排序号" ></el-table-column>
        <el-table-column align="center" prop="remark" label="备注信息" ></el-table-column>
        <el-table-column align="center" label="操作" width="200" >
          <template #default="{row}">
            <el-button link type="warning" icon="ele-Edit" @click.stop="handleEdit(row)" >
              修改
            </el-button>
            <el-popconfirm width="auto" :title="`确定永久删除【${row.name}】吗?`"
                           @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button @click.stop icon="ele-Delete" link type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <m-paging :page="page" @pageChange="queryData"/>
        <!-- 新增/修改组件-->
      <CategoryEdit ref="editRef" @refresh="queryData"/>
    </div>
</template>

<style scoped>

</style>
