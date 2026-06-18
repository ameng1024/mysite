---
title: CSS 设计系统构建指南
description: 深入探讨如何从零开始构建企业级 CSS 设计系统，涵盖设计令牌、组件库、主题系统、文档及团队协作
published: 2022-10-18
updated: 2022-10-18
tags: [CSS, 设计系统, 设计令牌, 组件库, 前端架构, 团队协作]
category: CSS
draft: false
---


## 概述
设计系统是现代前端开发的核心基础设施，它通过统一的设计语言和可复用的组件，确保产品的一致性和开发效率。

## 设计令牌系统

### 1. 基础令牌定义
```css
/* 设计令牌定义 */
:root {
  /* 颜色系统 */
  --color-primary-50: #e3f2fd;
  --color-primary-100: #bbdefb;
  --color-primary-200: #90caf9;
  --color-primary-300: #64b5f6;
  --color-primary-400: #42a5f5;
  --color-primary-500: #2196f3;
  --color-primary-600: #1e88e5;
  --color-primary-700: #1976d2;
  --color-primary-800: #1565c0;
  --color-primary-900: #0d47a1;
  
  /* 中性色 */
  --color-gray-50: #fafafa;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #eeeeee;
  --color-gray-300: #e0e0e0;
  --color-gray-400: #bdbdbd;
  --color-gray-500: #9e9e9e;
  --color-gray1-600: #757575;
  --color-gray-700: #616161;
  --color-gray-800: #424242;
  --color-gray-900: #212121;
  
  /* 功能色 */
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-error: #f44336;
  --color-info: #2196f3;
  
  /* 间距系统 */
  --spacing-xxs: 4px;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  
  /* 字体系统 */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-xxl: 24px;
  --font-size-xxxl: 32px;
  
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.2;
  --line-height-base: 1.5;
  --line-height-loose: 1.8;
  
  /* 边框系统 */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-full: 9999px;
  
  --border-width-thin: 1px;
  --border-width-thick: 2px;
  --border-width-heavy: 4px;
  
  /* 阴影系统 */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
  
  /* 动效系统 */
  --transition-fast: 150ms;
  --transition-base: 300ms;
  --transition-slow: 500ms;
  
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  /* 层级系统 */
  --z-index-dropdown: 1000;
  --z-index-sticky: 1020;
  --z-index-fixed: 1030;
  --z-index-modal-backdrop: 1040;
  --z-index-modal: 1050;
  --z-index-popover: 1060;
  --z-index-tooltip: 1070;
  --z-index-toast: 1080;
}
```
### 2. 语义化令牌
```css
/* 语义化设计令牌 */
:root {
  /* 颜色语义 */
  --color-background-primary: var(--color-gray-50);
  --color-background-secondary: var(--color-gray-100);
  --color-background-tertiary: var(--color-gray-200);
  
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-700);
  --color-text-tertiary: var(--color-gray-500);
  --color-text-disabled: var(--color-gray-400);
  --color-text-inverse: white;
  
  --color-border-primary: var(--color-gray-300);
  --color-border-secondary: var(--color-gray-200);
  --color-border-tertiary: var(--color-gray-100);
  
  --color-focus-ring: var(--color-primary-500);
  --color-overlay: rgba(0, 0, 0, 0.5);
  
  /* 组件语义 */
  --button-primary-bg: var(--color-primary-500);
  --button-primary-text: white;
  --button-primary-border: var(--color-primary-500);
  --button-primary-hover-bg: var(--color-primary-600);
  --button-primary-active-bg: var(--color-primary-700);
  
  --button-secondary-bg: transparent;
  --button-secondary-text: var(--color-primary-500);
  --button-secondary-border: var(--color-primary-500);
  --button-secondary-hover-bg: var(--color-primary-50);
  --button-secondary-active-bg: var(--color-primary-100);
  
  --input-bg: white;
  --input-text: var(--color-text-primary);
  --input-border: var(--color-border-primary);
  --input-placeholder: var(--color-text-tertiary);
  --input-focus-border: var(--color-focus-ring);
  --input-error-border: var(--color-error);
  --input-disabled-bg: var(--color-gray-100);
  --input-disabled-text: var(--color-text-disabled);
  
  /* 布局语义 */
  --container-padding: var(--spacing-md);
  --section-spacing: var(--spacing-xl);
  --grid-gap: var(--spacing-md);
  
  /* 排版语义 */
  --heading-1-size: var(--font-size-xxxl);
  --heading-1-weight: var(--font-weight-bold);
  --heading-1-line-height: var(--line-height-tight);
  
  --heading-2-size: var(--font-size-xxl);
  --heading-2-weight: var(--font-weight-bold);
  --heading-2-line-height: var(--line-height-tight);
  
  --body-text-size: var(--font-size-md);
  --body-text-weight: var(--font-weight-regular);
  --body-text-line-height: var(--line-height-base);
  
  --caption-text-size: var(--font-size-sm);
  --caption-text-weight: var(--font-weight-regular);
  --caption-text-line-height: var(--line-height-base);
}
```
## 组件库架构

