// src/App.vue
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import AppProvider from '@/components/application/AppProvider.vue'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#409eff'
  }
}
</script>
