<script setup lang="ts" name="SystemUser">
import {deleteUserById,getPageList} from "@/api/system/user";
import {useTablePage} from '@/hooks/useTablePage'
import {defineAsyncComponent, ref} from "vue";
const UserEdit = defineAsyncComponent(()=>import('@/views/system/user/components/user-edit.vue'))
const Password = defineAsyncComponent(()=>import('@/views/system/user/components/password.vue'))
const {tableListRef,
  editRef,
  page,
  tableList,
  loading,
  query,
  queryData,
  handleAdd,
  handleEdit,
  handleDelete,
  handleQuery
} = useTablePage<SysUserType, SysUserQuery>({getPageList: getPageList,deleteRoleById: deleteUserById});
const passwordRef = ref()
/**
 * 重置密码
 */
function handlePwd(row:SysUserType){
  passwordRef.value.open(row)
}
</script>

<template>
  <div class="layout-padding">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item >
        <el-input v-model="query.keyWord" maxlength="50" placeholder="请输入用户账号/名称/手机号" clearable style="width: 300px"/>
      </el-form-item>
      <el-form-item>
        <el-button icon="ele-Search" @click="handleQuery()" type="primary">查询</el-button>
        <el-button icon="ele-Plus" @click="handleAdd()" type="success">新增用户</el-button>
      </el-form-item>
    </el-form>
    <el-table
        class="w100"
        v-loading="loading"
        ref="tableListRef"
        :data="tableList"
        border
        stripe>
      <el-table-column fixed="left" align="center" label="用户名称" prop="nickName" width="120"/>
      <el-table-column align="center" label="用户账号" prop="username" width="120"/>
      <el-table-column align="center" label="用户手机" prop="mobile" width="120"/>
      <el-table-column align="center" label="用户邮箱" prop="email"/>
      <el-table-column align="center" label="账号锁定" prop="email">
        <template #default="{row}">
          <el-tag :type="row.accountNonLocked ? 'success': 'danger'" effect="dark">{{row.accountNonLocked ? '正常': '锁定'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号过期" prop="email">
        <template #default="{row}">
          <el-tag :type="row.accountNonLocked ? 'success': 'danger'" effect="dark">{{row.accountNonExpired ? '正常': '过期'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="密码过期" prop="email">
        <template #default="{row}">
          <el-tag :type="row.accountNonLocked ? 'success': 'danger'" effect="dark">{{row.credentialsNonExpired ? '正常': '过期'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" sortable prop="createTime" width="200"/>
      <el-table-column fixed="right" align="center" label="操作" width="270">
        <template #default="{row}">
          <el-button @click.stop="handlePwd(row)" type="success" size="small" icon="ele-Key" link>密码重置</el-button>
          <el-button @click.stop="handleEdit(row)" type="primary" size="small" icon="ele-Edit" link>编辑</el-button>
          <el-popconfirm @confirm="handleDelete(row.id)" :title="`确定永久删除【${row.nickName}】吗？`">
            <template #reference>
              <el-button @click.top icon="ele-Delete" type="danger" size="small" link>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--    分页-->
    <m-paging :page="page" @pageChange="queryData"/>
    <!--编辑-->
    <UserEdit ref="editRef" @refresh="queryData"></UserEdit>
<!--    重置密码-->
    <Password ref="passwordRef"></Password>
  </div>
</template>

<style scoped>

</style>
