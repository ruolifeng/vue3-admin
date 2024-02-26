<script setup lang="ts">
import {getCategoryData} from "@/api/home";
import {onMounted, reactive} from "vue";

const state = reactive({
  category: {
    loading: false,
    data: [],
  }
})
onMounted(() => {
  loadCategoryData();
})

async function loadCategoryData() {
  try {
    state.category.loading = true;
    const {data} = await getCategoryData();
    state.category.data = data;
  } catch (error) {

  } finally {
    state.category.loading = false;
  }
}
</script>

<template>
{{state.category.data}}
</template>

<style scoped>

</style>
