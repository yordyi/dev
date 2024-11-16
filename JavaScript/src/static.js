const express = require('express');
const app = express();

// 基础用法
app.use(express.static('public'));

// 虚拟路径
app.use('/static', express.static('public'));

// 多个静态目录
app.use(express.static('public'));
app.use(express.static('uploads'));

app.listen(3000, () => {
    console.log('服务器启动在端口3000');
}); 