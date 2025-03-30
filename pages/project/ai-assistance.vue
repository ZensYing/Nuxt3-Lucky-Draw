<script setup lang="ts">
import { ref } from 'vue';
import { deepseekService } from '~/services/deepseek';

const data = ref<any>(null);
const error = ref<any>(null);

async function fetchData() {
  try {
    data.value = await deepseekService.getSomeData({ /* params */ });
  } catch (err) {
    error.value = err;
  }
}

fetchData();
</script>

<template>
  <div>
    <h1>DeepSeek Data</h1>
    <div v-if="data">
      <pre>{{ data }}</pre>
    </div>
    <div v-if="error">
      <p>Error: {{ error.message }}</p>
    </div>
  </div>
</template>