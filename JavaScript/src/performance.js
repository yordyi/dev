const { performance } = require('perf_hooks');

const start = performance.now();
// 执行代码
const end = performance.now();
console.log(`耗时: ${end - start}ms`); 