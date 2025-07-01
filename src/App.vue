<template>
  <n-config-provider :theme-overrides="{}">
    <n-message-provider>
      <n-notification-provider>
        <router-view />
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NNotificationProvider, useMessage, useNotification } from 'naive-ui'
import { onMounted } from 'vue'

onMounted(() => {
  // 设置全局 message 与 notification
  window.$message = useMessage()
  window.$notification = useNotification()
})
</script>