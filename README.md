# 阿猛的日常

基于 [Rspress](https://rspress.rs/) 默认主题的个人技术博客。

## 快速开始

```bash
pnpm install
pnpm dev
```

访问 http://localhost:5173

## 常用命令

```bash
pnpm dev              # 开发
pnpm build            # 构建
pnpm preview          # 预览构建结果
pnpm new-post -- 标题  # 创建新文章
```

## 项目结构

```
docs/
├── posts/          # 文章（javascript / css / network）
├── public/         # 静态资源
├── index.md        # 首页
├── about.md        # 关于
└── archive.md      # 归档
```

## 文章格式

```yaml
---
title: 文章标题
description: 文章描述
published: 2026-07-10
tags: [标签1, 标签2]
category: 分类名称
draft: false
---
```

## 部署

推送到 `master` 分支后，GitHub Actions 会自动构建并部署到阿里云 OSS / 腾讯云 COS。

## 许可证

[MIT](LICENSE)
