const express = require('express');
const app = express();

// 中间件
app.use(express.json());

// 路由
app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.post('/api/users', (req, res) => {
    const user = req.body;
    res.json(user);
});

// 启动服务器
app.listen(3000, () => {
    console.log('Express 服务器运行在 http://localhost:3000/');
}); 