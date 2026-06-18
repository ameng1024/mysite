---
title: CSS Grid 布局完全指南
description: 深入解析 CSS Grid 布局系统，从基础概念到高级技巧，涵盖网格容器、网格项、轨道大小、对齐方式等核心内容
published: 2022-01-15
updated: 2022-01-15
tags: [CSS, Grid, 布局, 响应式设计, 前端开发]
category: CSS
draft: false
---


## 概述
CSS Grid 布局是 CSS 中最强大的布局系统，它是一个二维网格系统，可以同时处理行和列，为复杂布局提供了完美的解决方案。

## 基础概念

### 1. 网格容器与网格项
```css
/* 定义网格容器 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 200px;
  gap: 20px;
}

/* 网格项自动放置 */
.grid-item {
  background-color: #f0f0f0;
  padding: 20px;
}
```
### 2. 显式网格与隐式网格
```css
.container {
  display: grid;
  /* 显式网格：明确定义的行和列 */
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
  
  /* 隐式网格：自动创建的行和列 */
  grid-auto-columns: 100px;
  grid-auto-rows: 150px;
  grid-auto-flow: row; /* 或 column, dense */
}
```
## 核心属性详解

### 1. 轨道定义
```css
.container {
  /* 固定大小 */
  grid-template-columns: 100px 200px 300px;
  
  /* 百分比 */
  grid-template-columns: 25% 50% 25%;
  
  /* fr 单位（分数单位） */
  grid-template-columns: 1fr 2fr 1fr;
  
  /* repeat() 函数 */
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  
  /* minmax() 函数 */
  grid-template-columns: minmax(100px, 1fr) minmax(200px, 2fr);
  
  /* auto 关键字 */
  grid-template-columns: auto 1fr auto;
}
```
### 2. 网格线命名
```css
.container {
  display: grid;
  grid-template-columns: 
    [sidebar-start] 200px 
    [sidebar-end content-start] 1fr 
    [content-end];
  grid-template-rows: 
    [header-start] 80px 
    [header-end main-start] auto 
    [main-end footer-start] 60px 
    [footer-end];
}

.header {
  grid-column: sidebar-start / content-end;
  grid-row: header-start / header-end;
}

.sidebar {
  grid-column: sidebar-start / sidebar-end;
  grid-row: main-start / main-end;
}

.content {
  grid-column: content-start / content-end;
  grid-row: main-start / main-end;
}

.footer {
  grid-column: sidebar-start / content-end;
  grid-row: footer-start / footer-end;
}
```
### 3. 网格项放置
```css
.item {
  /* 使用网格线编号 */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
  
  /* 简写形式 */
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  
  /* span 关键字 */
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
  
  /* 使用命名的网格线 */
  grid-column: sidebar-start / content-end;
  
  /* grid-area 简写 */
  grid-area: 1 / 1 / 3 / 3; /* row-start / column-start / row-end / column-end */
}
```
### 4. 对齐方式
```css
.container {
  /* 容器内对齐 */
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
  place-items: <align-items> <justify-items>;
  
  /* 内容对齐 */
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
  place-content: <align-content> <justify-content>;
}

.item {
  /* 单个项目对齐 */
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
  place-self: <align-self> <justify-self>;
}
```
## 实战案例

### 1. 圣杯布局
```css
.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* 响应式调整 */
@media (max-width: 768px) {
  .holy-grail {
    grid-template-areas:
      "header"
      "nav"
      "main"
      "aside"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto auto;
  }
}
```
### 2. 瀑布流布局
```css
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px; /* 控制行高基数 */
  gap: 15px;
}

.masonry-item {
  /* 根据内容高度跨越不同行数 */
  grid-row-end: span var(--span, 10);
}

/* 通过 JavaScript 或 CSS 自定义属性设置不同的跨度 */
.masonry-item:nth-child(3n) { --span: 15; }
.masonry-item:nth-child(3n+1) { --span: 20; }
.masonry-item:nth-child(3n+2) { --span: 25; }
```
### 3. 卡片网格
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-body {
  padding: 20px;
}

.card-footer {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
}
```
### 4. 仪表盘布局
```css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  min-height: 100vh;
}

.dashboard-header {
  grid-area: header;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 0 30px;
}

.dashboard-sidebar {
  grid-area: sidebar;
  background: #1a202c;
  color: white;
  padding: 20px;
}

.dashboard-main {
  grid-area: main;
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  align-content: start;
}

.widget {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.widget-large {
  grid-column: span 2;
}

@media (max-width: 1024px) {
  .dashboard {
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto 1fr;
    grid-template-areas:
      "header"
      "sidebar"
      "main";
  }
  
  .widget-large {
    grid-column: 1;
  }
}
```
## 高级技巧

### 1. 子网格（Subgrid）
```css
/* 注意：子网格支持仍在完善中 */
.parent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.child-grid {
  display: grid;
  grid-template-columns: subgrid; /* 继承父网格的列轨道 */
  grid-template-rows: subgrid;    /* 继承父网格的行轨道 */
  grid-column: span 2;           /* 跨越两列 */
}
```
### 2. 网格与 Flexbox 结合
```css
.combined-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
}

.grid-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.flex-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.flex-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
}
```
### 3. 动画与过渡
```css
.animated-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  transition: grid-template-columns 0.3s ease;
}

.animated-grid:hover {
  grid-template-columns: repeat(4, 1fr);
}

.grid-item {
  transition: all 0.3s ease;
}

