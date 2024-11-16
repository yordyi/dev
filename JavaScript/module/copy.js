// let a = {x:3,y:4};
// let b=a;
// // b.x = 9;
// // console.log(a.x)

// let c = {...a};
// c.z = 9;
// console.log(c)
// c.x = 10;
// console.log(a.x)


// // 浅拷贝
// let a = { x: 1, y: 2, data: [1, 2, 3] };
// let b = { ...a };
// // let b=a; 和 let b={...a}都是浅拷贝
// b.x = 4;
// b.data[0] = 9;
// // b.data= [1,3,4,5]
// console.log(a.x);
// console.log(a.data[0]);
// // console.log(a.data)


// // 深拷贝
// let n={x:3,y:4,data:[1,2,3]}
// // 把n复制到string [深拷贝]
// let string = JSON.parse(JSON.stringify(n))
// // let str = JSON.stringify(a)
// // let string = JSON.parse(str)
// string.x=100;
// string.data[1]=99;
// console.log(n.x)
// console.log(n.data[1])


// 这个是浅拷贝

// let m = {x: 3, y: 4, data: [1,3,5]};
// let z = {...m};
// z.data[0] = 10;  // m.data[0] 也会变成 10 ,浅拷贝只会引用第一层的地址,和基本类型的数值:对于基本类型（如 x, y），会创建新的复制 ✅
// // 对于引用类型（如 data 数组），只复制引用地址 ⚠
// z.x = 10;        // m.x 保持不变，还是 3
// console.log(m.data[0]);  // 输出 10


// // 这个不是拷贝
// let m = {x:2,y:3}
// let n = m;
// n.x=4;
// console.log(m.x)

// 这里是深拷贝,全部是新的空间,所以更本不会影响到原来的数据
// JSON.stringify() 📦
// 将 JavaScript 对象/值转换为 JSON 字符串

// JSON.parse() 📨
// 将 JSON 字符串转换回 JavaScript 对象/值
let h = {x:3,y:4,data:[1,3,4,5]}
let string = JSON.parse(JSON.stringify(h))
string.x=2;
string.data[0]=12;
console.log(h.x)
console.log(h.data[0])

