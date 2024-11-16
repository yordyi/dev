// URL 版本控制
app.use('/api/v1', require('./v1/routes'));
app.use('/api/v2', require('./v2/routes'));

// 或使用请求头版本控制
app.use((req, res, next) => {
    const version = req.headers['accept-version'] || 'v1';
    req.version = version;
    next();
}); 