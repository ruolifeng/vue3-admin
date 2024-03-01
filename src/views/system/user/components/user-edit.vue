<script setup lang="ts">
import {useForm} from '@/hooks/useForm'
import {addUser, updateUser} from "@/api/system/user";

const emit = defineEmits(['refresh'])
const initData = {
  accountNonExpired: true,
  accountNonLocked: true,
  credentialsNonExpired: true,
};

const {
  formRef,
  title,
  type,
  dialogVisible,
  loading,
  formData,
  oldFormData,
  open,
  close,
  submitForm
} = useForm<SysUserType>({addUser, updateUser, initData}, emit)

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible"
             :title='title' width="600"
             center
             draggable
             style="width: 700px"
             close-on-click-modal
             destroy-on-close
  >
    <el-form v-loading="loading" ref="formRef" :model="formData" label-width="100px" label-position="right" status-icon
             label-suffix=":">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户昵称" prop="nickName"
                        :rules="{required:true,message:'用户昵称为必填项！',trigger:'blur'}">
            <el-input v-model.trim="formData.nickName" placeholder="请输入用户昵称" maxlength="20" show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户手机号" prop="mobile">
            <el-input v-model.trim="formData.username" placeholder="请输入用户手机号" maxlength="20" show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户手机号" prop="mobile">
            <el-input v-model.trim="formData.username" placeholder="请输入用户手机号" maxlength="20" show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户密码" prop="password"
                        :rules="{request: true, pattern: /^$[a-zA-Z0-9]{6,30}$/, message: '密码格式错误', trigger: 'blur'}">
            <el-input v-model.trim="formData.password" placeholder="请输入6~30位登录密码" maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分配角色" prop="roleIds">
            <!--        下拉框实现-->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱地址" maxlength="30" show-word-limit
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号锁定" prop="accountNonLocked"
                        :rules="{required:true,message:'此为必选项！',trigger:'change'}">
            <el-radio-group v-model="formData.accountNonLocked">
              <el-radio :label="true" border>未锁定</el-radio>
              <el-radio :label="false" border>锁定</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号过期" prop="accountNonExpired"
                        :rules="{required:true,message:'此为必选项！',trigger:'change'}">
            <el-radio-group v-model="formData.accountNonExpired">
              <el-radio :label="true" border>未过期</el-radio>
              <el-radio :label="false" border>过期</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码过期" prop="credentialsNonExpired"
                        :rules="{required:true,message:'此为必选项！',trigger:'change'}">
            <el-radio-group v-model="formData.credentialsNonExpired">
              <el-radio :label="true" border>未过期</el-radio>
              <el-radio :label="false" border>过期</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注" maxlength="300"
                        show-word-limit></el-input>
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row justify="center" class="mt10">
      <el-button type="danger" @click="close">取消</el-button>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-row>
  </el-dialog>
</template>

<style scoped>

</style>