### 1. 基础组件
```css
/* 按钮组件 */
.button {
  --button-bg: var(--button-primary-bg);
  --button-text: var(--button-primary-text);
  --button-border: var(--button-primary-border);
  --button-hover-bg: var(--button-primary-hover-bg);
  --button-active-bg: var(--button-primary-active-bg);
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border: var(--border-width-thin) solid var(--button-border);
  border-radius: var(--border-radius-md);
  background-color: var(--button-bg);
  color: var(--button-text);
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-base);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-base) var(--ease-in-out);
  user-select: none;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background-color: var(--button-hover-bg);
    border-color: var(--button-hover-bg);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  &:active:not(:disabled) {
    background-color: var(--button-active-bg);
    border-color: var(--button-active-bg);
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(var(--color-focus-ring), 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

/* 按钮变体 */
.button--primary {
  /* 使用默认变量 */
}

.button--secondary {
  --button-bg: var(--button-secondary-bg);
  --button-text: var(--button-secondary-text);
  --button-border: var(--button-secondary-border);
  --button-hover-bg: var(--button-secondary-hover-bg);
  --button-active-bg: var(--button-secondary-active-bg);
}

.button--ghost {
  --button-bg: transparent;
  --button-text: var(--color-text-primary);
  --button-border: transparent;
  --button-hover-bg: var(--color-gray-100);
  --button-active-bg: var(--color-gray-200);
}

.button--danger {
  --button-bg: var(--color-error);
  --button-text: white;
  --button-border: var(--color-error);
  --button-hover-bg: #d32f2f;
  --button-active-bg: #c62828;
}

/* 按钮尺寸 */
.button--small {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.button--medium {
  /* 默认尺寸 */
}

.button--large {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

/* 按钮状态 */
.button--loading {
  position: relative;
  color: transparent;
  
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-radius: 50%;
    border-right-color: transparent;
    animation: spin 0.6s linear infinite;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```
### 2. 表单组件
```css
/* 输入框组件 */
.input {
  --input-bg: var(--input-bg);
  --input-text: var(--input-text);
  --input-border: var(--input-border);
  --input-placeholder: var(--input-placeholder);
  --input-focus-border: var(--input-focus-border);
  --input-error-border: var(--input-error-border);
  
  display: block;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: var(--border-width-thin) solid var(--input-border);
  border-radius: var(--border-radius-md);
  background-color: var(--input-bg);
  color: var(--input-text);
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  line-height: var(--line-height-base);
  transition: all var(--transition-base) var(--ease-in-out);
  
  &::placeholder {
    color: var(--input-placeholder);
  }
  
  &:focus {
    outline: none;
    border-color: var(--input-focus-border);
    box-shadow: 0 0 0 3px rgba(var(--color-focus-ring), 0.1);
  }
  
  &:disabled {
    background-color: var(--input-disabled-bg);
    color: var(--input-disabled-text);
    cursor: not-allowed;
  }
}

.input--error {
  border-color: var(--input-error-border);
  
  &:focus {
    border-color: var(--input-error-border);
    box-shadow: 0 0 0 3px rgba(var(--color-error), 0.1);
  }
}

.input--success {
  border-color: var(--color-success);
  
  &:focus {
    border-color: var(--color-success);
    box-shadow: 0 0 0 3px rgba(var(--color-success), 0.1);
  }
}

/* 标签组件 */
.label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  line-height: var(--line-height-base);
}

.label--required::after {
  content: '*';
  margin-left: 2px;
  color: var(--color-error);
}

/* 表单组 */
.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group--inline {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.form-group--inline .label {
  margin-bottom: 0;
  min-width: 120px;
}

/* 错误消息 */
.error-message {
  display: block;
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-error);
  line-height: var(--line-height-base);
}
```
### 3. 卡片组件
```css
/* 卡片组件 */
.card {
  background-color: var(--color-background-primary);
  border: var(--border-width-thin) solid var(--color-border-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--transition-base) var(--ease-in-out);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card--interactive {
  cursor: pointer;
  
  &:hover {
    border-color: var(--color-primary-300);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.card--elevated {
  box-shadow: var(--shadow-lg);
}

.card--outlined {
  border: var(--border-width-thin) solid var(--color-border-primary);
  box-shadow: none;
}

.card--filled {
  background-color: var(--color-background-secondary);
  border: none;
}

/* 卡片部件 */
.card-header {
  padding: var(--spacing-md);
  border-bottom: var(--border-width-thin) solid var(--color-border-primary);
}

.card-body {
  padding: var(--spacing-md);
}

.card-footer {
  padding: var(--spacing-md);
  border-top: var(--border-width-thin) solid var(--color-border-primary);
  background-color: var(--color-background-secondary);
}

/* 卡片内容 */
.card-title {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.card-subtitle {
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-base);
}

.card-text {
  margin: 0;
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  line-height: var(--line-height-base);
}
```
## 主题系统

