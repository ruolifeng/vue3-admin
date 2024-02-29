<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";
import {addRole, updateRole} from "@/api/system/role";
import {notify} from "@/utils/element";

const state = reactive({
  dialogVisible: false,
  title: '新增',
  loading: false,
  type: 'edit' as FormType,
  formData: {} as SysRoleType
})

const {dialogVisible, title, formData, loading} = {...toRefs(state)};
const formRef = ref();
const initData = {
  status: true,
}

// 定义事件
const emit = defineEmits(['refresh'])
/**
 * 关闭之前
 */
function handleClose() {
  close();
}

/**
 * 提交表单
 */
function submitForm() {
  formRef.value?.validate((valid: boolean) => {
    if (!valid) return;
    submitData();
  })
}

/**
 * 关闭
 */
function close() {
  if (state.loading) return;
  // formRef.value?.resetField();
  state.dialogVisible = false;
}

/**
 * 打开
 */
function open(type: FormType, title: string, data = {} as any) {
  state.type = type;
  state.formData = JSON.parse(JSON.stringify({...initData, ...data}));
  state.dialogVisible = true;
}

/**
 * 提交数据
 */
async function submitData(){
  try {
    state.loading = true;
    let res = {} as any;
    if (state.type === 'edit'){
      res = await updateRole(state.formData);
    }else {
      // 新增
      res = await addRole(state.formData);
    }
    state.dialogVisible = false;
    if (res.code !== 20000) return;
    notify('操作成功',{type: "success"});
    close();
    emit('refresh')
  }catch (e){

  }finally {
      state.loading = false;
  }
}
defineExpose({
  open
})

</script>

<template>
  <el-dialog v-model="state.dialogVisible"
             :title='title' width="500"
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
                    :rules="{pattern: /^[a-zA-Z0-9_]{2,30}$/, message:'只允许输入2-30个字母/数字/下划线！', trigger:'blur'}">
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
      <el-button type="danger" @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-row>
  </el-dialog>
</template>

<style scoped>

</style>
