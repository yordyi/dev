// 异步导入
const module = await import('./module.js');
// 或
import('./module.js').then(module => {
    // 使用 module
}); 