### 1. 多主题支持
```css
/* 亮色主题（默认） */
:root {
  /* 颜色语义 */
  --color-background-primary: var(--color-gray-50);
  --color-background-secondary: var(--color-gray-100);
  --color-background-tertiary: var(--color-gray-200);
  
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-700);
  --color-text-tertiary: var(--color-gray-500);
  
  --color-border-primary: var(--color-gray-300);
  --color-border-secondary: var(--color-gray-200);
  --color-border-tertiary: var(--color-gray-100);
  
  --color-overlay: rgba(0, 0, 0, 0.5);
}

/* 暗色主题 */
[data-theme="dark"] {
  --color-background-primary: var(--color-gray-900);
  --color-background-secondary: var(--color-gray-800);
  --color-background-tertiary: var(--color-gray-700);
  
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-200);
  --color-text-tertiary: var(--color-gray-400);
  
  --color-border-primary: var(--color-gray-700);
  --color-border-secondary: var(--color-gray-600);
  --color-border-tertiary: var(--color-gray-500);
  
  --color-overlay: rgba(0, 0, 0, 0.7);
}

/* 高对比度主题 */
[data-theme="high-contrast"] {
  --color-background-primary: white;
  --color-background-secondary: #f0f0f0;
  
  --color-text-primary: black;
  --color-text-secondary: #333;
  
  --color-border-primary: black;
  --color-border-secondary: #666;
  
  --color-primary-500: #0066cc;
  --color-error: #cc0000;
  --color-success: #007700;
  --color-warning: #996600;
}

/* 主题切换过渡 */
body {
  transition: 
    background-color var(--transition-base) var(--ease-in-out),
    color var(--transition-base) var(--ease-in-out);
}
```
### 2. 主题切换脚本
```javascript
// 主题管理
class ThemeManager {
  constructor() {
    this.themeKey = 'design-system-theme';
    this.themes = ['light', 'dark', 'high-contrast'];
    this.currentTheme = this.getSavedTheme() || 'light';
    this.init();
  }
  
  init() {
    this.applyTheme(this.currentTheme);
    this.setupListeners();
  }
  
  getSavedTheme() {
    return localStorage.getItem(this.themeKey);
  }
  
  saveTheme(theme) {
    localStorage.setItem(this.themeKey, theme);
  }
  
  applyTheme(theme) {
    if (!this.themes.includes(theme)) {
      theme = 'light';
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.saveTheme(theme);
    
    // 触发自定义事件
    document.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }
  
  toggleTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.applyTheme(this.themes[nextIndex]);
  }
  
  setupListeners() {
    // 系统主题变化监听
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
      if (!this.getSavedTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
    
    // 主题切换按钮
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.addEventListener('click', () => this.toggleTheme());
    });
  }
}

// 初始化
const themeManager = new ThemeManager();
```
## 工具类系统

