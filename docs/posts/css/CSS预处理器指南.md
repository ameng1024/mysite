---
title: CSS 预处理器完全指南
description: 深入解析 Sass、Less、Stylus 等 CSS 预处理器的使用方法、高级特性、项目架构及最佳实践
published: 2022-09-30
updated: 2022-09-30
tags: [CSS, Sass, Less, Stylus, 预处理器, 前端工程化]
category: CSS
draft: false
---


## 概述
CSS 预处理器通过引入变量、嵌套、混合等编程特性，极大地提升了 CSS 的开发效率和可维护性。

## Sass (SCSS 语法)

### 1. 基础特性
```scss
/* 变量定义 */
$primary-color: #007bff;
$secondary-color: #6c757d;
$font-size-base: 16px;
$spacing-unit: 8px;

/* 嵌套 */
.navbar {
  background-color: $primary-color;
  padding: $spacing-unit * 2;
  
  .nav-item {
    display: inline-block;
    margin-right: $spacing-unit;
    
    .nav-link {
      color: white;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
      
      &.active {
        font-weight: bold;
      }
    }
  }
}

/* 混合器 */
@mixin button-variant($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
  border: 1px solid darken($bg-color, 10%);
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: darken($bg-color, 10%);
    border-color: darken($bg-color, 20%);
  }
  
  &:active {
    transform: translateY(1px);
  }
}

/* 使用混合器 */
.btn-primary {
  @include button-variant($primary-color, white);
}

.btn-secondary {
  @include button-variant($secondary-color, white);
}
```
### 2. 高级特性
```scss
/* 条件语句 */
@mixin responsive-padding($size) {
  @if $size == small {
    padding: 10px;
  } @else if $size == medium {
    padding: 20px;
  } @else if $size == large {
    padding: 30px;
  } @else {
    padding: $size;
  }
}

.card {
  @include responsive-padding(medium);
}

/* 循环 */
@for $i from 1 through 12 {
  .col-#{$i} {
    width: percentage($i / 12);
  }
}

/* 列表和映射 */
$colors: (
  primary: #007bff,
  secondary: #6c757d,
  success: #28a745,
  danger: #dc3545
);

@each $name, $color in $colors {
  .text-#{$name} {
    color: $color;
  }
  
  .bg-#{$name} {
    background-color: $color;
  }
}

/* 函数 */
@function spacing($multiplier: 1) {
  @return $spacing-unit * $multiplier;
}

.container {
  padding: spacing(2); /* 16px */
  margin: spacing(3);  /* 24px */
}

/* 继承 */
%button-base {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid transparent;
}

.btn {
  @extend %button-base;
}

.btn-primary {
  @extend %button-base;
  background-color: $primary-color;
  color: white;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
```
## Less

### 1. 基础特性
```less
/* 变量定义 */
@primary-color: #007bff;
@secondary-color: #6c757d;
@font-size-base: 16px;
@spacing-unit: 8px;

/* 嵌套 */
.navbar {
  background-color: @primary-color;
  padding: @spacing-unit * 2;
  
  .nav-item {
    display: inline-block;
    margin-right: @spacing-unit;
    
    .nav-link {
      color: white;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
      
      &.active {
        font-weight: bold;
      }
    }
  }
}

/* 混合器 */
.button-variant(@bg-color, @text-color) {
  background-color: @bg-color;
  color: @text-color;
  border: 1px solid darken(@bg-color, 10%);
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: darken(@bg-color, 10%);
    border-color: darken(@bg-color, 20%);
  }
  
  &:active {
    transform: translateY(1px);
  }
}

/* 使用混合器 */
.btn-primary {
  .button-variant(@primary-color, white);
}

.btn-secondary {
  .button-variant(@secondary-color, white);
}
```
### 2. 高级特性
```less
/* 守卫（条件语句） */
.button-variant(@bg-color, @text-color) when (lightness(@bg-color) >= 50%) {
  border-color: darken(@bg-color, 20%);
}

.button-variant(@bg-color, @text-color) when (lightness(@bg-color) < 50%) {
  border-color: lighten(@bg-color, 20%);
}

/* 循环 */
.loop(@counter) when (@counter > 0) {
  .col-@{counter} {
    width: percentage(@counter / 12);
  }
  .loop(@counter - 1);
}
.loop(12);

/* 内置函数 */
.container {
  padding: unit(@spacing-unit * 2, px);
  margin: unit(@spacing-unit * 3, px);
  color: lighten(@primary-color, 20%);
  background-color: darken(@secondary-color, 10%);
}

/* 命名空间 */
#button-styles {
  .variant(@bg-color, @text-color) {
    background-color: @bg-color;
    color: @text-color;
  }
}

.btn {
  #button-styles > .variant(@primary-color, white);
}
```
## Stylus

