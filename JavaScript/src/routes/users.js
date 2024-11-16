const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('用户列表');
});

router.post('/', (req, res) => {
    res.send('创建用户');
});

module.exports = router;

// 在 app.js 中使用
app.use('/users', require('./routes/users'));