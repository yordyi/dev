const express = require('express');
const User = require('../models/user');

const app = express();

// 常用状态码示例
app.get('/users', (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);         // 200: OK
    } catch (err) {
        res.status(500).json({error: err});  // 500: 服务器错误
    }
});

app.post('/users', (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);              // 201: Created
});

app.get('/users/:id', (req, res) => {
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({        // 404: Not Found
            message: '用户不存在'
        });
    }
    res.json(user);
}); 