const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 用户模型
const User = mongoose.model('User', {
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// 在路由中使用
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}); 