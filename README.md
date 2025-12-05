# EU-Admin-Pro

<div align="center">
  <img alt="EU-Admin Logo" width="120" height="120" src="./public/logo.png">
  <h1>EU-Admin-Pro</h1>
  <span>中文 | <a href="./README.en.md">English</a></span>
</div>

## 介绍 📖

EU-Admin-Pro 是一款基于 **React 19**、**React-Router V7**、**React-Hooks**、**Redux-Toolkit**、**TypeScript**、**Vite 7**、**Ant-Design 6** 的现代化后台管理系统框架。

## ✨ 特性

- 🚀 **最新技术栈**：使用 React 19 + TypeScript 开发，整个项目使用高质量 Hooks + TypeScript 代码完成
- ⚡️ **极速开发**：基于 Vite 7 构建，支持 HMR 热更新、Gzip/Brotli 压缩、PWA 应用、包分析等
- 🔐 **权限管理**：动态路由权限控制，完全根据后端菜单数据动态生成路由表
- 🎨 **主题定制**：支持主题色切换、暗黑模式、灰色模式、色弱模式、紧凑主题、圆角大小配置
- 📐 **多种布局**：横向布局、经典布局（可开启菜单分割）、纵向布局、分栏布局，满足不同需求
- 🌐 **国际化**：内置中英文国际化支持，可扩展更多语言
- 📦 **状态管理**：使用 Redux-Toolkit 作为状��管理工具，集成 persist 持久化
- 🎯 **TypeScript**：完整的类型定义，确保代码质量和开发体验
- 📱 **响应式**：支持多种设备尺寸，移动端友好
- 🔧 **代码规范**：集成 ESLint、Prettier、Stylelint、Husky、Commitlint 等工具

## 主要功能 🔨

- 🎨 **UI 组件**：基于 Ant-Design 6，将 Design Token 注入到 CSS 变量中，方便主题配置
- 🔀 **路由系统**：基于 React-Router V7，支持多路由模式（Hash | History）、路由懒加载
- 📊 **图表组件**：内置 ECharts 组件封装，支持数据可视化、数据大屏展示
- 🏷️ **标签页**：支持多标签页、标签拖拽排序、详情页标签、标签缓存等功能
- 🗂️ **菜单系统**：支持手风琴模式、无限级菜单、面包屑导航
- 🔍 **菜单搜索**：快速搜索菜单功能
- 🖼️ **SVG 图标**：集成 SVG 图标组件，支持自定义图标
- 💧 **页面水印**：支持页面水印配置
- 🎯 **Pro 组件**：集成 @ant-design/pro-components，快速构建中后台页面

## 安装使用 🚀

### 环境要求

- **Node.js**: >= 16.0.0
- **pnpm/npm/yarn**: 推荐使用 pnpm

### 克隆项目

```bash
git clone https://github.com/xiaochanghai/EU-Admin-Pro.git
cd EU-Admin-Pro
```

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
# 启动开发服务器（默认端口：9528）
npm run dev

# 或
npm run serve
```

### 构建生产版本

```bash
# 构建开发环境
npm run build:dev

# 构建测试环境
npm run build:test

# 构建生产环境
npm run build
```

### 其他命令

```bash
# 预览构建产物
npm run preview

# 类型检查
npm run type:check

# ESLint 检查并修复
npm run lint:eslint

# Prettier 格式化
npm run lint:prettier

# StyleLint 检查并修复
npm run lint:stylelint

