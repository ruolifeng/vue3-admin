<script setup lang="ts">

import {getList} from "@/api/system/menu";
import {ref, reactive, toRefs} from "vue";
import {getMenuIdsByRoleId,saveRoleMenu} from "@/api/system/role";
import {notify} from "@/utils/element";

const state = reactive({
  visible: false,
  loading: false,
  role:{} as SysRoleType,
  menuList: [] as SysMenuType[],
  menuIds: [] as string[], // 角色拥有的ids
  checked: false,
  expandAll: false,
  submitting: false
})

const {visible,loading,role,menuList,menuIds} = toRefs(state);
const treeRef = ref();
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
async function open(role: SysRoleType){
  // 点击的角色对象
  state.role = role;
  state.visible = true;
  await loadMenuList();
  await loadMenuIdsByRoleId();
  checkOldMenuNode();
}

function close(){
  if (state.submitting) return;
  state.menuIds = [];
  state.menuList = [];
  state.checked = false;
  state.expandAll = false;
  state.visible = false;
}

/**
 * 查询角色原有的权限菜单ids
 */
async function loadMenuIdsByRoleId(){
  try {
    state.loading = true;
    const {data} = await getMenuIdsByRoleId(state.role.id)
    state.menuIds = data;
  }catch (e){

  }finally {
    state.loading = false;
  }
}

/**
 * 进行回显已经拥有的菜单节点
 */
function checkOldMenuNode(){
  const {menuIds} = state;
  menuIds.forEach(id => {
    // 获取节点对象
   const node =  treeRef.value.getNode(id);
    // 根据节点，判断是不是子节点，如果是子节点则勾选，否则则不勾选，因为父节点会自动帮我们勾上
    if (node && node.isLeaf){
      treeRef.value.setChecked(id,true);
    }
  });
}

/**
 * 实现全选和不选
 */
function handleCheckAll(){
  state.checked = !state.checked;
  if (state.checked){
    treeRef.value.setCheckedNodes(state.menuList);
  }else {
    treeRef.value.setCheckedNodes([]);
  }
}

/**
 * 实现展开和收起
 */
function handleExpend(){
  state.expandAll = !state.expandAll;
  changeTreeNodeStatus(treeRef.value.store.root);
}

/**
 * 递归所有节点将他的子节点展开
 */
function changeTreeNodeStatus(node:any){
  node.expanded = state.expandAll;
  for (let i = 0; i < node.childNodes.length; i++){
    // 改变节点的自身expended状态
    node.childNodes[i].expended = state.expandAll;
    // 查询当前节点是否还存在子节点
    if (node.childNodes[i].childNodes.length > 0){
      // 递归此节点下的N级子节点
      changeTreeNodeStatus(node.childNodes[i]);
    }
  }
}

/**
 * 提交表单数据
 */
async function submitForm(){
  try {
    state.submitting = true;
    // 收集菜单ids
    let menuIds = [] as string[];
    const checkIds = treeRef.value.getCheckedKeys();
    // 收集半选中
    const parentIds = treeRef.value.getHalfCheckedKeys();
    // 组合
    menuIds = parentIds.concat(checkIds);
    await saveRoleMenu(state.role.id,menuIds);
    notify('分配权限成功',{type:"success"});
    state.submitting = false; // 防止关闭不了窗口
    close();
  }catch (e){

  }finally {
    state.submitting = false;
  }
}
</script>

<template>
  <el-drawer v-model="visible" :title="`分配【${role.roleName}】权限`" :direction="'rtl'" :before-close="close" size="400px">
    <div v-loading="state.loading">
      <el-tree ref="treeRef" :data="menuList" show-checkbox node-key="id" :props="{children:'children'}" highlight-current :default-expand-all="state.expandAll">
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
    </div>
    <template #footer>
      <el-button type="success" :loading="state.submitting" @click="submitForm">提交</el-button>
      <el-button type="primary" @click="handleCheckAll">全选/不选</el-button>
      <el-button type="info" @click="handleExpend">展开/收起</el-button>
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
