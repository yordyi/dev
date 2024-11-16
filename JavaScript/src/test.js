const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

// 异步测试
test('async test', async () => {
    const data = await fetchData();
    expect(data).toBeDefined();
}); 