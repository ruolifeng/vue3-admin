<script setup lang="ts">

import {getList} from "@/api/system/menu";
import {ref, reactive, toRefs} from "vue";

const state = reactive({
  visible: false,
  loading: false,
  role:{} as SysRoleType,
  menuList: [] as SysMenuType[]
})

const {visible,loading,role,menuList} = toRefs(state);
// 查询所有菜单项
async function loadMenuList(){
  try {
    state.loading = true;
   const {data} =  await getList();
   state.menuList = data;
  }catch (e){

  }finally {
    state.loading = false;
  }
}

defineExpose({
  open
})

// 打开窗口
function open(role: SysRoleType){
  // 点击的角色对象
  state.role = role;
  state.visible = true;
  loadMenuList();
}

function close(){
  state.visible = false;
}
</script>

<template>
  <el-drawer v-model="visible" :title="`分配【${role.roleName}】权限`" :direction="'rtl'" :before-close="close" size="400px">
    <el-tree ref="treeRef" :data="menuList" show-checkbox node-key="id" :props="{children:'children'}" highlight-current>
      <template #default="{node,data}">
        <span class="custom-tree-node">
<!--          一二级菜单显示原生菜单图标-->
          <SvgIcon v-if="[1,2].includes(node.level)" :name="data.meta.icon"></SvgIcon>
<!--          三级菜单显示菜单或者按钮图标-->
          <el-icon v-else>
            <ele-Menu v-if="data.type == 1"></ele-Menu>
            <ele-SwitchButton v-if="data.type == 2"></ele-SwitchButton>
          </el-icon>
          <span class="ml5">{{data.meta.title}}</span>
        </span>
      </template>
    </el-tree>
    <template #footer>
      <el-button type="success" @click="close">提交</el-button>
      <el-button type="primary" @click="close">全选/不选</el-button>
      <el-button @click="close">展开/收起</el-button>
      <el-button type="danger" @click="close">取消</el-button>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.custom-tree-node{
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>
