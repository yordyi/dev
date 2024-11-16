const bcrypt = require('bcrypt');
const crypto = require('crypto');

// 密码哈希
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

// JWT
const jwt = require('jsonwebtoken');
const token = jwt.sign({id: user.id}, 'secret');