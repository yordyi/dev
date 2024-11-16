// 路由方法
app.get('/', (req, res) => {
    res.send('首页');
});

app.post('/api/users', (req, res) => {
    res.json({ message: '创建用户' });
});

// 路由参数
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`用户ID: ${userId}`);
}); 