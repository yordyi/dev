const router = express.Router();

// GET: 获取资源
router.get('/users', (req, res) => {
    // 获取用户列表
});

// POST: 创建资源
router.post('/users', (req, res) => {
    // 创建新用户
});

// PUT: 更新资源（完整更新）
router.put('/users/:id', (req, res) => {
    // 更新整个用户信息
});

// PATCH: 部分更新资源
router.patch('/users/:id', (req, res) => {
    // 更新部分用户信息
});

// DELETE: 删除资源
router.delete('/users/:id', (req, res) => {
    // 删除用户
}); 