# 提交代码（使用 commitizen）
npm run commit
```

## 项目结构 📁

```
EU-Admin-Pro
├── .husky/                 # Git hooks 配置
├── .vscode/                # VSCode 配置
├── build/                  # Vite 构建配置
│   ├── getEnv.ts          # 环境变量处理
│   ├── plugins.ts         # Vite 插件配置
│   └── proxy.ts           # 代理配置
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口
│   ├── assets/            # 静态资源（图片、字体等）
│   ├── components/        # 公共组件
│   │   ├── AuthButton/   # 权限按钮
│   │   ├── Echarts/      # 图表组件
│   │   ├── Error/        # 错误页面
│   │   ├── Icon/         # 图标组件
│   │   ├── Lazy/         # 懒加载组件
│   │   ├── Loading/      # 加载组件
│   │   └── SvgIcon/      # SVG 图标
│   ├── config/            # 项目配置
│   ├── context/           # React Context
│   ├── enums/             # 枚举定义
│   ├── hooks/             # 自定义 Hooks
│   ├── languages/         # 国际化语言包
│   ├── layouts/           # 布局组件
│   │   ├── LayoutClassic/    # 经典布局
│   │   ├── LayoutColumns/    # 分栏布局
│   │   ├── LayoutTransverse/ # 横向布局
│   │   ├── LayoutVertical/   # 纵向布局
│   │   └── components/       # 布局子组件
│   ├── plugins/           # 插件
│   ├── redux/             # Redux 状态管理
│   ├── routers/           # 路由配置
│   ├── styles/            # 全局样式
│   ├── typings/           # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   ├── views/             # 页面视图
│   ├── App.tsx            # 应用入口组件
│   └── main.tsx           # 应用入口
├── .editorconfig          # 编辑器配置
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── .env.test              # 测试环境变量
├── .eslintrc.js           # ESLint 配置
├── .gitignore             # Git 忽略配置
├── .prettierrc.cjs        # Prettier 配置
├── .stylelintrc.cjs       # StyleLint 配置
├── commitlint.config.cjs  # Commitlint 配置
├── index.html             # HTML 入口
├── package.json           # 项目依赖
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
└── README.md              # 项目说明
```

## 环境变量 🔧

项目使用三个环境配置文件：

- `.env.development` - 开发环境
- `.env.test` - 测试环境
- `.env.production` - 生产环境

主要配置项：

```bash
# 环境
VITE_USER_NODE_ENV = development

# 公共路���
VITE_PUBLIC_PATH = /

# 路由模式（hash | history）
VITE_ROUTER_MODE = hash

# 是否在打包时删除 console
VITE_DROP_CONSOLE = true

# 是否启用 PWA
VITE_PWA = false

# API 地址
VITE_API_URL = /api

# 开发环境代理
VITE_PROXY = [["/api","https://mock.apifox.cn/m1/3037186-0-default"]]
```

## 浏览器支持 🌐

推荐使用最新版本的 Chrome、Firefox、Safari、Edge 浏览器。

支持现代浏览器：

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## Git 提交规范 📝

项目集成了代码提交规范，使用 `commitlint` 和 `cz-git` 工具。

### 提交类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- `perf`: 性能优化
- `test`: 增加测试
- `build`: 构建过程或辅助工具的变动
- `ci`: CI 配置文件和脚本的变动
- `chore`: 其他改动
- `revert`: 回滚

### 提交方式

```bash
# 方式一：使用 commitizen
npm run commit

# 方式二：使用 git commit（会触发 commitlint 校验）
git commit -m "feat: 添加新功能"
```

## 开发规范 📋

### 代码风格

- 使用 **ESLint** 进行代码质量检查
- 使用 **Prettier** 进行代码格式化
- 使用 **StyleLint** 进行样式代码检查
- 使用 **husky** + **lint-staged** 在提交前自动检查和格式化代码

### 命名规范

- 组件名：大驼峰（PascalCase）
- 文件名：大驼峰（PascalCase）
- 变量名：小驼峰（camelCase）
- 常量名：全大写下划线（CONSTANT_CASE）
- 类型名：大驼峰（PascalCase）

## 贡献指南 🤝

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建新的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证 📄

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2024-present xiaochanghai

## 联系方式 📧

- **作者**：xiaochanghai
- **邮箱**：xiaochanghai@foxmail.com
- **GitHub**：https://github.com/xiaochanghai
- **仓库地址**：https://github.com/xiaochanghai/EU-Admin-Pro

## Star History ⭐

如果这个项目对你有帮助，请给一个 ⭐️ Star 支持一下！

[![Star History Chart](https://api.star-history.com/svg?repos=xiaochanghai/EU-Admin-Pro&type=Date)](https://star-history.com/#xiaochanghai/EU-Admin-Pro&Date)
