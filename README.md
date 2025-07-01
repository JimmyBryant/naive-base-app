# naive-base-app

一个基于 **Vite + Vue 3 + TypeScript + Naive UI** 的轻量级前端脚手架，内置了自动导入、页面路由、状态管理、代码规范配置，适合中小型管理后台或组件库项目快速启动。

## ✨ 特性

- ⚡ 基于 [Vite](https://vitejs.dev/) 构建，极速冷启动和热更新
- 🧩 使用 [Naive UI](https://www.naiveui.com/) 作为 UI 框架，自动按需引入
- 🔧 支持路径别名 `@/`，简化模块引用
- 📦 集成 [Pinia](https://pinia.vuejs.org/) 状态管理
- 🔁 集成 [Vue Router](https://router.vuejs.org/) 页面路由
- 🧠 自动导入常用函数和组件
- 🧹 支持 ESLint + Prettier 代码规范
- 🌐 全局 message / notification 支持：`window.$message.success('ok')`

## 📁 项目结构

```bash
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 图片和静态资源
│   ├── components/        # 可复用组件
│   ├── composables/       # 组合式函数
│   ├── pages/             # 页面视图（已包含 Home 和 404）
│   ├── router/            # vue-router 配置
│   ├── stores/            # pinia 状态管理
│   ├── utils/             # 工具函数
│   ├── App.vue            # 根组件，已配置 naive-ui 全局 provider
│   └── main.ts            # 应用入口，挂载路由、pinia、naive-ui
├── auto-imports.d.ts      # 自动导入类型声明
├── components.d.ts        # 自动注册组件类型声明
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置，含路径别名和自动导入
```

## 🚀 快速开始

```bash
pnpm install
pnpm dev
```

## 🧩 推荐插件

- VS Code 插件推荐：
  - Volar
  - ESLint
  - Prettier

## 📦 构建

```bash
pnpm build
```

## 📄 License

MIT
