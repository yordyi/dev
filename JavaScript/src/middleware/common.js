// 日志中间件
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('服务器错误！');
});

// 身份验证中间件
const auth = (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.status(401).send('未授权');
    }
}; 