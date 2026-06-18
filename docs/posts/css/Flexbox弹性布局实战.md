---
title: Flexbox 弹性布局实战指南
description: 全面掌握 CSS Flexbox 布局系统，从基础概念到实际应用，涵盖容器属性、项目属性、对齐方式及常见布局模式
published: 2022-02-10
updated: 2022-02-10
tags: [CSS, Flexbox, 布局, 响应式设计, 前端开发]
category: CSS
draft: false
---


## 概述
Flexbox（弹性盒子布局）是 CSS3 中强大的布局模型，特别适合一维布局场景，能够轻松实现各种复杂布局需求。

## 核心概念

### 1. 主轴与交叉轴
```css
.flex-container {
  display: flex;
  /* 主轴方向：row（水平）或 column（垂直） */
  flex-direction: row;
  /* 交叉轴垂直于主轴 */
}
```
### 2. 容器与项目
```css
/* 容器属性 */
.container {
  display: flex; /* 或 inline-flex */
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | flex-end | center | baseline;
  align-content: stretch | flex-start | flex-end | center | space-between | space-around;
}

/* 项目属性 */
.item {
  order: <integer>;
  flex-grow: <number>; /* 默认 0 */
  flex-shrink: <number>; /* 默认 1 */
  flex-basis: <length> | auto; /* 默认 auto */
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
## 实战应用

### 1. 水平垂直居中
```css
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 多种居中方式 */
.center-methods {
  /* 方法1：容器居中 */
  &.method-1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* 方法2：项目属性 */
  &.method-2 {
    display: flex;
  }
  &.method-2 > .item {
    margin: auto;
  }
  
  /* 方法3：绝对定位配合 Flexbox */
  &.method-3 {
    display: flex;
    position: relative;
  }
  &.method-3 > .item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```
### 2. 圣杯布局
```css
.holy-grail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header, .footer {
  flex: 0 0 auto;
  padding: 20px;
  background: #333;
  color: white;
}

.main {
  display: flex;
  flex: 1;
}

.nav, .aside {
  flex: 0 0 200px;
  padding: 20px;
  background: #f5f5f5;
}

.content {
  flex: 1;
  padding: 20px;
  background: white;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .main {
    flex-direction: column;
  }
  
  .nav, .aside {
    flex: 0 0 auto;
    order: 1;
  }
}
```
### 3. 卡片布局
```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.card {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
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
  flex: 1;
  padding: 20px;
}

.card-footer {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
}
```
### 4. 导航菜单
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-logo {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.nav-menu {
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  padding: 8px 0;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #667eea;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #667eea;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* 移动端响应式 */
.nav-toggle {
  display: none;
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    flex-direction: column;
    background: white;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 20px 0;
  }
  
  .nav-menu.active {
    left: 0;
  }
  
  .nav-toggle {
    display: block;
    cursor: pointer;
  }
}
```
### 5. 表单布局
```css
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row > .form-group {
  flex: 1;
}

.form-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.form-input {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #e9ecef;
}
```
### 6. 媒体对象
```css
.media-object {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.media-image {
  flex: 0 0 150px;
}

.media-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
}

.media-content {
  flex: 1;
}

.media-title {
  margin: 0 0 10px 0;
  font-size: 20px;
  color: #333;
}

.media-description {
  margin: 0 0 15px 0;
  color: #666;
  line-height: 1.6;
}

.media-meta {
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #888;
}

/* 反转布局 */
.media-object.reverse {
  flex-direction: row-reverse;
}

/* 垂直布局 */
.media-object.vertical {
  flex-direction: column;
}

.media-object.vertical .media-image {
  flex: 0 0 auto;
  width: 100%;
}
```
### 7. 网格系统
```css
.grid-system {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col {
  padding: 0 15px;
  margin-bottom: 30px;
}

.col-1 { width: 8.333333%; }
.col-2 { width: 16.666667%; }
.col-3 { width: 25%; }
.col-4 { width: 33.333333%; }
.col-5 { width: 41.666667%; }
.col-6 { width: 50%; }
.col-7 { width: 58.333333%; }
.col-8 { width: 66.666667%; }
.col-9 { width: 75%; }
.col-10 { width: 83.333333%; }
.col-11 { width: 91.666667%; }
.col-12 { width: 100%; }

/* 响应式调整 */
@media (max-width: 768px) {
  .col {
    width: 100%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .col-md-6 {
    width: 50%;
  }
  .col-md-12 {
    width: 100%;
  }
}

@media (min-width: 1025px) {
  .col-lg-4 {
    width: 33.333333%;
  }
  .col-lg-8 {
    width: 66.666667%;
  }
}
```
### 8. 粘性页脚
```css
.sticky-footer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.footer {
  flex: 0 0 auto;
  background: #333;
  color: white;
  padding: 30px 0;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-section {
  flex: 1 1 250px;
}

.footer-heading {
  font-size: 18px;
  margin-bottom: 20px;
  color: #fff;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #bbb;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #444;
  color: #999;
}
```
### 9. 分页组件
```css
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 20px 0;
}

.pagination-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.pagination-item:hover {
  background: #f5f5f5;
  border-color: #ccc;
}

.pagination-item.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.pagination-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-item.disabled:hover {
  background: white;
  border-color: #e0e0e0;
}

.pagination-ellipsis {
  color: #999;
  padding: 0 8px;
}
```
### 10. 响应式侧边栏
```css
.sidebar-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 250px;
  background: #1a202c;
  color: white;
  padding: 30px 20px;
  transition: all 0.3s ease;
}

.sidebar-header {
  padding: 0 0 20px 0;
  border-bottom: 1px solid #2d3748;
  margin-bottom: 20px;
}

.sidebar-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-item {
  margin-bottom: 8px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  color: #cbd5e0;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.sidebar-link:hover {
  background: #2d3748;
  color: white;
}

.sidebar-link.active {
  background: #667eea;
  color: white;
}

.sidebar-icon {
  font-size: 18px;
}

.main-content {
  flex: 1;
  padding: 30px;
  background: #f7fafc;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .sidebar-layout {
    flex-direction: column;
  }
  
  .sidebar {
    flex: 0 0 auto;
    width: 100%;
    padding: 20px;
  }
  
  .sidebar-menu {
    display: flex;
    overflow-x: auto;
    gap: 10px;
  }
  
  .sidebar-item {
    margin-bottom: 0;
  }
  
  .sidebar-link {
    flex-direction: column;
    padding: 10px;
    text-align: center;
    min-width: 80px;
  }
  
  .sidebar-icon {
    font-size: 20px;
    margin-bottom: 5px;
  }
}
```
## 性能优化

### 1. 减少重排
```css
.stable-flex {
  display: flex;
  /* 避免频繁改变 flex-direction */
  flex-direction: row;
  /* 预定义 flex 值减少计算 */
}

.flex-item {
  flex: 0 0 200px; /* 固定大小 */
  /* 避免频繁改变 order */
}
```
### 2. 合理使用 flex-wrap
```css
.wrap-strategies {
  /* 适合固定数量项目 */
  &.no-wrap {
    flex-wrap: nowrap;
    overflow-x: auto; /* 添加滚动 */
  }
  
  /* 适合流式布局 */
  &.wrap {
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  /* 适合响应式设计 */
  &.responsive-wrap {
    flex-wrap: wrap;
    gap: 20px;
  }
}
```
### 3. 避免过度嵌套
```css
/* 不好的做法：过度嵌套 Flexbox */
.over-nested {
  display: flex;
}

.over-nested > div {
  display: flex;
}

.over-nested > div > div {
  display: flex;
}

/* 好的做法：扁平化结构 */
.flat-flex {
  display: flex;
  flex-wrap: wrap;
}

.flat-flex > * {
  flex: 1 1 300px;
  margin: 10px;
}
```
## 浏览器兼容性

### 1. 前缀处理
```css
.flex-container {
  display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;         /* OLD - Firefox 19- */
  display: -ms-flexbox;      /* TWEENER - IE 10 */
  display: -webkit-flex;     /* NEW - Chrome */
  display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.flex-item {
  -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1;         /* OLD - Firefox 19- */
  -webkit-flex: 1;          /* Chrome */
  -ms-flex: 1;              /* IE 10 */
  flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
```
### 2. 渐进增强
```css
/* 基础布局（所有浏览器） */
.basic-layout {
  display: block;
}

.basic-layout > * {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  margin-bottom: 20px;
}

/* 增强布局（支持 Flexbox 的浏览器） */
@supports (display: flex) {
  .basic-layout {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .basic-layout > * {
    flex: 1 1 300px;
    margin-bottom: 0;
  }
}
```
## 总结

Flexbox 是现代 CSS 布局的核心技术之一，特别适合一维布局场景。通过掌握 Flexbox，你可以：

1. **简化布局代码**：减少浮动和定位的使用
2. **提高开发效率**：快速实现复杂布局需求
3. **增强响应式能力**：轻松适应不同屏幕尺寸
4.
