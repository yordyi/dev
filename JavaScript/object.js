// let obj = new Object();
// obj.x=1;
// obj.y=2;
// obj.show = function (){
//     console.log(this.x,this.y)
// }

// obj.show()

// let obj1={};
// let obj2={
//     x:2,
//     y:3,
//     show:function(msg){
//         console.log(this.x,this.y,msg);
//     },
// };
// obj2.show("add these numbers!")

let student = {
  name: "liming",
  age: 25,
  work: function () {
    console.log("hello, 我是" + this.name + ",今年" + this.age);
  },
};

console.log(student.age);
console.log(student.name);
// console.log(student.work())
student.work();
console.log(student.age > 18);
