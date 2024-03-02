<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";
import {isUsername, isPassword} from "@/utils/validate";
import {useAuthStore} from "@/stores/auth";
import {useRouter, useRoute} from "vue-router";
const auth = useAuthStore();
const state = reactive({
  isRemember: true,
  loading: false,
  loginData: {
    username: auth.rememberData?.username,
    password: auth.rememberData?.password
  } as LoginData
})

const {loginData, isRemember, loading} = {...toRefs(state)}
const formRef = ref()
const router = useRouter();
const route = useRoute();

function checkUsername(rule: any, value: string, callback: Function) {
  if (!value) return callback(new Error('请输入有效手机号/账号'))
  if (!isUsername(value)) return callback(new Error('账号或密码错误'))
  callback();
}

function checkPassword(rule: any, value: string, callback: Function) {
  if (!value) return callback(new Error('请输入有效密码'))
  if (!isPassword(value)) return callback(new Error('账号或密码错误'))
  callback();
}

function submitForm() {
  formRef.value.validate(async (valid: any) => {
    if (!valid) return;
    try {
      state.loading = true;
      auth.setRememberPwd(state.isRemember ? state.loginData : undefined)
      const res = await auth.userLogin(state.loginData)
      // 跳转
      await router.replace({path: <string>route.query?.redirect || '/'})
    } catch (e) {

    } finally {
      setTimeout(() => {
        state.loading = false;
      },300)
    }
    state.loading = false
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-wrap">
      <img src="/src/assets/images/logo.png" class="login-logo" alt="logo">
      <div class="logo-title">账号登录</div>
      <el-form class="logo-form" ref="formRef" :model="loginData" size="large">
        <el-form-item prop="username" :rules="{ required: true, validator: checkUsername,trigger: 'blur' }">
          <el-input v-model.trim="loginData.username" placeholder="请输入账号/手机号"
                    maxlength="30" type="text" prefix-icon="ele-User" clearable/>
        </el-form-item>
        <el-form-item prop="password" :rules="{ required: true, validator: checkPassword,trigger: 'blur' }">
          <el-input v-model.trim="loginData.password" placeholder="请输入密码"
                    maxlength="30" type="password" prefix-icon="ele-Unlock" show-password/>
        </el-form-item>
        <el-form-item>
          <div class="login-other">
            <el-checkbox v-model="isRemember">
              <span>记住密码</span>
            </el-checkbox>
          </div>
          <el-button class="login-submit" :loading="loading" type="primary" @click="submitForm()">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  height: 100%;
  width: 100%;
  background-image: url("@/assets/images/back.jpg");
  background-size: cover;
  overflow: hidden;
  display: flex;
  align-items: center;

  .login-wrap {
    width: 400px;
    height: 460px;
    background: white;
    padding: 30px;
    margin: auto;
    margin-right: 130px;
    box-shadow: rgba(16, 16, 17, 0.63) 0 2px 15px;
    border-radius: 10px;

    .login-logo {
      max-width: 230px;
      margin: auto;
      display: flex;
    }
  }

  .logo-title {
    font-size: 20px;
    height: 70px;
    line-height: 70px;
    font-weight: 500;
    text-align: left;
    color: #57585d;
    letter-spacing: 2px;
  }

  .logo-form {
    .el-form-item {
      margin-bottom: 27px;
    }

    .login-other {
      span {
        font-size: 13px;
        font-weight: 500;
        color: #3c3c3c;
      }
    }

    .login-submit {
      width: 100%;
      height: 40px;
      letter-spacing: 3px;
      font-weight: 500;
    }
  }
}
</style>
