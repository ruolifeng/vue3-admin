<script setup lang="ts" name="Author">
import {useRoute} from "vue-router";
import {watch, reactive} from "vue";
import {verifyUrl} from "@/utils/validate";

const state = reactive({
  title: '',
  link: ''
})

// 当前项目域名
const hostName = window.location.hostname;
const useRout = useRoute();
watch(() => useRout.path, () => {
  state.title = useRout.meta?.title || '外链';
  state.link = useRout.meta?.linkTo || '';
}, {immediate: true}) //立即执行

/**
 * 打开外部网站
 */
function handleOpenPage() {
  const {origin, pathname} = window.location;
  if (verifyUrl(state.link)) window.open(state.link)
  else window.open(`${origin}${state.link}`)
}
</script>

<template>
  <div class="link-container layout-padding flex-column-center">
    <img class="link-img" src="@/assets/link.svg" alt="link">
    <div class="link-wrap">
      <h3>即将跳转至外部网站[{{ state.title }}]</h3>
      <div>您将要访问的网页不属于{{ hostName }},请关注账号安全</div>
      <div>{{ state.link }}</div>
      <el-button class="link-btn" @click="handleOpenPage" type="danger" round>继续前往访问</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.link-container {
  .link-img {
    width: 200px;
  }

  .link-wrap {
    width: 500px;
    border: 1px solid var(--rlf-border-color-light);
    border-radius: 10px;
    padding: 20px;
    line-height: 30px;
    font-size: 15px;
    margin-top: 20px;

    .link-btn {
      float: right;
    }
  }
}
</style>
