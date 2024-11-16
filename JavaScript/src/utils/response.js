// 统一响应格式
const successResponse = (data, message = 'Success') => ({
    status: 'success',
    data,
    message
});

const errorResponse = (message, code = 400) => ({
    status: 'error',
    code,
    message
});

// 使用示例
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(successResponse(users));
    } catch (err) {
        res.status(400).json(errorResponse(err.message));
    }
}); 