### 1. 基础特性
```stylus
/* 变量定义 */
primary-color = #007bff
secondary-color = #6c757d
font-size-base = 16px
spacing-unit = 8px

/* 嵌套 */
.navbar
  background-color primary-color
  padding spacing-unit * 2
  
  .nav-item
    display inline-block
    margin-right spacing-unit
    
    .nav-link
      color white
      text-decoration none
      
      &:hover
        text-decoration underline
      
      &.active
        font-weight bold

/* 混合器 */
button-variant(bg-color, text-color)
  background-color bg-color
  color text-color
  border 1px solid darken(bg-color, 10%)
  border-radius 4px
  padding 10px 20px
  cursor pointer
  transition all 0.3s ease
  
  &:hover
    background-color darken(bg-color, 10%)
    border-color darken(bg-color, 20%)
  
  &:active
    transform translateY(1px)

/* 使用混合器 */
.btn-primary
  button-variant(primary-color, white)

.btn-secondary
  button-variant(secondary-color, white)
```
### 2. 高级特性
```stylus
/* 条件语句 */
responsive-padding(size)
  if size == 'small'
    padding 10px
  else if size == 'medium'
    padding 20px
  else if size == 'large'
    padding 30px
  else
    padding size

.card
  responsive-padding('medium')

/* 循环 */
for i in 1..12
  .col-{i}
    width (i / 12) * 100%

/* 内置函数 */
.container
  padding unit(spacing-unit * 2, 'px')
  margin unit(spacing-unit * 3, 'px')
  color lighten(primary-color, 20%)
  background-color darken(secondary-color, 10%)

/* 插值 */
prefix = 'btn'
.{prefix}-primary
  background-color primary-color
```
## 项目架构

### 1. 目录结构
```
src/styles/
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _variables.scss
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   └── _forms.scss
├── layouts/
│   ├── _header.scss
│   ├── _footer.scss
│   └── _grid.scss
├── utils/
│   ├── _mixins.scss
│   ├── _functions.scss
│   └── _helpers.scss
├── themes/
│   ├── _light.scss
│   └── _dark.scss
└── main.scss
```
### 2. 主文件组织
```scss
// main.scss

// 1. 基础样式
@import 'base/reset';
@import 'base/typography';
@import 'base/variables';

// 2. 工具类
@import 'utils/mixins';
@import 'utils/functions';
@import 'utils/helpers';

// 3. 布局
@import 'layouts/grid';
@import 'layouts/header';
@import 'layouts/footer';

// 4. 组件
@import 'components/buttons';
@import 'components/cards';
@import 'components/forms';

// 5. 主题
@import 'themes/light';
@import 'themes/dark';

// 6. 页面特定样式
@import 'pages/home';
@import 'pages/about';
@import 'pages/contact';
```
## 最佳实践

### 1. 变量管理
```scss
// _variables.scss

// 颜色系统
$colors: (
  primary: #007bff,
  secondary: #6c757d,
  success: #28a745,
  danger: #dc3545,
  warning: #ffc107,
  info: #17a2b8,
  light: #f8f9fa,
  dark: #343a40
);

// 字体系统
$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-size-base: 16px;
$font-weight-normal: 400;
$font-weight-bold: 700;
$line-height-base: 1.6;

// 间距系统
$spacing-unit: 8px;
$spacings: (
  0: 0,
  1: $spacing-unit,
  2: $spacing-unit * 2,
  3: $spacing-unit * 3,
  4: $spacing-unit * 4,
  5: $spacing-unit * 5
);

// 边框系统
$border-radius-base: 4px;
$border-width: 1px;
$border-color: #dee2e6;

// 阴影系统
$box-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
$box-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$box-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```
### 2. 混合器设计
```scss
// _mixins.scss

// 响应式断点
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media #{map-get($breakpoints, $breakpoint)} {
      @content;
    }
  } @else {
    @warn "Breakpoint `#{$breakpoint}` not found in `$breakpoints` map.";
  }
}

