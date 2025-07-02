<template>
  <div class="p-4">
    <h1>首页</h1>
    <n-button @click="count++">点击次数：{{ count }}</n-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
window.$message?.success('欢迎来到首页')
</script>