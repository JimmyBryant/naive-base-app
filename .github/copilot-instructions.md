# AI Agent Instructions for naive-base-app

## 项目概述

这是一个 **Vite + Vue 3 + TypeScript + Naive UI** 的轻量级前端脚手架，专注于提供开箱即用的开发体验。核心特性是自动导入和全局 API 挂载。

## 架构关键点

### 1. 自动导入系统（关键）
使用 `unplugin-auto-import` 和 `unplugin-vue-components`，**无需手动 import**：
- Vue API（`ref`, `computed`, `watch` 等）自动导入
- Vue Router API（`useRouter`, `useRoute`）自动导入
- Pinia API（`defineStore`, `storeToRefs`）自动导入
- Naive UI 组件（`n-button`, `n-input` 等）自动按需引入

⚠️ **不要**在代码中添加这些 import：
```typescript
// ❌ 错误：不需要手动导入
import { ref, computed } from 'vue'
import { NButton } from 'naive-ui'

// ✅ 正确：直接使用
const count = ref(0)
<n-button>按钮</n-button>
```

### 2. 全局 Naive UI API（通过 window 对象）
在 [AppProvider.vue](../src/components/application/AppProvider.vue) 中，所有 Naive UI 的全局 API 挂载到 `window`：
- `window.$message` - 消息提示
- `window.$dialog` - 对话框
- `window.$notification` - 通知
- `window.$loadingBar` - 加载条

使用方式：
```typescript
// 任何组件中直接使用
window.$message?.success('操作成功')
window.$dialog?.warning({ title: '警告', content: '确定删除吗？' })
```

### 3. 路由配置
路由采用懒加载模式，位于 [src/router/index.ts](../src/router/index.ts)：
- 所有路由组件使用 `() => import('@/pages/Xxx.vue')` 动态导入
- 已配置 404 通配路由 `/:pathMatch(.*)*`
- 新增路由时保持懒加载模式

### 4. 主题配置
主题覆盖在 [src/App.vue](../src/App.vue) 中通过 `NConfigProvider` 的 `theme-overrides` 配置：
```vue
<n-config-provider :theme-overrides="themeOverrides">
```

## 开发约定

### 目录结构
- `src/pages/` - 页面组件（路由视图）
- `src/components/` - 可复用业务组件
- `src/stores/` - Pinia store（目前为空）
- `src/utils/` - 工具函数（目前为空）
- `src/assets/` - 静态资源（图片、样式）

### 路径别名
使用 `@/` 作为 `src/` 的别名：
```typescript
import AppProvider from '@/components/application/AppProvider.vue'
```

### 类型声明
- `auto-imports.d.ts` - 自动导入的 Vue/Router/Pinia API 类型（自动生成）
- `components.d.ts` - 自动注册的组件类型（自动生成）
- `src/types/global.d.ts` - 全局类型扩展（window 对象上的 Naive UI API）

## 常用命令
```bash
pnpm dev      # 开发服务器
pnpm build    # 类型检查 + 构建
pnpm preview  # 预览构建产物
```

## 新增功能指南

### 添加新页面
1. 在 `src/pages/` 创建 `.vue` 文件
2. 在 [src/router/index.ts](../src/router/index.ts) 添加路由（使用懒加载）
3. 组件内直接使用 Vue API 和 Naive UI 组件（无需 import）

### 添加 Pinia Store
1. 在 `src/stores/` 创建 store 文件
2. 直接使用 `defineStore`（已自动导入）
3. 在组件中直接调用（无需 import store）

### 使用 Naive UI 组件
- 直接在模板中使用 `n-xxx` 组件（无需注册）
- 使用全局 API 时通过 `window.$message` 等调用
- 参考 [Naive UI 官方文档](https://www.naiveui.com/)
