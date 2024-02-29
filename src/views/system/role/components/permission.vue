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
  <el-drawer v-model="visible" :title="`分配【${role.roleName}】权限`" :direction="'rtl'" :before-close="close" size="650px">
    <el-tree
        :data="menuList"
        show-checkbox
    />
  </el-drawer>
</template>

<style scoped>

</style>
