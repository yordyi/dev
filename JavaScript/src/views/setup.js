// 设置
app.set('view engine', 'ejs');
app.set('views', './views');

// 使用
app.get('/', (req, res) => {
    res.render('index', {
        title: '首页',
        users: ['张三', '李四']
    });
}); 