.grid-item:hover {
  transform: scale(1.05);
  z-index: 1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
```
### 4. 动态网格
```css
.dynamic-grid {
  display: grid;
  /* 使用 CSS 自定义属性 */
  --columns: 3;
  --gap: 20px;
  
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gap);
}

/* 通过媒体查询或 JavaScript 动态调整 */
@media (max-width: 768px) {
  .dynamic-grid {
    --columns: 2;
    --gap: 15px;
  }
}

@media (max-width: 480px) {
  .dynamic-grid {
    --columns: 1;
    --gap: 10px;
  }
}
```
## 性能优化

### 1. 减少重排
```css
/* 避免频繁改变网格结构 */
.stable-grid {
  display: grid;
  /* 一次性定义好网格结构 */
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
}

/* 使用 grid-area 而不是频繁改变 grid-column/grid-row */
.grid-item {
  grid-area: var(--area);
}

/* 通过改变自定义属性来移动项目 */
.grid-item.active {
  --area: 1 / 1 / 3 / 4;
}
```
### 2. 合理使用 auto-fit 和 auto-fill
```css
/* auto-fit：尽可能填充可用空间 */
.auto-fit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* 当项目数量不足时，会拉伸项目填充空间 */
}

/* auto-fill：创建尽可能多的轨道 */
.auto-fill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  /* 即使项目数量不足，也会创建空轨道 */
}

/* 根据需求选择 */
/* 需要填充空间时用 auto-fit */
/* 需要固定网格结构时用 auto-fill */
```
### 3. 避免过度嵌套
```css
/* 不好的做法：过度嵌套网格 */
.over-nested {
  display: grid;
}

.over-nested > div {
  display: grid;
}

.over-nested > div > div {
  display: grid;
}

/* 好的做法：使用单个网格 */
.flat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
}

/* 使用命名网格区域组织内容 */
.flat-grid {
  grid-template-areas:
    "header header header header"
    "sidebar main main aside"
    "footer footer footer footer";
}
```
## 浏览器支持与回退方案

### 1. 特性检测
```css
/* 使用 @supports 进行特性检测 */
@supports (display: grid) {
  .modern-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
  }
}

@supports not (display: grid) {
  .fallback-layout {
    display: flex;
    flex-wrap: wrap;
  }
  
  .fallback-layout > * {
    flex: 1 1 300px;
    margin: 10px;
  }
}
```
### 2. 渐进增强
```css
/* 基础布局（所有浏览器支持） */
.basic-layout {
  display: block;
}

.basic-layout > * {
  margin-bottom: 20px;
}

/* 增强布局（支持 Grid 的浏览器） */
@supports (display: grid) {
  .basic-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .basic-layout > * {
    margin-bottom: 0;
  }
}
```
## 工具与资源

### 1. 开发工具
- **Chrome DevTools**：网格检查器
- **Firefox DevTools**：网格调试工具
- **CSS Grid Generator**：在线网格生成器

### 2. 学习资源
- **MDN Web Docs**：完整的 Grid 文档
- **CSS-Tricks**：Grid 完全指南
- **Wes Bos**：CSS Grid 免费课程

### 3. 实用代码片段
```css
/* 常用网格模式 */
.grid-patterns {
  /* 等宽网格 */
  &.equal-width {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  /* 不对称网格 */
  &.asymmetric {
    grid-template-columns: 2fr 1fr 1fr;
  }
  
  /* 流式网格 */
  &.fluid {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  }
}
```
## 最佳实践

### 1. 命名约定
```css
/* 使用有意义的网格线名称 */
.grid-container {
  grid-template-columns: 
    [full-start] minmax(20px, 1fr) 
    [main-start] minmax(0, 1200px) 
    [main-end] minmax(20px, 1fr) 
    [full-end];
}

/* 使用一致的间距单位 */
:root {
  --grid-gap: 20px;
  --grid-gap-small: 10px;
  --grid-gap-large: 30px;
}

.grid {
  gap: var(--grid-gap);
}
```
### 2. 响应式策略
```css
.responsive-grid {
  /* 移动端优先 */
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  
  /* 平板 */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  /* 桌面 */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }
  
  /* 大桌面 */
  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }
}
```
### 3. 可维护性
```css
/* 使用 CSS 自定义属性提高可维护性 */
:root {
  --grid-columns: 12;
  --grid-gutter: 20px;
  --container-width: 1200px;
}

.grid-system {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gutter);
  max-width: var(--container-width);
  margin: 0 auto;
}

/* 通过工具类快速应用网格 */
.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
/* ... 直到 col-12 */

.row-1 { grid-row: span 1; }
.row-2 { grid-row: span 2; }
/* ... */
```
## 总结

CSS Grid 布局是现代 Web 开发的革命性技术，它提供了前所未有的布局控制能力。通过掌握 Grid 布局，你可以：

1. **创建复杂布局**：轻松实现传统布局方法难以完成的复杂设计
2. **提高开发效率**：减少布局相关的 CSS 代码量
3. **增强响应式能力**：更灵活地适应不同屏幕尺寸
4. **改善代码维护**：更清晰、更语义化的布局代码

随着浏览器支持的不断完善，CSS Grid 已经成为现代 Web 布局的首选方案。建议在实际项目中积极采用 Grid 布局，逐步替换传统的布局方法。

---
*创建时间：2022-01-15*
*最后更新：2022-01-15*
*作者：前端开发团队*
*标签：CSS, Grid, 布局, 响应式设计, 前端开发*
