// Node.js 的事件循环示例
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

Promise.resolve().then(() => {
    console.log('3');
});

console.log('4');
// 输出: 1, 4, 3, 2 