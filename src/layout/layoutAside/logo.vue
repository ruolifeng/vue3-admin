<script setup lang="ts" name="LayoutLogo">
import {useLayoutConfigStore} from "@/stores/layoytConfig";

const store = useLayoutConfigStore();
</script>

<template>
  <div class="layout-logo">
    <img class="layout-logo-img" src="@/assets/images/favicon.png" alt="logo">
    <span v-if="!store.isCollapse">{{ store.globalTitle }}</span>
  </div>
</template>

<style scoped>

</style>