// 清除浮动
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

// 文本截断
@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 多行文本截断
@mixin text-truncate-multiline($lines: 2) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// 媒体查询
@mixin media($query) {
  @media #{$query} {
    @content;
  }
}
```
### 3. 函数库
```scss
// _functions.scss

// 颜色函数
@function color($name, $variant: 'base') {
  @if map-has-key($colors, $name) {
    $color-map: map-get($colors, $name);
    @if map-has-key($color-map, $variant) {
      @return map-get($color-map, $variant);
    } @else {
      @warn "Variant `#{$variant}` not found for color `#{$name}`.";
      @return map-get($color-map, 'base');
    }
  } @else {
    @warn "Color `#{$name}` not found in `$colors` map.";
    @return #000;
  }
}

// 间距函数
@function spacing($multiplier: 1) {
  @return $spacing-unit * $multiplier;
}

// 字体大小函数
@function font-size($size) {
  @if map-has-key($font-sizes, $size) {
    @return map-get($font-sizes, $size);
  } @else {
    @warn "Font size `#{$size}` not found.";
    @return $font-size-base;
  }
}

// 响应式函数
@function breakpoint($name) {
  @if map-has-key($breakpoints, $name) {
    @return map-get($breakpoints, $name);
  } @else {
    @warn "Breakpoint `#{$name}` not found.";
    @return null;
  }
}
```
## 构建工具集成

### 1. Webpack 配置
```javascript
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['src/styles'],
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};
```
### 2. Gulp 配置
```javascript
// gulpfile.js
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('styles', () => {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
  gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
});
```
### 3. Vite 配置
```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
  },
};
```
## 性能优化

### 1. 代码分割
```scss
// 按需加载样式
// main.scss
@import 'components/buttons';
@import 'components/cards';

// admin.scss (管理员专用)
@import 'components/admin/forms';
@import 'components/admin/tables';
```
### 2. 缓存策略
```scss
// 使用版本控制
// 在构建时生成带哈希的文件名
// styles.abc123.css
```
### 3. 按需导入
```scss
// 使用 @use 替代 @import (Sass)
@use 'sass:color';
@use 'sass:map';

.button {
  background-color: color.adjust(#007bff, $lightness: 10%);
}
```
## 迁移策略

### 1. 从纯CSS迁移
```scss
// 步骤1：重命名 .css 为 .scss
// 步骤2：逐步引入变量和混合器
// 步骤3：重构嵌套结构
// 步骤4：引入高级特性
```
### 2. 跨预处理器迁移
```scss
// Sass → Less
// 1. 变量语法：$var → @var
// 2. 混合器语法：@mixin → .mixin()
// 3. 函数差异：darken() → darken()

// Less → Stylus
// 1. 变量语法：@var → var
// 2. 括号可选：.mixin() → mixin
// 3. 分号可选
```
## 工具与资源

### 1. 开发工具
- **Sass**: dart-sass, node-sass
- **Less**: less.js, less-loader
- **Stylus**: stylus, stylus-loader

### 2. 编辑器插件
- **VS Code**: Sass, Less, Stylus 语法高亮
- **WebStorm**: 内置支持
- **Sublime Text**: 相关插件

### 3. 在线工具
- **Sassmeister**: 在线 Sass 编译器
- **Less Playground**: 在线 Less 编译器
- **Stylus Try**: 在线 Stylus 编译器

## 总结

CSS 预处理器是现代前端开发的重要工具，它们提供了：

1. **更好的可维护性**：变量、混合器、函数
2. **更高的开发效率**：嵌套、继承、循环
3. **更强的表达能力**：条件语句、计算
4. **更好的团队协作**：模块化、命名规范

选择合适的预处理器需要考虑：
- 团队熟悉度
- 项目需求
- 生态系统
- 构建工具集成

随着 CSS 原生特性的发展，预处理器的某些功能可能被替代，但它们仍然在大型项目中发挥着重要作用。

---
*创建时间：2022-09-30*
*最后更新：2022-09-30*
*作者：前端开发团队*
*标签：CSS, Sass, Less, Stylus, 预处理器, 前端工程化*
