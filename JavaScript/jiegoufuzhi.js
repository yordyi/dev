let arr = [1, 2, 3, 6];
// let d1;
// let d2;
// let d3;
// const [d1,d2,d3]=arr;
// console.log(d1,d2,d3)

// let d1 ,d2, d3 ,d4;
// [d1,d2,d3,d4=2]=arr;
// console.log(d1,d2,d3,d4);

// let c=n1;
// n1=n2;
// n2=c

// console.log(n1,n2)

// let n1=3;
// let n2=4;
// [n1,n2]=[n2,n1]
// console.log(n1,n2)

// let obj = { x: 3, y: 4 ,z:9};
// let x = obj.x;
// let y = obj.y;
// let { x, y } = obj;
// console.log(x, y);

// let x, y;
// ({ x, y ,z=5} = obj);
// console.log(x, y,z);

// let obj = {x:3,y:4,z:5}
// let newX,newY,newZ;
// ({x:newX,y:newY,z:newZ}=obj)
// console.log(newX,newY,newZ)
// let obj =  { x:3,y:4,z:5}
// let newX,newY,newZ;
// ({x:newX,y:newY,z:newZ}=obj)
// console.log(newX,newY,newZ)

// let obj = { x: 3, y: 4, z: 5 };
// let newX, newY, newZ;
// ({ x: newX, y: newY, z: newZ } = obj);
// console.log(newX, newY, newZ);






// 划重点
// 用对象当作参数

//     function add(num1,num2){
//     console.log(num1+num2)
// }
// add(1,2)


function add(args) {
    console.log(args.n1+args.n2)
}
add({n1:3,n2:4})


// 然后使用解构赋值
function add({n1,n2}) {
    console.log(n1+n2)
}
