<script setup lang="ts">
import {updatePsw} from "@/api/system/user";
import {reactive, ref, toRefs} from "vue";
import {notify} from "@/utils/element";
const state = reactive({
  visible: false,
  loading: false,
  formData: {} as PwdResetForm,
  user: {} as SysUserType
})
const formRef = ref()
const {visible,loading,formData,user} = toRefs(state)

const close = ()=>{
  if (state.loading)return
  formRef.value?.resetFields
  state.visible = false;
}

const passwordValidator =  (rule:any, value:string, callback:Function)=>{
  if (!value) return callback(new Error('确认密码为不能为空'))
  if (state.formData.newPassword != value)return callback(new Error('两次输入密码不一致'))
  callback();
}

const submitForm = () =>{
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    try {
      state.loading = true
      await updatePsw(state.formData)
      state.loading = false
      notify('密码重置成功', {type: 'success'})
      close()
    }catch (e){

    }finally {
      state.loading = false
    }
  })
}

const open = (row: SysUserType)=>{
  state.user = row
  state.formData.userId = row.id
  state.visible = true;
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="visible"
             :title="`重置【${user.nickName}】密码`" width="600"
             center
             draggable
             style="width: 500px"
             close-on-click-modal
             destroy-on-close
  >
    <el-form v-loading="loading" ref="formRef" :model="formData" label-width="100px" label-position="right" status-icon
             label-suffix=":">
    <el-form-item label="新密码" prop="newPassword" :rules="{required: true, pattern: /^[a-zA-Z0-9_]{6,30}$/, message: '密码格式错误', trigger: 'blur'}">
      <el-input type="password" v-model.trim="formData.newPassword" placeholder="请输入6~30位新密码" maxlength="20"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="repPassword" :rules="{required: true, validator: passwordValidator, trigger: 'blur'}">
      <el-input type="password" v-model.trim="formData.repPassword" placeholder="请输入确认密码" maxlength="20"></el-input>
    </el-form-item>
    </el-form>
    <el-row justify="center" class="mt10">
      <el-button type="danger" @click="close">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<style scoped>

</style>
