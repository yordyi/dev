# 前端学习大纲

## JavaScript 基础
- 解构赋值
  - 数组解构 - 拆零食大礼包
  - 对象解构 - 玩具盒取物
  - 嵌套解构 - 俄罗斯套娃（层层嵌套的数据结构）
  - 默认值 - 备用方案
  - 实际应用场景
  - 注意事项 

## GitHub Octoverse 2024 要点
- Python成为最流行语言
- 全球开发者数量激增
- 生成式AI项目大幅增长
- 安全自动化成为趋势

## JavaScript 进阶
- 闭包
  - 概念理解
  - 实际应用
  - 内存管理
  - 常见陷阱

## 前端工程化
- Webpack基础
  - 入口配置
  - 打包流程
  - 插件使用
  - 性能优化

## Vue.js基础
- 生命周期
- 组件通信
- 响应式原理
- 指令系统

## React基础
- JSX语法
- 组件开发
- Hooks使用
- 状态管理

## React学习资源 🚀
- 官方文档
  - [React 中文文档](https://zh-hans.react.dev/) - 最新、最权威
  - [React Beta文档](https://beta.reactjs.org/) - 新版本特性预览

- 视频教程
  - [技术胖React教程](https://jspang.com/detailed?id=46) - 通俗易懂
  - [慕课网React实战](https://coding.imooc.com/class/229.html) - 项目驱动

- 社区资源
  - [React中文社区](http://react-china.org/) - 问答交流
  - [掘金React专区](https://juejin.cn/tag/React.js) - 优质文章
  - [阮一峰React教程](https://github.com/ruanyf/react-demos) - 基础入门

- 开源项目
  - [Ant Design](https://ant.design/index-cn) - 企业级UI框架
  - [React Bootstrap](https://react-bootstrap.github.io/) - 响应式组件库
  - [UmiJS](https://umijs.org/zh-CN) - 企业级前端框架

## 网络基础详解 🌐

### HTTP协议 📡
- 基本概念
  - 无状态的请求-响应协议
  - 基于TCP/IP通信协议
  - 默认端口80(HTTP)和443(HTTPS)
- 请求方法
  - GET: 获取资源
  - POST: 提交数据
  - PUT: 更新资源
  - DELETE: 删除资源
  - OPTIONS: 预检请求
- 状态码
  - 1xx: 信息性状态码
  - 2xx: 成功状态码
  - 3xx: 重定向状态码
  - 4xx: 客户端错误
  - 5xx: 服务器错误

### RESTful API 🔄
- 设计原则
  - 资源导向
  - 统一接口
  - 无状态
  - 可缓存
- 最佳实践
  - 使用HTTP动词
  - URL使用名词复数
  - 版本控制
  - 返回JSON数据
- 示例
  - GET /api/users - 获取用户列表
  - POST /api/users - 创建新用户
  - PUT /api/users/1 - 更新用户
  - DELETE /api/users/1 - 删除用户

### WebSocket 🔌
- 特点
  - 全双工通信
  - 持久连接
  - 低延迟
  - 支持二进制传输
- 应用场景
  - 实时聊天
  - 游戏对战
  - 股票行情
  - 实时数据监控
- 生命周期
  - 建立连接
  - 数据传输
  - 心跳检测
  - 关闭连接

### 跨域解决方案 🛠
- CORS（跨源资源共享）
  - Access-Control-Allow-Origin
  - 简单请求vs预检请求
  - 携带身份凭证
- 代理服务器
  - nginx反向代理
  - 开发服务器代理
- JSONP
  - 原理：script标签不受跨域限制
  - 只支持GET请求
  - 安全性考虑
- 其他方案
  - postMessage
  - document.domain
  - window.name

## 性能优化
- 加载优化
- 渲染优化
- 代码优化
- 资源优化

## 工具使用
- Git版本控制
- Chrome开发者工具
- VSCode使用技巧
- Terminal命令行 