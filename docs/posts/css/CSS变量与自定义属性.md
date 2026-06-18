---
title: CSS 变量与自定义属性完全指南
description: 深入解析 CSS 自定义属性（CSS Variables）的使用方法、优势、实际应用场景及最佳实践
published: 2022-05-20
updated: 2022-05-20
tags: [CSS, CSS变量, 自定义属性, 主题切换, 前端开发]
category: CSS
draft: false
---


## 概述
CSS 自定义属性（CSS Variables）是 CSS3 的重要特性，允许开发者定义可重用的值并在整个文档中使用。

## 基础用法

### 1. 定义与使用
```css
/* 定义变量 */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size-base: 16px;
  --spacing-unit: 8px;
}

/* 使用变量 */
.element {
  color: var(--primary-color);
  font-size: var(--font-size-base);
  margin: calc(var(--spacing-unit) * 2);
}

/* 变量回退值 */
.element {
  color: var(--custom-color, #333); /* 如果 --custom-color 未定义，使用 #333 */
}
```
### 2. 作用域
```css
/* 全局变量 */
:root {
  --global-color: #333;
}

/* 局部变量 */
.container {
  --local-color: #666;
}

/* 组件级变量 */
.button {
  --button-bg: #007bff;
  background-color: var(--button-bg);
}

.button.primary {
  --button-bg: #0056b3; /* 覆盖父级变量 */
}
```
## 实战应用

### 1. 主题切换
```css
/* 定义主题变量 */
:root {
  /* 亮色主题 */
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #007bff;
  --border-color: #dee2e6;
}

[data-theme="dark"] {
  /* 暗色主题 */
  --bg-color: #1a1a1a;
  --text-color: #f8f9fa;
  --primary-color: #4dabf7;
  --border-color: #495057;
}

/* 应用主题 */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button {
  background-color: var(--primary-color);
  border: 1px solid var(--border-color);
}

/* JavaScript 切换主题 */
document.documentElement.setAttribute('data-theme', 'dark');
```
### 2. 响应式设计
```css
/* 定义响应式变量 */
:root {
  --font-size: 16px;
  --spacing: 20px;
  --columns: 1;
}

/* 移动端调整 */
@media (max-width: 768px) {
  :root {
    --font-size: 14px;
    --spacing: 15px;
  }
}

/* 平板端调整 */
@media (min-width: 769px) and (max-width: 1024px) {
  :root {
    --columns: 2;
    --spacing: 25px;
  }
}

/* 桌面端调整 */
@media (min-width: 1025px) {
  :root {
    --columns: 3;
    --spacing: 30px;
    --font-size: 18px;
  }
}

/* 应用变量 */
.grid {
  font-size: var(--font-size);
  gap: var(--spacing);
  grid-template-columns: repeat(var(--columns), 1fr);
}
```
### 3. 设计系统
```css
/* 设计系统变量 */
:root {
  /* 颜色系统 */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;
  
  /* 字体系统 */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-base: 16px;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
  
  /* 间距系统 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* 边框系统 */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-width: 1px;
  
  /* 阴影系统 */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}

/* 应用设计系统 */
.button {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: var(--border-width) solid transparent;
  box-shadow: var(--shadow-sm);
}

.card {
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  background: white;
}
```
### 4. 动画与过渡
```css
/* 动画变量 */
:root {
  --transition-duration: 0.3s;
  --transition-timing: ease;
  --animation-duration: 1s;
}

.element {
  transition: all var(--transition-duration) var(--transition-timing);
}

@keyframes slideIn {
  from {
    transform: translateX(var(--slide-distance, -100%));
  }
  to {
    transform: translateX(0);
  }
}

.slide-animation {
  animation: slideIn var(--animation-duration) ease;
}

/* 动态控制动画 */
.slide-animation.fast {
  --animation-duration: 0.5s;
}

.slide-animation.slow {
  --animation-duration: 2s;
}
```
### 5. 动态样式
```css
/* 通过 JavaScript 动态更新变量 */
const root = document.documentElement;

// 更新颜色
root.style.setProperty('--primary-color', '#ff6b6b');

// 更新尺寸
root.style.setProperty('--font-size', '18px');

// 更新间距
root.style.setProperty('--spacing', '30px');

// 响应鼠标位置
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  root.style.setProperty('--mouse-x', x);
  root.style.setProperty('--mouse-y', y);
});

/* CSS 中使用动态变量 */
.dynamic-element {
  transform: 
    translateX(calc(var(--mouse-x, 0.5) * 100px))
    translateY(calc(var(--mouse-y, 0.5) * 100px));
  opacity: var(--mouse-y, 0.5);
}
```
## 高级技巧

