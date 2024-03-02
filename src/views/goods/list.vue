<script setup lang="ts" name="GoodsList">
import {getPageList,deleteRoleById} from "@/api/goods/list";
import {useTablePage} from '@/hooks/useTablePage'
const {
  tableListRef,
  editRef,
  loading,
  page,
  query,
  tableList,
  queryData,
  handleAdd,
  handleEdit,
  handleDelete,
  handleQuery,
} = useTablePage<GoodsType,GoodsQuery>({getPageList,deleteRoleById})
</script>

<template>
  <div class="layout-padding">
    <el-form :inline="true" :model="query" class="demo-form-inline" label-suffix=":">
      <el-form-item label="名称/编码">
        <el-input v-model="query.keyword" maxlength="50" placeholder="请输入商品名称/编码/简码" clearable style="width: 300px"/>
      </el-form-item>
      <el-form-item label="商品状态">
        <el-select v-model="query.status" placeholder="请选择商品状态" style="width: 300px" clearable>
          <el-option label="已上架" :value="1"></el-option>
          <el-option label="已下架" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="ele-Search" @click="handleQuery()" type="primary">查询</el-button>
        <el-button icon="ele-Plus" @click="handleAdd()" type="success">新增商品</el-button>
      </el-form-item>
    </el-form>
    <el-table
        class="w100"
        v-loading="loading"
        ref="tableListRef"
        :data="tableList"
        border
        stripe>
      <el-table-column fixed="left" header-align="center" align="center" label="商品名称" width="230" show-overflow-tooltip>
        <template #default="{row}">
          <div  class="flex">
            <el-avatar shape="square" :size="50" :src="row.imageUrl" icon="ele-Goods"></el-avatar>
           <div class="ml10">
             <div >{{row.name}}</div>
             <el-link type="primary">{{row.code}}</el-link>
           </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品规格" prop="specsName"/>
      <el-table-column align="center" label="所属分类" prop="categoryName"/>
      <el-table-column align="center" label="快捷码" prop="quickCode" show-overflow-tooltip/>
      <el-table-column align="center" label="单位" prop="unitName" show-overflow-tooltip/>
      <el-table-column align="center" label="库存" prop="stockNum" show-overflow-tooltip/>
      <el-table-column align="center" label="销售价" prop="price" show-overflow-tooltip/>
      <el-table-column align="center" label="创建时间" sortable prop="createTime" width="200"/>
        <el-table-column align="center" label="商品特价" prop="price" width="100" show-overflow-tooltip>
          <template #default="{row}">
            {{row.discountPrice?`￥${row.discountPrice}`:'无'}}
          </template>
        </el-table-column>
      <el-table-column align="center" label="成本价" sortable prop="cost" width="100"/>
      <el-table-column align="center" label="入库时间" sortable prop="createTime" width="200"/>
      <el-table-column align="center" label="商品状态" width="110">
        <template #default="{row}">
          <el-switch v-model="row.status" active-text="已上架" inactive-text="已下架" :active-value="1" :inactive-value="0" inline-prompt></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="140">
        <template #default="{row}">
          <el-button @click.stop="handleEdit(row)" type="primary" size="small" icon="ele-Edit" link>编辑</el-button>
          <el-popconfirm @confirm="handleDelete(row.id)" :title="`确定永久删除【${row.name}】吗？`">
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
