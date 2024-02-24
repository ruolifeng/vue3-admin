<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const changeDark = ref(false)
</script>

<template>
  <div class="layout-header-user">
    <div class="layout-header-user-icon">
      <SvgIcon name="ele-FullScreen"></SvgIcon>
    </div>
    <div class="layout-header-user-icon">
      <el-switch
          style="--el-switch-on-color: #333;"
          v-model="changeDark"
          inline-prompt
          active-icon="ele-Moon"
          inactive-icon="ele-Sunny"
      />
    </div>
    <div>
      <el-dropdown>
    <span class="el-dropdown-link layout-header-user-icon">
      <el-avatar class="mr5" :size="30" src="https://images.rlfit.cn/images/202310221030306.gif"/>
      admin
      <SvgIcon class="mr5" name="ele-ArrowDown"/>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/')">首页</el-dropdown-item>
            <el-dropdown-item @click="router.push('/404')">404</el-dropdown-item>
            <el-dropdown-item divided @click="router.push('/logoOut')">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped>

</style>
