const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// 基础安全头
app.use(helmet());

// CORS
app.use(cors());

// 速率限制
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100 // 限制每个IP 100个请求
});
app.use(limiter); 