### 1. 实用工具类
```css
/* 间距工具 */
.m-0 { margin: 0; }
.m-1 { margin: var(--spacing-xxs); }
.m-2 { margin: var(--spacing-xs); }
.m-3 { margin: var(--spacing-sm); }
.m-4 { margin: var(--spacing-md); }
.m-5 { margin: var(--spacing-lg); }
.m-6 { margin: var(--spacing-xl); }

.mt-0 { margin-top: 0; }
.mt-1 { margin-top: var(--spacing-xxs); }
.mt-2 { margin-top: var(--spacing-xs); }
/* ... 其他方向类似 */

.p-0 { padding: 0; }
.p-1 { padding: var(--spacing-xxs); }
.p-2 { padding: var(--spacing-xs); }
.p-3 { padding: var(--spacing-sm); }
.p-4 { padding: var(--spacing-md); }
.p-5 { padding: var(--spacing-lg); }
.p-6 { padding: var(--spacing-xl); }

/* 排版工具 */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-md { font-size: var(--font-size-md); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-xxl { font-size: var(--font-size-xxl); }

.font-light { font-weight: var(--font-weight-light); }
.font-regular { font-weight: var(--font-weight-regular); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-bold { font-weight: var(--font-weight-bold); }

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

.leading-tight { line-height: var(--line-height-tight); }
.leading-base { line-height: var(--line-height-base); }
.leading-loose { line-height: var(--line-height-loose); }

/* 颜色工具 */
.text-primary { color: var(--color-text-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-tertiary { color: var(--color-text-tertiary); }
.text-inverse { color: var(--color-text-inverse); }

.bg-primary { background-color: var(--color-background-primary); }
.bg-secondary { background-color: var(--color-background-secondary); }
.bg-tertiary { background-color: var(--color-background-tertiary); }

/* 布局工具 */
.d-block { display: block; }
.d-inline { display: inline; }
.d-inline-block { display: inline-block; }
.d-flex { display: flex; }
.d-grid { display: grid; }
.d-none { display: none; }

.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }

.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-stretch { align-items: stretch; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }

.gap-1 { gap: var(--spacing-xxs); }
.gap-2 { gap: var(--spacing-xs); }
.gap-3 { gap: var(--spacing-sm); }
.gap-4 { gap: var(--spacing-md); }
.gap-5 { gap: var(--spacing-lg); }

/* 边框工具 */
.rounded-sm { border-radius: var(--border-radius-sm); }
.rounded-md { border-radius: var(--border-radius-md); }
.rounded-lg { border-radius: var(--border-radius-lg); }
.rounded-full { border-radius: var(--border-radius-full); }

.border { border: var(--border-width-thin) solid var(--color-border-primary); }
.border-0 { border: 0; }
.border-top { border-top: var(--border-width-thin) solid var(--color-border-primary); }
.border-bottom { border-bottom: var(--border-width-thin) solid var(--color-border-primary); }
.border-left { border-left: var(--border-width-thin) solid var(--color-border-primary); }
.border-right { border-right: var(--border-width-thin) solid var(--color-border-primary); }

/* 阴影工具 */
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }
.shadow-none { box-shadow: none; }

/* 交互工具 */
.cursor-pointer { cursor: pointer; }
.cursor-default { cursor: default; }
.cursor-not-allowed { cursor: not-allowed; }

.select-none { user-select: none; }
.select-text { user-select: text; }

.pointer-events-none { pointer-events: none; }
.pointer-events-auto { pointer-events: auto; }

/* 响应式工具 */
@media (min-width: 640px) {
  .sm\:d-block { display: block; }
  .sm\:d-none { display: none; }
  .sm\:text-center { text-align: center; }
  /* ... 其他响应式类 */
}

@media (min-width: 768px) {
  .md\:d-block { display: block; }
  .md\:d-none { display: none; }
  /* ... 其他响应式类 */
}

@media (min-width: 1024px) {
  .lg\:d-block { display: block; }
  .lg\:d-none { display: none; }
  /* ... 其他响应式类 */
}
```
## 文档系统