### 1. 计算与函数
```css
/* 使用 calc() 计算 */
:root {
  --base-size: 16px;
  --scale-factor: 1.2;
}

.element {
  font-size: calc(var(--base-size) * var(--scale-factor));
  padding: calc(var(--base-size) / 2);
  margin: calc(var(--base-size) * 2);
}

/* 复杂计算 */
.grid-item {
  --columns: 3;
  --gap: 20px;
  width: calc((100% - (var(--gap) * (var(--columns) - 1))) / var(--columns));
}

/* 使用 min()、max()、clamp() */
.responsive-text {
  font-size: clamp(
    var(--min-font-size, 12px),
    var(--preferred-font-size, 4vw),
    var(--max-font-size, 24px)
  );
}
```
### 2. 继承与覆盖
```css
/* 变量继承链 */
:root {
  --color-base: #333;
  --color-primary: var(--color-base);
}

.container {
  --color-primary: #007bff; /* 覆盖根变量 */
}

.button {
  color: var(--color-primary); /* 使用容器变量 */
}

/* 使用 inherit 关键字 */
.parent {
  --custom-color: #ff6b6b;
}

.child {
  --custom-color: inherit; /* 继承父级变量 */
  color: var(--custom-color);
}
```
### 3. 媒体查询与变量
```css
/* 在媒体查询中修改变量 */
:root {
  --font-size: 16px;
  --spacing: 20px;
}

@media (max-width: 768px) {
  :root {
    --font-size: 14px;
    --spacing: 15px;
  }
}

@media (min-width: 1200px) {
  :root {
    --font-size: 18px;
    --spacing: 30px;
  }
}

/* 使用变量 */
body {
  font-size: var(--font-size);
  padding: var(--spacing);
}
```
### 4. 组件变量
```css
/* 组件变量系统 */
.alert {
  --alert-padding: 1rem;
  --alert-margin: 1rem 0;
  --alert-border-radius: 0.25rem;
  --alert-border: 1px solid transparent;
  
  padding: var(--alert-padding);
  margin: var(--alert-margin);
  border-radius: var(--alert-border-radius);
  border: var(--alert-border);
}

.alert-success {
  --alert-color: #155724;
  --alert-bg: #d4edda;
  --alert-border-color: #c3e6cb;
  
  color: var(--alert-color);
  background-color: var(--alert-bg);
  border-color: var(--alert-border-color);
}

.alert-danger {
  --alert-color: #721c24;
  --alert-bg: #f8d7da;
  --alert-border-color: #f5c6cb;
  
  color: var(--alert-color);
  background-color: var(--alert-bg);
  border-color: var(--alert-border-color);
}
```
## 性能优化

### 1. 变量命名优化
```css
/* 使用有意义的命名 */
:root {
  /* 好的命名 */
  --color-primary: #007bff;
  --spacing-md: 16px;
  --font-size-base: 16px;
  
  /* 避免的命名 */
  --c1: #007bff; /* 无意义 */
  --s1: 16px;    /* 无意义 */
}
```
### 2. 减少变量数量
```css
/* 合并相关变量 */
:root {
  /* 合并前 */
  --color-primary: #007bff;
  --color-primary-hover: #0056b3;
  --color-primary-active: #004085;
  
  /* 合并后 */
  --color-primary: #007bff;
  --color-primary-hover: color-mix(in srgb, var(--color-primary) 20%, black);
  --color-primary-active: color-mix(in srgb, var(--color-primary) 40%, black);
}
```
### 3. 避免过度使用
```css
/* 只在需要时使用变量 */
.element {
  /* 适合使用变量 */
  color: var(--text-color);
  font-size: var(--font-size);
  
  /* 不适合使用变量（过于简单） */
  display: var(--display, block); /* 过度使用 */
  position: var(--position, relative); /* 过度使用 */
}
```
## 浏览器兼容性

### 1. 特性检测
```css
/* 检测 CSS 变量支持 */
@supports (--css: variables) {
  .modern-styles {
    --primary-color: #007bff;
    color: var(--primary-color);
  }
}

@supports not (--css: variables) {
  .fallback-styles {
    color: #007bff; /* 回退样式 */
  }
}
```
### 2. 渐进增强
```css
/* 基础样式（所有浏览器） */
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
}

/* 增强样式（支持变量的浏览器） */
@supports (--css: variables) {
  .button {
    background-color: var(--primary-color, #007bff);
    padding: var(--button-padding, 10px 20px);
  }
}
```
## 工具与资源

### 1. 开发工具
- **Chrome DevTools**：变量检查器
- **Firefox DevTools**：变量调试工具
- **CSS Variable Manager**：变量管理扩展

### 2. 实用代码片段
```css
/* 变量重置 */
:root {
  --reset: initial;
  --inherit: inherit;
  --unset: unset;
}

/* 调试变量 */
.debug-variables::before {
  content: '--primary-color: ' var(--primary-color, '未定义');
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: #333;
  color: white;
  padding: 5px 10px;
  font-family: monospace;
  font-size: 12px;
  z-index: 9999;
}
```
## 总结

CSS 自定义属性是现代 CSS 开发的重要工具，它提供了：

1. **更好的可维护性**：集中管理样式值
2. **动态样式能力**：通过 JavaScript 实时修改样式
3. **主题切换支持**：轻松实现多主题系统
4. **响应式设计增强**：媒体查询中的变量控制
5. **设计系统基础**：构建一致的设计语言

随着浏览器支持的完善，CSS 变量已经成为现代 Web 开发的标配技术。建议在实际项目中积极采用，提升代码质量和开发效率。

---
*创建时间：2022-05-20*
*最后更新：2022-05-20*
*作者：前端开发团队*
*标签：CSS, CSS变量, 自定义属性, 主题切换, 前端开发*
