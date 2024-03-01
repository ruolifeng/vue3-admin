<script setup lang="ts">
import {updatePsw} from "@/api/system/user";
import {reactive, ref, toRefs} from "vue";
const state = reactive({
  visible: true,
  loading: false,
  formData: {} as PwdResetForm
})
const formRef = ref()
const {visible,loading,formData} = toRefs(state)

const close = ()=>{
  if (state.loading)return
  state.visible = false;
}

const passwordValidator =  (rule:any, value:string, callback:Function)=>{
  if (!value) return callback(new Error('确认密码为不能为空'))
  if (state.formData.newPassword != value)return callback(new Error('两次输入密码不一致'))
  callback();
}

const submitForm = () =>{
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
  })
}
</script>

<template>
  <el-dialog v-model="visible"
             title="重置密码" width="600"
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