### 1. 样式指南
```css
/* 样式指南示例 */
.style-guide {
  /* 颜色展示 */
  .color-palette {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
  }
  
  .color-swatch {
    padding: var(--spacing-md);
    border-radius: var(--border-radius-md);
    border: var(--border-width-thin) solid var(--color-border-primary);
  }
  
  /* 排版展示 */
  .typography-scale {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
  
  .type-sample {
    border-bottom: var(--border-width-thin) solid var(--color-border-primary);
    padding-bottom: var(--spacing-md);
  }
  
  /* 间距展示 */
  .spacing-demo {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .spacing-visualizer {
    background-color: var(--color-primary-100);
    border: var(--border-width-thin) dashed var(--color-primary-500);
  }
}
```
### 2. 组件文档
```html
<!-- 组件文档示例 -->
<div class="component-doc">
  <h2 class="component-name">Button</h2>
  
  <div class="component-description">
    <p>按钮用于触发操作或导航。</p>
  </div>
  
  <div class="component-props">
    <h3>属性</h3>
    <table>
      <thead>
        <tr>
          <th>属性</th>
          <th>类型</th>
          <th>默认值</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>variant</td>
          <td>'primary' | 'secondary' | 'ghost' | 'danger'</td>
          <td>'primary'</td>
          <td>按钮变体</td>
        </tr>
        <tr>
          <td>size</td>
          <td>'small' | 'medium' | 'large'</td>
          <td>'medium'</td>
          <td>按钮尺寸</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>boolean</td>
          <td>false</td>
          <td>是否禁用</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="component-examples">
    <h3>示例</h3>
    <div class="example">
      <button class="button button--primary">主要按钮</button>
      <button class="button button--secondary">次要按钮</button>
      <button class="button button--ghost">幽灵按钮</button>
      <button class="button button--danger">危险按钮</button>
    </div>
    
    <div class="example-code">
      <pre><code>&lt;button class="button button--primary"&gt;
  主要按钮
&lt;/button&gt;</code></pre>
    </div>
  </div>
</div>
```
## 构建与部署

### 1. 构建脚本
```json
{
  "scripts": {
    "build:tokens": "node scripts/build-tokens.js",
    "build:components": "node scripts/build-components.js",
    "build:styles": "sass src/styles:dist/css --style=compressed",
    "build:utils": "postcss src/utils/*.css -d dist/utils --env production",
    "build:all": "npm run build:tokens && npm run build:components && npm run build:styles && npm run build:utils",
    "watch:styles": "sass --watch src/styles:dist/css",
    "lint:css": "stylelint src/**/*.css",
    "test:visual": "backstop test",
    "deploy:cdn": "node scripts/deploy-to-cdn.js"
  }
}
```
### 2. 版本控制
```css
/* 版本化CSS变量 */
:root {
  /* 设计系统版本 */
  --ds-version: '1.2.0';
  
  /* 向后兼容的变量 */
  --color-primary: var(--color-primary-500);
  --color-secondary: var(--color-secondary-500);
  
  /* 弃用警告 */
  /* @deprecated 使用 --color-primary-500 替代 */
  --old-primary-color: var(--color-primary-500);
}
```
## 团队协作

### 1. 贡献指南
```markdown
# 设计系统贡献指南

## 开发流程
1. 创建功能分支
2. 更新设计令牌
3. 开发组件
4. 编写文档
5. 提交PR

## 代码规范
- 使用语义化的CSS变量
- 遵循BEM命名约定
- 添加必要的注释
- 编写组件文档

## 测试要求
- 视觉回归测试
- 跨浏览器测试
- 可访问性测试
- 性能测试
```
### 2. 变更日志
```markdown
# 变更日志

## [1.2.0] - 2022-10-18
### 新增
- 添加暗色主题支持
- 新增卡片组件变体
- 添加响应式工具类

### 改进
- 优化按钮悬停效果
- 改进表单组件可访问性
- 更新颜色系统

### 修复
- 修复移动端布局问题
- 修复主题切换过渡
- 修复字体加载问题
```
## 总结

构建企业级CSS设计系统需要：

1. **系统化的设计令牌**：建立统一的设计语言
2. **可复用的组件库**：提高开发效率
3. **灵活的主题系统**：支持多主题需求
4. **完善的文档系统**：降低学习成本
5. **严格的版本控制**：确保向后兼容
6. **高效的团队协作**：建立贡献流程

成功的设计系统不仅是技术实现，更是团队协作和设计思维的体现。通过持续迭代和优化，设计系统将成为企业最重要的技术资产之一。

---
*创建时间：2022-10-18*
*最后更新：2022-10-18*
*作者：前端开发团队*
*标签：CSS, 设计系统, 设计令牌, 组件库, 前端架构, 团队协作*
