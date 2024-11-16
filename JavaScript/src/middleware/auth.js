// 身份验证
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: '未授权访问'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            message: '无效的令牌'
        });
    }
};

// 速率限制
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}); 