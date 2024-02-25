<script setup lang="ts" name="NotFind">
import {useRouter} from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="error-container layout-padding">
    <img class="error-img" src="@/assets/404.svg" alt="404">
    <div class="error-wrap">
      <h3 class="error-title">NotFind this page</h3>
      <div class="error-msg">please return</div>
      <el-button type="success" @click.prevent="router.push('/')" round>back</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.error-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .error-img {
    width: 350px;
  }

  .error-wrap {
    margin-left: 50px;

    .error-msg {
      font-size: 13px;
      color: var(--el-color-info);
      margin: 10px 0 30px 0;
    }

    .error-title {
      font-size: 30px;
      font-weight: 600;
    }
  }
}
</style>
