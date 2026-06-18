# Ameng's Blog - 个人技术博客

![GitHub last commit](https://img.shields.io/github/last-commit/ameng404/mysite)
![GitHub stars](https://img.shields.io/github/stars/ameng404/mysite?style=social)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Rspress](https://img.shields.io/badge/Rspress-2.x-000000?logo=rspack&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)

一个基于 Rspress 构建的现代化静态博客系统，专注于技术分享和知识沉淀。

## ✨ 特性

### 🚀 现代技术栈
- **Rspress 2.x** - 基于 Rspack 的静态站点生成器
- **TypeScript** - 类型安全的开发体验
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Svelte 5** - 交互式组件支持
- **Biome** - 快速的前端工具链

### 📝 内容管理
- **Markdown 优先** - 专注于内容创作
- **内容集合** - 类型安全的文章管理
- **中文内容** - 专注中文技术博客展示
- **标签分类** - 灵活的内容组织
- **搜索功能** - 基于 Rspress 内置全文搜索

### 🎨 用户体验
- **暗色/亮色模式** - 自动跟随系统偏好
- **响应式设计** - 完美适配各种设备
- **快速加载** - 优化的性能表现
- **平滑过渡** - 页面切换动画
- **可访问性** - 符合 WCAG 标准

### 🔧 开发工具
- **自动部署** - GitHub Actions CI/CD
- **代码检查** - Biome 代码格式化
- **类型检查** - TypeScript 严格模式
- **构建优化** - 图片压缩、代码分割
- **SEO 优化** - 自动生成 sitemap 和 RSS

## 📁 项目结构

```
mysite/
├── docs/               # 博客内容
│   ├── posts/          # 文章目录
│   └── public/         # 静态资源
├── theme/              # 自定义主题（React 组件）
├── shared/             # 共享配置、样式、工具
├── plugins/            # Rspress 插件
└── rspress.config.ts   # 构建配置
```

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- pnpm 8+ (推荐) 或 npm 9+ / yarn 1.22+

### 安装依赖
```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 开发模式
```bash
# 启动开发服务器
pnpm run dev

# 访问 http://localhost:5173
```

### 构建项目
```bash
# 构建生产版本
pnpm run build

# 预览构建结果
pnpm run preview
```

### 创建新文章
```bash
# 使用脚本创建新文章
pnpm run new-post

# 或手动在 docs/posts/ 目录创建
```

## 📚 内容管理

### 文章格式
每篇文章使用 Markdown 格式，包含必要的 frontmatter：

```yaml
---
title: 文章标题
description: 文章描述
published: 2026-03-13  # 发布日期
updated: 2026-03-13   # 更新日期
tags: [标签1, 标签2]   # 文章标签
category: 分类名称     # 文章分类
draft: false          # 是否为草稿
lang: zh-CN           # 文章语言
---
```

### 内容分类
- **JavaScript** - ECMAScript 新特性、语言技巧
- **网络技术** - HTTP/HTTPS、WebSocket、API 设计、性能优化、网络安全
- **指南教程** - 使用指南、开发教程
- **其他** - 杂项、思考、生活

## 🛠️ 开发指南

### 添加新组件
1. 在 `src/components/` 下创建组件文件
2. 使用 Astro、Svelte 或纯 HTML/CSS/JS
3. 在需要的地方导入使用

### 修改样式
- 全局样式：`src/styles/main.css`
- 组件样式：使用 Tailwind CSS 类名
- 自定义样式：`src/styles/variables.styl`

### 配置修改
- 博客配置：`shared/config.ts`
- 构建配置：`rspress.config.ts`
- 主题配置：`shared/styles/variables.styl`

## 📦 部署

### 自动部署
项目已配置 GitHub Actions，推送到 main 分支会自动部署：

1. **Vercel** - 自动部署到 Vercel
2. **GitHub Pages** - 可配置为 GitHub Pages
3. **自定义服务器** - 构建后上传到任何静态主机

### 手动部署
```bash
# 构建项目
pnpm run build

# dist/ 目录包含所有静态文件
# 上传到你的静态主机
```

## 🔧 技术栈详情

### 核心框架
- **[Rspress](https://rspress.rs/)** - 静态站点生成器
- **[TypeScript](https://www.typescriptlang.org/)** - 类型系统
- **[Tailwind CSS](https://tailwindcss.com/)** - 样式框架

### 内容系统
- **[Rspress Search](https://rspress.rs/)** - 内置全文搜索
- **[Remark](https://remark.js.org/)** - Markdown 处理
- **[Rehype](https://github.com/rehypejs/rehype)** - HTML 处理

### 交互组件
- **[React](https://react.dev/)** - 主题组件
- **[PhotoSwipe](https://photoswipe.com/)** - 图片查看器

### 开发工具
- **[Biome](https://biomejs.dev/)** - 代码格式化
- **[PostCSS](https://postcss.org/)** - CSS 处理
- **[Sharp](https://sharp.pixelplumbing.com/)** - 图片优化

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📞 联系

- **GitHub**: [@ameng404](https://github.com/ameng404)
- **博客**: [访问博客](https://ameng404.github.io/mysite/)

## 🙏 致谢

感谢以下开源项目的贡献：

- [Rspress](https://rspress.rs/) - 优秀的静态站点框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用的 CSS 框架
- [所有依赖库的维护者](package.json)

---

**⭐ 如果这个项目对你有帮助，请给个 Star！**