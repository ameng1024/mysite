---
title: CSS 动画与过渡完全指南
description: 深入解析 CSS 动画和过渡技术，涵盖 transition、animation、关键帧、性能优化及实际应用场景
published: 2022-03-05
updated: 2022-03-05
tags: [CSS, 动画, 过渡, 前端开发, 用户体验]
category: CSS
draft: false
---


## 概述
CSS 动画和过渡是现代 Web 开发中提升用户体验的关键技术，能够创建流畅、高性能的视觉效果。

## 基础概念

### 1. Transition 过渡
```css
.element {
  transition: property duration timing-function delay;
  /* 简写示例 */
  transition: all 0.3s ease-in-out;
  
  /* 多个属性分别设置 */
  transition: 
    opacity 0.3s ease,
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 可过渡属性 */
.transitionable {
  /* 尺寸相关 */
  width: 100px;
  height: 100px;
  
  /* 颜色相关 */
  color: #333;
  background-color: #f0f0f0;
  border-color: #ddd;
  
  /* 变换相关 */
  transform: translateX(0);
  opacity: 1;
  
  /* 布局相关 */
  margin: 10px;
  padding: 10px;
  
  /* 其他 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```
### 2. Animation 动画
```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slideIn 0.5s ease-out forwards;
  /* 简写：name duration timing-function delay iteration-count direction fill-mode */
}
```
## 实战应用

### 1. 加载动画
```css
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 骨架屏动画 */
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```
### 2. 悬停效果
```css
.hover-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
}

/* 按钮悬停效果 */
.btn {
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}
```
### 3. 页面过渡
```css
.page-transition {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 路由切换动画 */
.route-enter {
  opacity: 0;
  transform: translateX(100%);
}

.route-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s ease;
}

.route-exit {
  opacity: 1;
  transform: translateX(0);
}

.route-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: all 0.3s ease;
}
```
### 4. 滚动动画
```css
.scroll-animation {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
}

.scroll-animation.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 视差滚动 */
.parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
}

/* 滚动进度指示器 */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  z-index: 1000;
  transition: width 0.1s ease;
}
```
## 性能优化

### 1. 使用硬件加速
```css
.optimized-animation {
  /* 触发 GPU 加速 */
  transform: translateZ(0);
  will-change: transform, opacity;
  
  /* 避免重排的属性 */
  transform: translate3d(0, 0, 0);
  opacity: 0.9;
}

/* 性能友好的动画 */
.performance-friendly {
  /* 优先使用 transform 和 opacity */
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  /* 避免动画以下属性 */
  /* margin, padding, width, height, top, left 等 */
}
```
### 2. 减少重绘
```css
/* 不好的做法：频繁重绘 */
.bad-animation {
  animation: badMove 1s infinite;
}

@keyframes badMove {
  0%, 100% { left: 0; }  /* 触发重排 */
  50% { left: 100px; }
}

/* 好的做法：使用 transform */
.good-animation {
  animation: goodMove 1s infinite;
}

@keyframes goodMove {
  0%, 100% { transform: translateX(0); }  /* 只触发重绘 */
  50% { transform: translateX(100px); }
}
```
### 3. 合理使用 will-change
```css
.element {
  /* 只在需要时启用 */
  will-change: transform, opacity;
  
  /* 动画结束后恢复 */
  animation: slideIn 0.5s ease-out forwards;
}

.element.animated {
  /* 动画结束后移除 will-change */
  will-change: auto;
}
```
## 高级技巧

### 1. 多步骤动画
```css
@keyframes multiStep {
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  33% {
    transform: translateX(100px) scale(1.2);
    opacity: 0.8;
  }
  66% {
    transform: translateX(50px) scale(0.9);
    opacity: 0.6;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

.multi-step {
  animation: multiStep 2s ease-in-out infinite;
}
```
### 2. 交错动画
```css
.stagger-container > * {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

/* 为每个子元素设置延迟 */
.stagger-container > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-container > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-container > *:nth-child(3) { animation-delay: 0.3s; }
.stagger-container > *:nth-child(4) { animation-delay: 0.4s; }
.stagger-container > *:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
### 3. 3D 变换动画
```css
.card-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-3d:hover {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
```
## 工具与资源

### 1. 缓动函数
```css
:root {
  /* 标准缓动函数 */
  --ease-in: cubic-bezier(0.42, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.58, 1);
  --ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
  
  /* 自定义缓动 */
  --bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.element {
  transition: transform 0.3s var(--bounce);
}
```
### 2. 动画库
```css
/* 淡入动画类 */
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

.slide-in-left {
  animation: slideInLeft 0.5s ease-out;
}

.slide-in-right {
  animation: slideInRight 0.5s ease-out;
}

.zoom-in {
  animation: zoomIn 0.3s ease-out;
}

@keyframes fadeIn { /* ... */ }
@keyframes slideInLeft { /* ... */ }
@keyframes slideInRight { /* ... */ }
@keyframes zoomIn { /* ... */ }
```
## 总结

CSS 动画和过渡是创建现代 Web 体验的重要工具。通过合理使用这些技术，你可以：

1. **提升用户体验**：创建流畅自然的交互效果
2. **引导用户注意力**：通过动画突出重点内容
3. **增强品牌形象**：独特的动画风格可以强化品牌识别
4. **优化性能**：相比 JavaScript 动画，CSS 动画性能更好

记住动画设计的原则：适度使用、性能优先、用户体验为中心。

---
*创建时间：2022-03-05*
*最后更新：2022-03-05*
*作者：前端开发团队*
*标签：CSS, 动画, 过渡, 前端开发, 用户体验*
