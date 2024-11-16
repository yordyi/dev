# VS Code 学习笔记

## 已掌握功能

- 多光标编辑 (同时在多处编辑)
- IntelliSense 智能提示 (代码自动完成和提示)
- 代码重构 (智能地修改代码结构)
- 颜色预览与编辑 (直观的颜色编辑器)
- 代码折叠 (收起不需要关注的代码块)
- 错误提示 (实时显示代码问题)
- 代码片段 (快速插入常用代码模板)

## 待学习内容

- Emmet 支持 (快速编写 HTML/CSS)
- TypeScript 类型检查 (提供类型安全)
- 更多快捷键 (提高编码效率)

# CSS 布局学习大纲

## 1. Grid 布局

- 二维布局系统
- grid-template-columns/rows
- grid-gap
- grid-area
- 适用场景

## 2. Flex 布局

- 一维布局系统
- flex-row：水平排列元素
- flex-col：垂直排列元素
- flex-wrap：允许元素换行
- flex-1：自动占据剩余空间
- justify-start/center/end：水平对齐方式
- items-center：垂直居中对齐
- 实际应用：导航栏、卡片布局等

## 3. 布局选择指南

- Grid vs Flex 使用场景
- 混合使用策略
- 响应式考虑

## CSS 定位专题

- container - 响应式容器
- relative - 相对定位
- absolute - 绝对定位
- fixed - 固定定位
- sticky - 粘性定位

## Display 属性详解

- block: 块级元素,独占一行
- inline: 行内元素,在一行内显示
- inline-block: 行内块元素,结合两者特点
- flex: 弹性布局,适合一维布局
- grid: 网格布局,适合二维布局
- hidden: 隐藏元素(display: none)

# Tailwind CSS 常用工具类

## 1. 排版类 Typography

- prose: 文章排版美化
- prose-sm: 小号文章排版
- prose-lg: 大号文章排版
- prose-slate: 不同颜色主题
- prose-invert: 深色模式

## 2. 布局类 Layout

### Justify 系列

- justify-start: 左对齐
- justify-center: 居中对齐
- justify-end: 右对齐
- justify-between: 两端对齐
- justify-around: 环绕对齐
- justify-evenly: 平均对齐

### Space 间距系列

- space-x-{size}: 水平间距
- space-y-{size}: 垂直间距
- space-x-reverse: 水平反向间距
- space-y-reverse: 垂直反向间距

### Divide 分割线

- divide-y: 水平分割线
- divide-x: 垂直分割线
- divide-{color}: 分割线颜色

### Aspect Ratio 宽高比

- aspect-auto: 自动比例
- aspect-square: 1:1 正方形
- aspect-video: 16:9 视频比例
- 自定义比例配置
- 响应式应用

### Container

- container: 响应式容器
- mx-auto: 水平居中

### Columns 多列

- columns-2: 两列布局
- columns-3: 三列布局

### Line Clamp

- line-clamp-{number}: 文本行数限制

## 3. 响应式设计

- sm: 640px 以上
- md: 768px 以上
- lg: 1024px 以上
- xl: 1280px 以上
- 2xl: 1536px 以上

## 4. 常用组合
