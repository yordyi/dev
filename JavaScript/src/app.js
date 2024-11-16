const express = require('express');
const app = express();

// 基础中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('服务器启动在端口3000');
}); 