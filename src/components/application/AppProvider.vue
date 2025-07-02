<!-- src/components/application/AppProvider.vue -->
<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <NMessageProvider>
          <ContextHolder />
          <slot />
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>

<script setup lang="ts">
import {
  NLoadingBarProvider,
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  useDialog,
  useNotification,
  useMessage,
  useLoadingBar
} from 'naive-ui'
import { createTextVNode, defineComponent } from 'vue'

defineOptions({ name: 'AppProvider' })

const ContextHolder = defineComponent({
  name: 'ContextHolder',
  setup() {
    window.$loadingBar = useLoadingBar()
    window.$dialog = useDialog()
    window.$message = useMessage()
    window.$notification = useNotification()
    return () => createTextVNode('')
  }
})
</script>
