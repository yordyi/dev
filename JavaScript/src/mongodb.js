const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/myapp');

// 定义模型
const User = mongoose.model('User', {
    name: String,
    email: String
});

// CRUD 操作
async function userOps() {
    // 创建
    const user = new User({name: '张三'});
    await user.save();
    
    // 查询
    const users = await User.find({name: '张三'});
} 