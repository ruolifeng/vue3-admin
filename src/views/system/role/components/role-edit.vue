<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";

const state = reactive({
  dialogVisible: false,
  title: '新增',
  loading: false,
  type: 'edit' as FormType,
  formData: {} as SysRoleType
})

const {dialogVisible, title, formData, loading} = {...reactive(state)};
const formRef = ref();
const initData = {
  status: true,

}

/**
 * 关闭之前
 */
function handleClose() {
  state.dialogVisible = false;
}

/**
 * 提交表单
 */
function submitForm() {

}

/**
 * 关闭
 */
function close() {
  if (state.loading) return;
  formRef.value?.resetField();
  state.dialogVisible = false;
}

/**
 * 打开
 */
function open(type: FormType, title: string, data = {} as any) {
  state.type = type;
  JSON.parse(JSON.stringify({...initData, data}));
  state.dialogVisible = true;
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="state.dialogVisible"
             :title='title' width="500"
             :before-close="handleClose"
             center
             draggable
             style="width: 500px"
             close-on-click-modal
             destroy-on-close
  >
    <el-form v-loading="loading" ref="formRef" :model="formData" label-width="85px" label-position="right" status-icon
             label-suffix=":">
      <el-form-item label="角色名称" prop="roleName"
                    :rules="{required:true,message:'角色名称为必填项！',trigger:'blur'}">
        <el-input v-model="formData.roleName" placeholder="请输入角色名称" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="roleCode"
                    :rules="{pattern: /^[a-zA-Z0-9]{2,30}$/, message:'只允许输入2-30个字母/数字/下划线！', trigger:'blur'}">
        <el-input v-model="formData.roleCode" placeholder="请输入角色编码" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="角色状态" prop="status" :rules="{required:true,message:'此为必选项！',trigger:'change'}">
        <el-switch v-model="formData.status"
                   inline-prompt
                   active-text="启"
                   inactive-text="停"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注" maxlength="300"
                  show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <el-row justify="center" class="mt10">
      <el-button type="info" @click="close">取消</el-button>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-row>
  </el-dialog>
</template>

<style scoped>

</style>
